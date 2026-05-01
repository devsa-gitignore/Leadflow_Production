from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Sum

from .models import Deal, PipelineStage
from .serializers import DealSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def pipeline_view(request):
    user = request.user
    role = getattr(user, 'role', None)
    role_name = role.name if role else None

    if role_name == "Sales Rep":
        deals = Deal.objects.filter(lead__assigned_to=user)
    elif role_name == "Sales Manager" and user.team:
        deals = Deal.objects.filter(lead__assigned_to__team=user.team)
    else:
        deals = Deal.objects.all()

    stages = PipelineStage.objects.all().order_by("order")

    pipeline_data = []

    for stage in stages:
        stage_deals = deals.filter(
            stage=stage,
            is_won=False,
            is_lost=False,
        )

        serializer = DealSerializer(stage_deals, many=True)

        total_value = stage_deals.aggregate(
            total=Sum("deal_value")
        )["total"] or 0

        pipeline_data.append({
            "stage_id": stage.id,
            "stage_name": stage.name,
            "count": stage_deals.count(),
            "total_value": total_value,
            "deals": serializer.data,
        })

    closed_deals = deals.filter(is_won=True)
    lost_deals = deals.filter(is_lost=True)

    return Response({
        "pipeline": pipeline_data,
        "closed_deals": DealSerializer(closed_deals, many=True).data,
        "lost_deals": DealSerializer(lost_deals, many=True).data,
    })


@api_view(['PATCH'])
def update_deal_stage(request, deal_id):

    user = request.user  

    try:
        deal = Deal.objects.get(id=deal_id)
    except Deal.DoesNotExist:
        return Response({"error": "Deal not found"}, status=404)

    stage_id = request.data.get("stage_id")

    try:
        stage = PipelineStage.objects.get(id=stage_id)
    except PipelineStage.DoesNotExist:
        return Response({"error": "Pipeline stage not found"}, status=404)

    deal.stage = stage
    deal.is_won = False
    deal.is_lost = False
    deal.save()

    return Response({"message": "Deal stage updated successfully"})


@api_view(['PATCH'])
def close_deal(request, deal_id):

    user = request.user  

    try:
        deal = Deal.objects.get(id=deal_id)
    except Deal.DoesNotExist:
        return Response({"error": "Deal not found"}, status=404)

    deal_status = request.data.get("status")

    if deal_status == "won":
        deal.is_won = True
        deal.is_lost = False

    elif deal_status == "lost":
        deal.is_won = False
        deal.is_lost = True

    else:
        return Response({"error": "Invalid status"}, status=400)
    deal.save()

    return Response({"message": "Deal status updated successfully"})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_deal(request):
    """
    Body: { "title": "...", "deal_value": 0, "lead_id": 1, "stage_id": 1 }
    """
    title = request.data.get("title")
    deal_value = request.data.get("deal_value")
    priority = request.data.get("priority", "medium")
    lead_id = request.data.get("lead_id")
    stage_id = request.data.get("stage_id")

    from leads.models import Lead, PipelineStage, Deal
    from .serializers import DealSerializer

    # 1. Ensure all 4 stages exist (Seeding logic)
    stages_to_ensure = [
        ("Discovery", 1),
        ("Proposal", 2),
        ("Negotiation", 3),
        ("Closed", 4)
    ]
    for name, order in stages_to_ensure:
        PipelineStage.objects.get_or_create(name=name, defaults={"order": order})

    # 2. Extract and Validate deal_value
    from decimal import Decimal, InvalidOperation
    try:
        clean_value = Decimal(str(deal_value or 0))
    except (InvalidOperation, ValueError):
        clean_value = Decimal('0.00')

    # 3. Always create/get a unique Lead for this deal
    # If no lead_id is provided, we create a new Lead using the deal title as the company
    if lead_id:
        try:
            lead = Lead.objects.get(id=lead_id)
        except Lead.DoesNotExist:
            return Response({"error": "Lead not found"}, status=404)
    else:
        # Create a fresh lead for every new deal added via the quick-add modal
        lead = Lead.objects.create(
            first_name=title.split(' ')[0] if title else "New",
            last_name=title.split(' ')[1] if title and ' ' in title else "Lead",
            company=title or "New Company",
            email=f"lead_{Decimal(timezone.now().timestamp())}@example.com",
            assigned_to=request.user
        )

    # 4. Resolve the correct stage
    stage_name_map = {
        1: "Discovery",
        2: "Proposal",
        3: "Negotiation",
        4: "Closed"
    }
    target_name = stage_name_map.get(int(stage_id) if stage_id else 1, "Discovery")
    stage = PipelineStage.objects.filter(name__iexact=target_name).first()
    
    # Final fallback if something is weird
    if not stage:
        stage = PipelineStage.objects.first()

    # 5. Create the Deal
    deal = Deal.objects.create(
        lead=lead,
        title=title,
        deal_value=clean_value,
        priority=priority,
        stage=stage
    )

    return Response(DealSerializer(deal).data, status=201)


@api_view(['PATCH', 'PUT'])
@permission_classes([IsAuthenticated])
def update_deal(request, deal_id):
    try:
        deal = Deal.objects.get(id=deal_id)
    except Deal.DoesNotExist:
        return Response({"error": "Deal not found"}, status=404)

    serializer = DealSerializer(deal, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_deal(request, deal_id):
    try:
        deal = Deal.objects.get(id=deal_id)
        deal.delete()
        return Response({"message": "Deal deleted successfully"}, status=204)
    except Deal.DoesNotExist:
        return Response({"error": "Deal not found"}, status=404)


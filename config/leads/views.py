# leads/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from django.db.models import Sum, Count, Q
from django.utils import timezone
from datetime import timedelta

from .models import Lead, Deal, FollowUp, User, Notification

class DashboardDataView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        role = user.role.name if user.role else 'Sales Rep'
        
        if role == 'Sales Manager' or role == 'sales_manager':
            return self.get_manager_data(user)
        else:
            return self.get_rep_data(user)

    def get_manager_data(self, user):
        # Filter leads/deals by team managed by this user
        # For simplicity in this demo, we'll assume manager sees all data
        # In a real app, you'd filter by team: Q(team__manager=user)
        
        leads = Lead.objects.all()
        deals = Deal.objects.all()
        followups = FollowUp.objects.all()

        total_pipeline = deals.aggregate(total=Sum('deal_value'))['total'] or 0
        total_revenue = deals.filter(is_won=True).aggregate(total=Sum('deal_value'))['total'] or 0
        
        total_leads = leads.count()
        won_deals = deals.filter(is_won=True).count()
        conversion_rate = (won_deals / total_leads * 100) if total_leads > 0 else 0

        overdue_followups = followups.filter(
            status='pending', 
            followup_date__lt=timezone.now()
        ).count()

        deals_closing_soon = deals.filter(
            is_won=False, 
            is_lost=False,
            expected_close_date__lte=timezone.now().date() + timedelta(days=30)
        ).count()

        # Team performance summary
        team_members = User.objects.filter(role__name='Sales Rep')
        team_data = []
        for member in team_members:
            member_leads = leads.filter(assigned_to=member)
            member_deals = deals.filter(lead__assigned_to=member)
            member_revenue = member_deals.filter(is_won=True).aggregate(total=Sum('deal_value'))['total'] or 0
            
            team_data.append({
                "name": member.first_name,
                "deals": member_deals.filter(is_won=True).count(),
                "revenue": f"${member_revenue:,.0f}",
                "conv": f"{(member_deals.filter(is_won=True).count() / member_leads.count() * 100 if member_leads.count() > 0 else 0):.0f}%",
                "followUps": followups.filter(user=member, status='pending').count()
            })

        return Response({
            "stats": [
                { "label": 'TOTAL PIPELINE VALUE', "value": float(total_pipeline/1000000), "prefix": '$', "suffix": 'M', "trend": '+6%', "positive": True },
                { "label": 'TOTAL REVENUE', "value": float(total_revenue/1000), "prefix": '$', "suffix": 'k', "trend": '+8%', "positive": True },
                { "label": 'TEAM CONVERSION', "value": round(conversion_rate), "prefix": '', "suffix": '%', "trend": '-2%', "positive": False },
                { "label": 'OVERDUE FOLLOW-UPS', "value": overdue_followups, "prefix": '', "suffix": '', "trend": '5%', "positive": True },
                { "label": 'DEALS CLOSING', "value": deals_closing_soon, "prefix": '', "suffix": '', "trend": '+4%', "positive": True },
            ],
            "teamData": team_data
        })

    def get_rep_data(self, user):
        leads = Lead.objects.filter(assigned_to=user)
        deals = Deal.objects.filter(lead__assigned_to=user)
        followups = FollowUp.objects.filter(user=user)

        leads_today = leads.filter(created_at__date=timezone.now().date()).count()
        pipeline_value = deals.aggregate(total=Sum('deal_value'))['total'] or 0
        
        won_deals = deals.filter(is_won=True).count()
        total_leads = leads.count()
        conversion_rate = (won_deals / total_leads * 100) if total_leads > 0 else 0
        
        pending_followups = followups.filter(status='pending').count()

        # Active Leads for Table
        active_leads_list = []
        for lead in leads.order_by('-updated_at')[:5]:
            active_leads_list.append({
                "name": f"{lead.first_name} {lead.last_name}",
                "status": lead.get_status_display(),
                "lastContact": "Just Now" # In real app, calculate from followups
            })

        return Response({
            "stats": [
                { "label": 'LEADS ASSIGNED TODAY', "value": leads_today, "prefix": '', "suffix": '', "trend": '+5%', "positive": True },
                { "label": 'MY PIPELINE VALUE', "value": float(pipeline_value/1000), "prefix": '$', "suffix": 'k', "trend": '+8%', "positive": True },
                { "label": 'PERSONAL CONVERSION', "value": round(conversion_rate), "prefix": '', "suffix": '%', "trend": '-2%', "positive": False },
                { "label": 'PENDING FOLLOW-UPS', "value": pending_followups, "prefix": '0', "suffix": '', "trend": '+1%', "positive": True },
            ],
            "activeLeads": active_leads_list
        })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def notifications_list(request):
    """Return all notifications for the current user, newest first."""
    notifications = Notification.objects.filter(
        receiver=request.user
    ).select_related('sender').order_by('-created_at')[:50]

    data = [
        {
            "id": n.id,
            "message": n.message,
            "type": n.type,
            "is_read": n.is_read,
            "created_at": n.created_at.isoformat(),
            "sender": f"{n.sender.first_name} {n.sender.last_name}".strip() or n.sender.email,
        }
        for n in notifications
    ]
    unread_count = Notification.objects.filter(receiver=request.user, is_read=False).count()
    return Response({"notifications": data, "unread_count": unread_count})


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def notification_mark_read(request, pk):
    """Mark a single notification as read."""
    try:
        n = Notification.objects.get(pk=pk, receiver=request.user)
    except Notification.DoesNotExist:
        return Response({"error": "Not found"}, status=status.HTTP_404_NOT_FOUND)
    n.is_read = True
    n.save(update_fields=['is_read'])
    return Response({"id": n.id, "is_read": True})


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def notifications_mark_all_read(request):
    """Mark all notifications for the current user as read."""
    Notification.objects.filter(receiver=request.user, is_read=False).update(is_read=True)
    return Response({"status": "ok"})

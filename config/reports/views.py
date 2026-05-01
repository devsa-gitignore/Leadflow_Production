from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Count, Sum

from leads.models import Lead
from pipeline.models import Deal
from .serializers import ExecutivePerformanceSerializer


@api_view(["GET"])
def reports_dashboard(request):

    user = request.user  

    # 🔹 Role-based filtering
    if user.role and user.role.name == "Sales Rep":
        leads = Lead.objects.filter(assigned_to=user)
        deals = Deal.objects.filter(lead__assigned_to=user)
    else:
        leads = Lead.objects.filter(team__manager=user)
        deals = Deal.objects.filter(lead__team__manager=user)

    # 🔹 Summary
    total_revenue = deals.filter(is_won=True).aggregate(
        total=Sum("deal_value")
    )["total"] or 0

    active_leads = leads.count()

    converted = deals.filter(is_won=True).count()
    conversion_rate = (converted / active_leads * 100) if active_leads > 0 else 0

    # 🔹 Monthly revenue
    monthly_data = []
    for month in range(1, 13):
        month_revenue = deals.filter(
            is_won=True,
            created_at__month=month
        ).aggregate(total=Sum("deal_value"))["total"] or 0

        monthly_data.append({
            "month": month,
            "revenue": month_revenue
        })

    # 🔹 Lead source performance
    source_data = leads.values("source__name").annotate(count=Count("id"))
    total_leads_count = leads.count()

    lead_sources = []
    for src in source_data:
        percentage = (
            src["count"] / total_leads_count * 100
            if total_leads_count > 0 else 0
        )

        lead_sources.append({
            "source": src["source__name"] or "Unknown",
            "percentage": round(percentage, 2)
        })

    # 🔹 Executive performance
    executives = []
    users = leads.values("assigned_to").distinct()

    for u in users:
        user_leads = leads.filter(assigned_to=u["assigned_to"])
        user_deals = deals.filter(
            lead__assigned_to=u["assigned_to"],
            is_won=True
        )

        total = user_leads.count()
        conversions = user_deals.count()

        rate = (conversions / total * 100) if total > 0 else 0

        first_lead = user_leads.first()

        executives.append({
            "name": first_lead.assigned_to.first_name if first_lead else "Unknown",
            "total_leads": total,
            "conversions": conversions,
            "conversion_rate": round(rate, 2)
        })

    return Response({
        "summary": {
            "total_revenue": total_revenue,
            "active_leads": active_leads,
            "conversion_rate": round(conversion_rate, 2)
        },
        "revenue_trend": monthly_data,
        "lead_sources": lead_sources,
        "executive_performance": ExecutivePerformanceSerializer(executives, many=True).data
    })

from leads.models import Invoice

@api_view(["GET"])
def reports_summary(request):
    user = request.user
    
    # Base querysets
    invoices = Invoice.objects.all()
    deals = Deal.objects.all()
    
    if hasattr(user, 'role') and user.role:
        if user.role.name == "Sales Rep":
            invoices = invoices.filter(deal__lead__assigned_to=user)
            deals = deals.filter(lead__assigned_to=user)
        elif user.role.name == "Sales Manager" and user.team:
            invoices = invoices.filter(deal__lead__assigned_to__team=user.team)
            deals = deals.filter(lead__assigned_to__team=user.team)
            
    from datetime import timedelta
    from django.utils.timezone import now
    
    range_param = request.query_params.get("range", "last_30_days")
    
    if range_param == "last_30_days":
        start_date = now() - timedelta(days=30)
    elif range_param == "last_week":
        start_date = now() - timedelta(days=7)
    elif range_param == "yesterday":
        start_date = now() - timedelta(days=1)
    elif range_param == "last_year":
        start_date = now() - timedelta(days=365)
    else:
        start_date = now() - timedelta(days=30)

    invoices = invoices.filter(created_at__gte=start_date)
    deals = deals.filter(created_at__gte=start_date)
            
    # Aggregations
    total_revenue = invoices.filter(status='PAID').aggregate(total=Sum('amount'))['total'] or 0
    total_invoiced = invoices.aggregate(total=Sum('amount'))['total'] or 0
    
    paid_amount = invoices.filter(status='PAID').aggregate(total=Sum('amount'))['total'] or 0
    pending_amount = invoices.filter(status='PENDING').aggregate(total=Sum('amount'))['total'] or 0
    overdue_amount = invoices.filter(status='OVERDUE').aggregate(total=Sum('amount'))['total'] or 0
    
    deals_closed = deals.filter(result='WON').count()
    deals_lost = deals.filter(result='LOST').count()
    
    total_closed = deals_closed + deals_lost
    conversion_rate = (deals_closed / total_closed * 100) if total_closed > 0 else 0
    
    trend_data = []
    
    if range_param in ["last_week", "last_30_days", "yesterday"]:
        # Group by day
        days = 30 if range_param == "last_30_days" else (7 if range_param == "last_week" else 1)
        for i in range(days, -1, -1):
            target_date = now() - timedelta(days=i)
            amount = invoices.filter(
                status='PAID',
                created_at__date=target_date.date()
            ).aggregate(total=Sum('amount'))['total'] or 0
            
            trend_data.append({
                "month": target_date.strftime("%b %d"),
                "amount": amount
            })
    else:
        # Group by month (last_year)
        import datetime
        current_month = datetime.datetime.now().month
        month_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        
        for m in range(1, 13):
            if m <= current_month:
                amount = invoices.filter(
                    status='PAID',
                    created_at__month=m
                ).aggregate(total=Sum('amount'))['total'] or 0
            else:
                amount = 0
                
            trend_data.append({
                "month": month_names[m - 1],
                "amount": amount
            })

    lead_source_performance = {
        "DIRECT": deals.filter(lead_source="DIRECT").count(),
        "PAID": deals.filter(lead_source="PAID").count(),
        "REFERRAL": deals.filter(lead_source="REFERRAL").count(),
        "SOCIAL": deals.filter(lead_source="SOCIAL").count(),
    }
    
    return Response({
        "total_revenue": total_revenue,
        "total_invoiced": total_invoiced,
        "paid_amount": paid_amount,
        "pending_amount": pending_amount,
        "overdue_amount": overdue_amount,
        "deals_closed": deals_closed,
        "deals_lost": deals_lost,
        "conversion_rate": round(conversion_rate, 2),
        "lead_source_performance": lead_source_performance,
        "trend_data": trend_data
    })
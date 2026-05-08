from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import CalendarEvent, User
from .serializers import CalendarEventSerializer, AttendeeSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_list(request):
    """Return all users for attendee search/selection."""
    query = request.query_params.get('q', '').strip()
    users = User.objects.all()
    if query:
        from django.db.models import Q
        users = users.filter(
            Q(first_name__icontains=query) |
            Q(last_name__icontains=query) |
            Q(email__icontains=query)
        )
    return Response(AttendeeSerializer(users, many=True).data)

class CalendarEventViewSet(viewsets.ModelViewSet):
    serializer_class = CalendarEventSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = CalendarEvent.objects.all().order_by('start_time')
        user_id = self.request.query_params.get('user')
        lead_id = self.request.query_params.get('lead')

        if user_id:
            queryset = queryset.filter(user_id=user_id)
        if lead_id:
            queryset = queryset.filter(lead_id=lead_id)

        return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response({
                "message": "Event created successfully",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Event updated successfully",
                "data": serializer.data
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({
            "message": "Event deleted successfully"
        }, status=status.HTTP_204_NO_CONTENT)
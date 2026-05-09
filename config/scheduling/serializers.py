from rest_framework import serializers
from .models import CalendarEvent, User


class AttendeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email']


class CalendarEventSerializer(serializers.ModelSerializer):
    # Read: return full attendee objects
    attendees = AttendeeSerializer(many=True, read_only=True)
    # Write: accept a list of user PKs
    attendee_ids = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=User.objects.all(),
        write_only=True,
        required=False,
    )

    class Meta:
        model = CalendarEvent
        fields = [
            'id',
            'title',
            'description',
            'start_time',
            'end_time',
            'event_type',
            'location',
            'meeting_link',
            'all_day',
            'user',
            'attendees',
            'attendee_ids',
            'lead',
            'deal',
            'permissions',
            'reminders',
            'recurrence',
            'timezone',
        ]
        read_only_fields = ['user']
        extra_kwargs = {
            'meeting_link': {'required': False, 'allow_blank': True},
            'all_day': {'required': False},
            'description': {'required': False, 'allow_blank': True},
            'location': {'required': False, 'allow_blank': True},
            'lead': {'required': False, 'allow_null': True},
            'deal': {'required': False, 'allow_null': True},
            'permissions': {'required': False},
            'reminders': {'required': False},
            'recurrence': {'required': False},
            'timezone': {'required': False, 'allow_blank': True},
        }

    def create(self, validated_data):
        # attendee_ids is the write field key (no source= set), pop it before create
        attendee_ids = validated_data.pop('attendee_ids', [])
        instance = CalendarEvent.objects.create(**validated_data)
        if attendee_ids:
            instance.attendees.set(attendee_ids)
        return instance

    def update(self, instance, validated_data):
        attendee_ids = validated_data.pop('attendee_ids', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        if attendee_ids is not None:
            instance.attendees.set(attendee_ids)
        return instance

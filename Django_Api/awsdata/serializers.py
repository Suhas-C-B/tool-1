from rest_framework import serializers
from .models import *


class AwsAnnoteSerializer(serializers.ModelSerializer):
    # obj_class = serializers.DictField(child=serializers.CharField(max_length = 200, allow_blank = True))
    obj_class = serializers.ListField(child=serializers.CharField(max_length = 200, allow_blank = True))
    box_height = serializers.ListField(child=serializers.IntegerField())
    box_weidth = serializers.ListField(child=serializers.IntegerField())
    x_value = serializers.ListField(child=serializers.IntegerField())
    y_value = serializers.ListField(child=serializers.IntegerField())
    # truncation = serializers.DictField(child=serializers.CharField(max_length = 200, allow_blank = True))
    truncation = serializers.ListField(child=serializers.CharField(max_length = 200, allow_blank = True))
    # yaw = serializers.DictField(child=serializers.CharField(max_length = 200, allow_blank = True))
    yaw = serializers.ListField(child=serializers.IntegerField())
    # pitch = serializers.DictField(child=serializers.CharField(max_length = 200, allow_blank = True))
    pitch = serializers.ListField(child=serializers.IntegerField())
    # roll = serializers.DictField(child=serializers.CharField(max_length = 200, allow_blank = True))
    roll = serializers.ListField(child=serializers.IntegerField())
    distance = serializers.ListField(child=serializers.IntegerField())
    class Meta:
        model = AwsAnnote
        fields = "__all__"
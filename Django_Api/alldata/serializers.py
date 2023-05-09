from rest_framework import serializers
from .models import *


class AnnoteSerializer(serializers.ModelSerializer):
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
        model = Annote
        fields = "__all__"

    def update(self, instance, validated_data):
        instance.box_weidth = validated_data.get('box_weidth', instance.box_weidth)
        instance.distance = validated_data.get('distance', instance.distance)
        instance.focalLength = validated_data.get('focalLength', instance.focalLength)
        instance.realWidth = validated_data.get('realWidth', instance.realWidth)

        instance.distance =[]
        for x in range(len(instance.box_weidth)):
            object_width_in_frame = instance.box_weidth[x]
            distance = (instance.realWidth * instance.focalLength) / object_width_in_frame
            instance.distance.append(distance)
        instance.save()
        return instance


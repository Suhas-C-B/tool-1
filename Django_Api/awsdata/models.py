from django.db import models
from account.models import User


class AwsAnnote(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default= 1)
    obj_class = models.JSONField(default=list, blank= True)
    transmission = models.BooleanField(default=False)
    box_height = models.JSONField(default=list, null= True)
    box_weidth = models.JSONField(default=list, null= True)
    x_value = models.JSONField(default=list, null= True)
    y_value = models.JSONField(default=list, null= True)
    truncation = models.JSONField(default=list, blank= True)
    yaw = models.JSONField(default=list, blank= True)
    pitch = models.JSONField(default=list, blank= True)
    roll = models.JSONField(default=list, blank= True)
    focalLength = models.IntegerField(blank=True)
    realWidth = models.IntegerField(blank=True)
    distance = models.JSONField(default=list, blank= True)
    img_path = models.CharField(max_length= 200, blank=True)
    img_data = models.TextField(max_length=50000, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
from django.shortcuts import render
from .serializers import AwsAnnoteSerializer
from .models import AwsAnnote
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from aws.models import AwsCredential

import boto3
import json
import datetime


class AwsAnnoteView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format =None):
        USER = self.request.user
        serializer =AwsAnnoteSerializer(data= request.data)
        if serializer.is_valid():
            input_data = set(serializer.initial_data.keys())
            required_fields = set(serializer.fields.keys())
            ext_data =  input_data - required_fields
            print(ext_data)
            if ext_data:
                return Response({'msg':f"You have provided extra field {ext_data}"}, status.HTTP_400_BAD_REQUEST)
            box_weidth = serializer.validated_data['box_weidth']
            focalLength = serializer.validated_data['focalLength']
            realWidth = serializer.validated_data['realWidth']
            addlist =[]
            for x in range(len(box_weidth)):
                object_width_in_frame = box_weidth[x]
                distace = (realWidth * focalLength) / object_width_in_frame
                addlist.append(distace)
                
            # serializer.save(user=self.request.user, distance= addlist)

            dt = AwsCredential.objects.filter(user = USER)
            if not dt:
                return Response({'msg':'user does not have AWS data'})
            else:
                try:
                    awsID = dt[0].accessID
                    awsKey = dt[0].secretKey
                    awsbuck = dt[0].bucketName
                    awsreg = dt[0].regionName
                    s3_client = boto3.client('s3',
                                                aws_access_key_id = awsID,
                                                aws_secret_access_key = awsKey)
                    serializer.validated_data['distance'] = addlist
                    json_data = serializer.validated_data
                    json_data = json.dumps(serializer.validated_data).encode('utf-8')
                    now = datetime.datetime.now()
                    timestamp = now.strftime("%Y-%m-%d_%H-%M-%S")
                    filename = f"data_{timestamp}.json"
                    s3_client.put_object(Body= json_data, Bucket= awsbuck, Key= filename)
                    return Response({'msg':'Data created'}, status= status.HTTP_201_CREATED)
                except Exception:
                    return Response({'msg':'Your bucket id not present'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

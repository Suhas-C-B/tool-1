from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated


        ## for AWS
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import json
import boto3
from botocore.config import Config


class AnnoteView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk = None, format = None):
        id = pk
        user = self.request.user
        if id is not None:
            dt = Annote.objects.filter(id =id, user= user)
            if not dt:
                return Response({'detail': 'Data not found.'}, status=status.HTTP_404_NOT_FOUND)
            else:
                dt = Annote.objects.get(id=id)
                serializer = AnnoteSerializer(dt)
                return Response(serializer.data)
        if id is None:
            dt = Annote.objects.filter(user= user)
            if not dt:
                return Response({'detail': 'Data not found.'}, status=status.HTTP_404_NOT_FOUND)
            else:
                dt = Annote.objects.filter(user=user)
                serializer = AnnoteSerializer(dt, many = True)
                return Response(serializer.data)


    def post(self, request, format =None):
        serializer = AnnoteSerializer(data= request.data)
        if serializer.is_valid():
            input_data = set(serializer.initial_data.keys())
            required_fields = set(serializer.fields.keys())
            ext_data =  input_data - required_fields 
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
            serializer.save(user=self.request.user, distance= addlist)
            return Response({'msg':'Data created'}, status= status.HTTP_201_CREATED)

                        ## for AWS
            # data = serializer.data
            # json_data = json.dumps(data)
            # file_name = 'data.json'
            # file = ContentFile(json_data.encode())
            # file_path = default_storage.save(file_name, file)
            # file_url = default_storage.url(file_path)
            # return Response({'msg':'Data created'}, status= status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)


    def put(self, request, pk = None, format = None):
        id = pk
        user = self.request.user
        dt = Annote.objects.filter(id =id, user= user)
        if not dt:
            return Response({'detail': 'Data not found.'}, status=status.HTTP_404_NOT_FOUND)
        else:
            dt = Annote.objects.get(id=id)
            serializer = AnnoteSerializer(dt, data= request.data)
            if serializer.is_valid():
                input_data = set(serializer.initial_data.keys())
                required_fields = set(serializer.fields.keys())
                ext_data =  input_data - required_fields 
                if ext_data:
                    return Response({'msg':f"You have provided extra field {ext_data}"}, status.HTTP_400_BAD_REQUEST)
                serializer.save()
                return Response({'msg':'Complete Data updated'})
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
    

    def patch(self, request, pk = None, format = None):
        id = pk
        user = self.request.user
        dt = Annote.objects.filter(id =id, user= user)
        if not dt:
            return Response({'detail': 'Data not found.'}, status=status.HTTP_404_NOT_FOUND)
        else:
            dt = Annote.objects.get(id=id)
            serializer = AnnoteSerializer(dt, data= request.data, partial = True)
            if serializer.is_valid():
                input_data = set(serializer.initial_data.keys())
                required_fields = set(serializer.fields.keys())
                ext_data =  input_data - required_fields 
                if ext_data:
                    return Response({'msg':f"You have provided extra field {ext_data}"}, status.HTTP_400_BAD_REQUEST)
                serializer.save()
                return Response({'msg':'Partial Data updated'})
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)


    def delete(self, request, pk = None, forma = None):
        id = pk
        user = self.request.user
        dt = Annote.objects.filter(id =id, user= user)
        if not dt:
            return Response({'detail': 'Data not found.'}, status=status.HTTP_404_NOT_FOUND)
        else:
            dt = Annote.objects.get(id=id)
            dt.delete()
            return Response({'msg':'Data deleted'})

from .serializers import CreateAvailabilitiesSerializer
from rest_framework import generics, status
from rest_framework.response import Response

'''
AvailabilitiesView is the content delivered back to the client
'''


class AvailabilitiesView(generics.GenericAPIView):
    def post(self, request, **kwargs):
        # Serializes the data receied from the client to check for valid
        # fields
        serializer = CreateAvailabilitiesSerializer(data=request.data)

        # Appropriate response is made
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

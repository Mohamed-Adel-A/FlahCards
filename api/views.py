from rest_framework import viewsets, permissions, status, generics
from flashCards.models import Collection, Card
from .serializers import CollectionSerializer, CardSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework.decorators import action
from knox.models import AuthToken
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import get_object_or_404

from rest_framework.views import APIView


class CollectionCreate(generics.ListCreateAPIView):
    serializer_class = CollectionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Collection.objects.filter(user=user).order_by('-created_at')
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CollectionRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CollectionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Collection.objects.filter(user=user)


## Card views ##
class CardCreate(generics.ListCreateAPIView):
    serializer_class = CardSerializer
    permission_classes=[permissions.IsAuthenticated]

    def get_queryset(self):
        #collection = self.kwargs.get("collection")
        collection = get_object_or_404(Collection, 
                                       pk=self.kwargs["collection"], 
                                       user=self.request.user)
        return Card.objects.filter(collection=collection).order_by('-created_at')
    
    def perform_create(self, serializer):
        collection = get_object_or_404(Collection, 
                                       pk=self.kwargs["collection"], 
                                       user=self.request.user)
        serializer.save(collection=collection)


class CardRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CardSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        collection = get_object_or_404(Collection, 
                                       pk=self.kwargs["collection"], 
                                       user=self.request.user)
        return Card.objects.filter(collection=collection)



############################



"""
class CollectionViewSet(viewsets.ModelViewSet):
#    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Collection.objects.filter(user=user).order_by('-created_at')


class CardViewSet(viewsets.ModelViewSet):
    queryset = Card.objects.all()
    serializer_class = CardSerializer
    permission_classes = [permissions.IsAuthenticated]

"""

class UserRegisterAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'user': user.username, 'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLoginAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            token = AuthToken.objects.create(user)[1]
            return Response({'token': token})
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class UserLogoutAPIView(APIView):
    def post(self, request):
        logout(request)
        return Response({'message': 'User logged out successfully'}, status=status.HTTP_200_OK)
'''
class UserViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    @action(detail=False, methods=['post'])
    def signup(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        _, token = AuthToken.objects.create(user)
        return Response({"user": serializer.data, "token": token}, status=status.HTTP_201_CREATED)

#    @action(detail=False, methods=['post'])
#    def login(self, request):
#        serializer = LoginSerializer(data=request.data)
#        serializer.is_valid(raise_exception=True)
#        user = serializer.validated_data['user']
#        login(request, user)
#        _, token = AuthToken.objects.create(user)
#        return Response({"user": UserSerializer(user).data, "token": token}, status=status.HTTP_200_OK)


    @action(detail=False, methods=['post'])
    def user_login(request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            token = AuthToken.objects.create(user)[1]
            return Response({'token': token})
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=False, methods=['post'])
    def user_logout(request):
        logout(request)
        return Response({'message': 'User logged out successfully'}, status=status.HTTP_200_OK)
'''
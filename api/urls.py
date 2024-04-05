from django.urls import path, include
from rest_framework import routers
from .views import UserRegisterAPIView, UserLoginAPIView, UserLogoutAPIView #CardViewSet, CollectionViewSet,  UserViewSet
from .views import CollectionCreate, CollectionRetrieveUpdateDestroy
from .views import CardCreate, CardRetrieveUpdateDestroy
from .views import LoginAPI
from knox.views import LogoutView, LogoutAllView


router = routers.DefaultRouter()
"""
router.register(r'collections', CollectionViewSet, basename='collections')
router.register(r'cards', CardViewSet, basename='cards')
"""

# user_router = routers.DefaultRouter()
# user_router.register(r'users', UserViewSet, basename='users')

urlpatterns = [
    path('', include(router.urls)),
    path('users/', include('knox.urls')),
    path('signup/', UserRegisterAPIView.as_view()),
    path('login/', UserLoginAPIView.as_view()),
    path('logout/', UserLogoutAPIView.as_view()),
    path('collections/', CollectionCreate.as_view()),
    path('collections/<int:pk>/', CollectionRetrieveUpdateDestroy.as_view()),
    path('collections/<int:collection>/cards/', CardCreate.as_view()),
    path('collections/<int:collection>/cards/<int:pk>/', CardRetrieveUpdateDestroy.as_view()),
]
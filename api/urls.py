from django.urls import path, include
from rest_framework import routers
from .views import CollectionViewSet, CardViewSet, UserRegisterAPIView, UserLoginAPIView # UserViewSet

router = routers.DefaultRouter()
router.register(r'collections', CollectionViewSet)
router.register(r'cards', CardViewSet)

# user_router = routers.DefaultRouter()
# user_router.register(r'users', UserViewSet, basename='users')

urlpatterns = [
    path('', include(router.urls)),
    path('users/', include('knox.urls')),
    path('signup/', UserRegisterAPIView.as_view()),
    path('login/', UserLoginAPIView.as_view()),
    
]
from django.urls import path, include
from rest_framework import routers
from .views import CollectionViewSet, CardViewSet

router = routers.DefaultRouter()
router.register(r'collections', CollectionViewSet)
router.register(r'cards', CardViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
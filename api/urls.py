from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CommodityViewSet, CommodityCategoryViewSet

router = DefaultRouter()
router.register(r'commodities', CommodityViewSet)
router.register(r'commodity-categories', CommodityCategoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
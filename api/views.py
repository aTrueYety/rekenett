from rest_framework import viewsets
from .models import Commodity, CommodityCategory
from .serializers import CommoditySerializer, CommodityCategorySerializer

class CommodityViewSet(viewsets.ModelViewSet):
    queryset = Commodity.objects.all()
    serializer_class = CommoditySerializer
    
class CommodityCategoryViewSet(viewsets.ModelViewSet):
    queryset = CommodityCategory.objects.all()
    serializer_class = CommodityCategorySerializer


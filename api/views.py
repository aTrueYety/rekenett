from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Commodity, CommodityCategory, Transaction
from .serializers import CommoditySerializer, CommodityCategorySerializer, TransactionSerializer

class UserTransactionsViewSet(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer

    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user)

class CommodityViewSet(viewsets.ModelViewSet):
    queryset = Commodity.objects.all()
    serializer_class = CommoditySerializer
    
class CommodityCategoryViewSet(viewsets.ModelViewSet):
    queryset = CommodityCategory.objects.all()
    serializer_class = CommodityCategorySerializer


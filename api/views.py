from rest_framework import viewsets
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import Commodity, CommodityCategory, Transaction, ListTemplate, SignupCode
from .serializers import CommoditySerializer, CommodityCategorySerializer, TransactionSerializer, UserListTemplateSerializer, UserSerializer

class SignUpView(APIView):
    permission_classes = []
    
    def post(self, request):
        signup_code = request.data.get('signup_code')
        if not SignupCode.objects.filter(code=signup_code).exists():
            return Response({'error': 'Invalid signup code'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserTransactionsViewSet(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer

    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user)
    
class userListTemplateViewSet(viewsets.ModelViewSet):
    queryset = ListTemplate.objects.all()
    serializer_class = UserListTemplateSerializer
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context
    
    @action(detail=True, methods=['put'])
    def update_user_in_list(self, request, pk=None):
        list_template = self.get_object()
        user = request.user
        is_user_in_list = request.data.get('is_user_in_list')

        if is_user_in_list:
            if user not in list_template.users.all():
                list_template.users.add(user)
        else:
            if user in list_template.users.all():
                list_template.users.remove(user)

        list_template.save()
        return Response({'status': 'user updated in list'})
    

class CommodityViewSet(viewsets.ModelViewSet):
    queryset = Commodity.objects.all()
    serializer_class = CommoditySerializer
    
class CommodityCategoryViewSet(viewsets.ModelViewSet):
    queryset = CommodityCategory.objects.all()
    serializer_class = CommodityCategorySerializer


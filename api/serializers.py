from rest_framework import serializers
from .models import Commodity, CommodityCategory, Transaction, List, ListTemplate

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'
        
class ListSerializer(serializers.ModelSerializer):
    class Meta:
        model = List
        fields = '__all__'
        
class ListTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListTemplate
        fields = '__all__'
        
class UserListTemplateSerializer(serializers.ModelSerializer):
    is_user_in_list = serializers.SerializerMethodField()

    class Meta:
        model = List
        fields = ['id', 'name', 'is_user_in_list']  # Include other fields as needed

    def get_is_user_in_list(self, obj):
        request = self.context.get('request', None)
        if request:
            return request.user in obj.users.all()
        return False
        
class CommoditySerializer(serializers.ModelSerializer):
    class Meta:
        model = Commodity
        fields = '__all__'
        
class CommodityCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CommodityCategory
        fields = '__all__'

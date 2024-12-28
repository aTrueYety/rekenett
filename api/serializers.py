from rest_framework import serializers
from .models import Commodity, CommodityCategory, Transaction, List, ListTemplate, User, SignupCode

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    signup_code = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'signup_code', 'first_name', 'last_name', 'phone']

    def create(self, validated_data):
        signup_code = validated_data.pop('signup_code')
        if not SignupCode.objects.filter(code=signup_code).exists():
            raise serializers.ValidationError({'signup_code': 'Invalid signup code'})

        user = User(
            username=validated_data['username'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            phone=validated_data.get('phone', ''),
            password=validated_data['password']
        )
        user.save()
        return user

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

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CommodityViewSet, CommodityCategoryViewSet, UserTransactionsViewSet, userListTemplateViewSet, SignUpView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter()
router.register(r'user-list-templates', userListTemplateViewSet)

urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user-transactions/', UserTransactionsViewSet.as_view({'get': 'list'}), name='user-transactions'),
    path('', include(router.urls)),
]
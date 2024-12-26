from django.contrib import admin
from .models import Commodity, CommodityCategory, Transaction, User, Section

# ---------------------- Users ---------------------- #
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'phone']
admin.site.register(User, UserAdmin)

# ---------------------- Sections ---------------------- #
class SectionAdmin(admin.ModelAdmin):
    list_display = ['name']
admin.site.register(Section, SectionAdmin)

# ---------------------- Transaction ---------------------- #
class TransactionAdmin(admin.ModelAdmin):
    list_display = ['user', 'amount', 'date', 'description']
admin.site.register(Transaction, TransactionAdmin)

# ---------------------- Commodities ---------------------- #
class CommodityAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price_internal', 'price_external']
admin.site.register(Commodity, CommodityAdmin)

class CommodityCategoryAdmin(admin.ModelAdmin):
    list_display = ['name']
admin.site.register(CommodityCategory, CommodityCategoryAdmin)
from django.contrib import admin
from .models import Commodity, CommodityCategory, Transaction, User, Section, ListTemplate, List, Quote, SignupCode

# ---------------------- Users ---------------------- #
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'phone']
admin.site.register(User, UserAdmin)

class SignupCodeAdmin(admin.ModelAdmin):
    list_display = ['code']
admin.site.register(SignupCode, SignupCodeAdmin)

# ---------------------- Sections ---------------------- #
class SectionAdmin(admin.ModelAdmin):
    list_display = ['name']
admin.site.register(Section, SectionAdmin)

# ---------------------- Transaction ---------------------- #
class TransactionAdmin(admin.ModelAdmin):
    list_display = ['user', 'amount', 'date', 'description']
admin.site.register(Transaction, TransactionAdmin)

# ---------------------- Lists ---------------------- #
class ListTemplateAdmin(admin.ModelAdmin):
    list_display = ['name']
admin.site.register(ListTemplate, ListTemplateAdmin)

class ListAdmin(admin.ModelAdmin):
    list_display = ['name', 'date', 'author']
admin.site.register(List, ListAdmin)

# ---------------------- Commodities ---------------------- #
class CommodityAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price_internal', 'price_external']
admin.site.register(Commodity, CommodityAdmin)

class CommodityCategoryAdmin(admin.ModelAdmin):
    list_display = ['name']
admin.site.register(CommodityCategory, CommodityCategoryAdmin)

# ---------------------- Qutes ---------------------- #
class QuoteAdmin(admin.ModelAdmin):
    list_display = ['text', 'author', 'date']
admin.site.register(Quote, QuoteAdmin)
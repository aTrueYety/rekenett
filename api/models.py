from django.db import models
from django.contrib.auth.models import AbstractUser

# ---------------------- Users ---------------------- #
class User(AbstractUser):
    phone = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return self.username
    
    class Meta:
        verbose_name_plural = 'Users'
        
# ---------------------- Sections ---------------------- #
class Section(models.Model):
    name = models.CharField(max_length=30, blank=False, null=False)
    eulogi = models.TextField(blank=True, null=True)
    color = models.CharField(max_length=7, blank=False, null=False, default='#FFFFFF')

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = 'Sections'
        
# ---------------------- Transactions ---------------------- #
class Transaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, null=False)
    amount = models.IntegerField(blank=False, null=False)
    date = models.DateTimeField(auto_now_add=True, blank=False, null=False)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.user.username + ' - ' + str(self.amount)    
    
    class Meta:
        verbose_name_plural = 'Transactions'

# ---------------------- Commodities ---------------------- #
class CommodityCategory(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = 'Commodity Categories'

class Commodity(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False)
    description = models.TextField(blank=True, null=True)
    price_internal = models.IntegerField(blank=False, null=False)
    price_external = models.IntegerField(blank=False, null=False)
    category = models.ForeignKey(CommodityCategory, on_delete=models.SET_NULL, blank=True, null=True)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = 'Commodities'
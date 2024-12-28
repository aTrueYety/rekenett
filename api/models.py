from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

# ---------------------- Users ---------------------- #
class UserManager(BaseUserManager):
    def create_user(self, username, password=None, signup_code=None, validate_signup_code=True, **extra_fields):
        if validate_signup_code:
            if not signup_code:
                raise ValueError('Signup code is required')
            if not SignupCode.objects.filter(code=signup_code).exists():
                raise ValueError('Invalid signup code')
        
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        
        return self.create_user(username, password, validate_signup_code=False, **extra_fields)
    
class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=100, blank=False, null=False, unique=True)
    first_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100, blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []
    
    objects = UserManager()
    
    def save(self, *args, **kwargs):
        if self.pk is None or 'password' in self.get_dirty_fields():
            print(self.password)
            print('Password changed')
            self.set_password(self.password)
        super().save(*args, **kwargs)    
    
    def get_dirty_fields(self):
        """
        Returns a dictionary of fields that have been changed.
        """
        if not self.pk:
            return {}
        old_instance = User.objects.get(pk=self.pk)
        dirty_fields = {}
        for field in self._meta.fields:
            field_name = field.name
            old_value = getattr(old_instance, field_name)
            new_value = getattr(self, field_name)
            if old_value != new_value:
                dirty_fields[field_name] = (old_value, new_value)
        return dirty_fields

    def __str__(self):
        return self.username
    
    class Meta:
        verbose_name_plural = 'Users'
    
class SignupCode(models.Model):
    code = models.CharField(max_length=100, blank=False, null=False)

    def __str__(self):
        return self.code
    
    class Meta:
        verbose_name_plural = 'Signup Codes'
     
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
        
# ---------------------- Lists ---------------------- #
class ListTemplate(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False)
    users = models.ManyToManyField(User, blank=True)
    limit = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = 'List Templates'

class List(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False)
    users = models.ManyToManyField(User, blank=True, related_name='shared_lists')
    author = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True, related_name='authored_lists')
    date = models.DateTimeField(auto_now_add=True, blank=False, null=False)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = 'Lists'

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
        
# ---------------------- Quotes ---------------------- #
class Quote(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, null=False, related_name='authored_quotes')
    citer = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True, related_name='cited_quotes')
    text = models.TextField(blank=False, null=False)
    date = models.DateTimeField(auto_now_add=True, blank=False, null=False)

    def __str__(self):
        return self.author + ' - ' + self.text
    
    class Meta:
        verbose_name_plural = 'Quotes'
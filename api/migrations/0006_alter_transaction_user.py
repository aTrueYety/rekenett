# Generated by Django 5.1.4 on 2024-12-26 14:59

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_transaction_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaction',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.user'),
        ),
    ]

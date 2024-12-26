# Generated by Django 5.1.4 on 2024-12-26 14:32

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_commodity'),
    ]

    operations = [
        migrations.CreateModel(
            name='CommodityCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField(blank=True, null=True)),
            ],
            options={
                'verbose_name_plural': 'Commodity Categories',
            },
        ),
        migrations.DeleteModel(
            name='Example',
        ),
        migrations.AlterModelOptions(
            name='commodity',
            options={'verbose_name_plural': 'Commodities'},
        ),
        migrations.AlterField(
            model_name='commodity',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='commodity',
            name='category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.commoditycategory'),
        ),
    ]
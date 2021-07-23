# Generated by Django 3.1.7 on 2021-06-23 00:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ebay_api', '0002_auto_20210623_0019'),
    ]

    operations = [
        migrations.AddField(
            model_name='purchasedobject',
            name='shippingCompany',
            field=models.CharField(blank=True, max_length=60, null=True),
        ),
        migrations.AddField(
            model_name='purchasedobject',
            name='shippingNumber',
            field=models.CharField(blank=True, max_length=120, null=True),
        ),
    ]

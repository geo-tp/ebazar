# Generated by Django 3.1.7 on 2021-07-06 00:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ebay_api', '0021_auto_20210706_0020'),
    ]

    operations = [
        migrations.AlterField(
            model_name='purchasedobject',
            name='isPaid',
            field=models.BooleanField(blank=True, default=0, null=True),
        ),
    ]

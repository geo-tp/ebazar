# Generated by Django 3.1.7 on 2021-08-11 03:23

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('ebay_objects', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('ebay_account', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='operation',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='bid',
            name='obj',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ebay_objects.object'),
        ),
        migrations.AddField(
            model_name='bid',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
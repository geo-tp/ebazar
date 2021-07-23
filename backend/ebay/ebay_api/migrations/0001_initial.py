# Generated by Django 3.1.7 on 2021-06-23 00:17

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50, unique=True)),
                ('description', models.CharField(blank=True, max_length=1500)),
                ('img', models.ImageField(blank=True, upload_to='')),
            ],
        ),
        migrations.CreateModel(
            name='Duration',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.IntegerField(unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Object',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('description', models.CharField(max_length=1000)),
                ('actualPrice', models.FloatField(default=0)),
                ('creationDate', models.DateTimeField(auto_now_add=True)),
                ('durationInDays', models.IntegerField(default=7)),
                ('endingDate', models.DateTimeField(blank=True, null=True)),
                ('isActive', models.BooleanField(default=True)),
                ('isSelled', models.BooleanField(default=False)),
                ('reservePrice', models.FloatField(default=0)),
                ('shippingPrice', models.FloatField()),
                ('returnPolicy', models.BooleanField()),
                ('mainImage', models.ImageField(upload_to='')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ebay_api.category')),
            ],
        ),
        migrations.CreateModel(
            name='StateOfObject',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('description', models.CharField(blank=True, max_length=1500)),
            ],
        ),
        migrations.CreateModel(
            name='SubCategory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50, unique=True)),
                ('description', models.CharField(max_length=1500)),
                ('img', models.ImageField(blank=True, upload_to='')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ebay_api.category')),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('questionText', models.CharField(max_length=200)),
                ('answered', models.BooleanField(default=0)),
                ('viewed', models.BooleanField(default=0)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('obj', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ebay_api.object')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='PurchasedObject',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('isPaid', models.BooleanField(default=0)),
                ('isCancelled', models.BooleanField(default=0)),
                ('isComplete', models.BooleanField(default=0)),
                ('isShipped', models.BooleanField(default=0)),
                ('shippingNumber', models.CharField(blank=True, max_length=120, null=True)),
                ('shippingCompany', models.CharField(blank=True, max_length=60, null=True)),
                ('obj', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ebay_api.object')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='object',
            name='state',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ebay_api.stateofobject'),
        ),
        migrations.AddField(
            model_name='object',
            name='subcategory',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ebay_api.subcategory'),
        ),
        migrations.AddField(
            model_name='object',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='owner', to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('text', models.CharField(max_length=2000)),
                ('answered', models.BooleanField(default=0)),
                ('viewed', models.BooleanField(default=0)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('reciever', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reciever', to=settings.AUTH_USER_MODEL)),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sender', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('imageOfObject', models.ImageField(upload_to='')),
                ('obj', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ebay_api.object')),
            ],
        ),
        migrations.CreateModel(
            name='FollowedObject',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('obj', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ebay_api.object')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Bid',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.FloatField()),
                ('obj', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ebay_api.object')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('answerText', models.CharField(max_length=1000)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ebay_api.question')),
            ],
        ),
    ]

# Generated by Django 3.2.5 on 2021-08-01 15:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0005_alter_gstsale_customer_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='supplierpay_gst',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pending_amount', models.FloatField()),
                ('paid_amount', models.FloatField()),
                ('date', models.DateField(auto_now_add=True)),
                ('supplier_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dashboard.supplier_estimate')),
            ],
        ),
        migrations.CreateModel(
            name='customerpay_gst',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pending_amount', models.FloatField()),
                ('paid_amount', models.FloatField()),
                ('date', models.DateField(auto_now_add=True)),
                ('Description', models.CharField(blank=True, max_length=100, null=True)),
                ('customer_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dashboard.customer_estimate')),
            ],
        ),
    ]
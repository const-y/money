# Generated by Django 4.2.3 on 2023-07-23 10:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_rename_contragent_counterparty_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaction',
            name='counterparty',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='app.counterparty'),
        ),
    ]

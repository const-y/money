# Generated by Django 4.2 on 2023-07-24 17:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_alter_operation_sum'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='account_type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='app.accounttype'),
        ),
        migrations.AlterField(
            model_name='operation',
            name='account',
            field=models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='app.account'),
        ),
        migrations.AlterField(
            model_name='operation',
            name='transaction',
            field=models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='app.transaction'),
        ),
        migrations.AlterField(
            model_name='plan',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='app.category'),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='app.category'),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='counterparty',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.RESTRICT, to='app.counterparty'),
        ),
    ]

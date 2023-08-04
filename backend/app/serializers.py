from .models import AccountType, Account, Setting, Category
from rest_framework import serializers


class AccountTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountType
        fields = '__all__'


class AccountSerializer(serializers.ModelSerializer):
    accountTypeId = serializers.PrimaryKeyRelatedField(
        source='account_type', queryset=AccountType.objects.all())

    class Meta:
        model = Account
        fields = ['id', 'name', 'currency', 'accountTypeId', 'balance']


class SettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Setting
        fields = ['key', 'value']


class CapitalSerializer(serializers.Serializer):
    capital = serializers.FloatField()


class OperationSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    amount = serializers.FloatField()
    date = serializers.DateTimeField()
    description = serializers.CharField()
    categoryId = serializers.IntegerField(required=False)
    counterpartyId = serializers.IntegerField(required=False)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

from .models import AccountType, Account, Setting, Category, Operation, Transaction, CurrencyRate
from rest_framework import serializers


class AccountTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountType
        fields = '__all__'


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'name', 'currency', 'account_type', 'balance']


class SettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Setting
        fields = ['key', 'value']


class CapitalSerializer(serializers.Serializer):
    capital = serializers.FloatField()


class AccountOperationSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    amount = serializers.FloatField()
    date = serializers.DateTimeField()
    description = serializers.CharField()
    category = serializers.IntegerField(required=False)
    counterparty = serializers.IntegerField(required=False)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class OperationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Operation
        fields = ('account', 'amount')


class TransactionSerializer(serializers.ModelSerializer):
    operations = OperationSerializer(many=True, required=False)

    class Meta:
        model = Transaction
        fields = '__all__'


class CurrencyRateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurrencyRate
        fields = '__all__'


class IncomeExpensesReportSerializer(serializers.Serializer):
    income = serializers.FloatField()
    expenses = serializers.FloatField()


class ExpensesByCurrenciesReportSerializer(serializers.Serializer):
    currency = serializers.CharField()
    month = serializers.IntegerField()
    total_amount = serializers.DecimalField(max_digits=10, decimal_places=2)


class ExpensesByCurrenciesDetailsReportSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    total_amount = serializers.DecimalField(max_digits=10, decimal_places=2)

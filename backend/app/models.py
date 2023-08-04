from django.db import models
from django.db.models import Sum


DATE_FORMAT = '%Y-%m-%d %H:%M:%S'


class CurrencyField(models.CharField):
    def __init__(self, *args, **kwargs):
        kwargs['max_length'] = 3
        kwargs['choices'] = [
            ('RUB', 'Russian Ruble'),
            ('GEL', 'Georgian Lari'),
            ('USD', 'US Dollar'),
        ]
        super().__init__(*args, **kwargs)


class AccountType(models.Model):
    title = models.CharField(max_length=200)

    def __str__(self):
        return self.title


class Account(models.Model):
    name = models.CharField(max_length=200)
    currency = CurrencyField()
    account_type = models.ForeignKey(AccountType, on_delete=models.RESTRICT)

    @property
    def balance(self):
        return self.operations.aggregate(total_sum=Sum('amount'))['total_sum'] or 0

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=200)
    is_expense = models.BooleanField()

    def __str__(self):
        return self.name


class Counterparty(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Transaction(models.Model):
    description = models.CharField(max_length=500)
    date = models.DateTimeField()
    counterparty = models.ForeignKey(
        Counterparty, on_delete=models.RESTRICT, null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.RESTRICT)

    def __str__(self):
        return "{} {}".format(self.date.strftime(DATE_FORMAT), self.description)


class Operation(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    account = models.ForeignKey(
        Account, on_delete=models.RESTRICT, related_name='operations')
    transaction = models.ForeignKey(Transaction, on_delete=models.RESTRICT)

    def __str__(self):
        return "{} {} ({})".format(self.transaction.date.strftime(DATE_FORMAT), self.transaction.description, self.account.name)


class Plan(models.Model):
    month = models.DateTimeField()
    category = models.ForeignKey(Category, on_delete=models.RESTRICT)
    amount = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.category.name


class Setting(models.Model):
    key = models.CharField(max_length=50, primary_key=True)
    value = models.CharField(max_length=100)

    def __str__(self):
        return "{} = {}".format(self.key, self.value)


class CurrencyRate(models.Model):
    currency = CurrencyField()
    base_currency = CurrencyField()
    date = models.DateTimeField()
    rate = models.FloatField()

    def __str__(self):
        return "{} ({})".format(self.currency, self.base_currency)

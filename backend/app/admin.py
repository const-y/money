from django.contrib import admin

from .models import AccountType, Account, Category, Counterparty, Transaction, Operation, Plan, Setting, CurrencyRate

admin.site.register(AccountType)
admin.site.register(Account)
admin.site.register(Category)
admin.site.register(Counterparty)
admin.site.register(Transaction)
admin.site.register(Operation)
admin.site.register(Plan)
admin.site.register(Setting)
admin.site.register(CurrencyRate)

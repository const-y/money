from rest_framework.test import APITestCase
from rest_framework.serializers import OrderedDict

from app.models import Transaction, Category, Operation, AccountType, Account
from app.serializers import ExpensesByCurrenciesReportSerializer


class OperationsApiTestCase(APITestCase):
    def test_get_list(self):
        account_type = AccountType.objects.create(title='Cash')
        account = Account.objects.create(
            name='Cash', currency='USD', account_type=account_type)

        category = Category.objects.create(name='Expense', is_expense=True)

        transaction1 = Transaction.objects.create(
            date='2023-08-28T16:05:05.152Z', description='Transaction 1', category=category)
        Operation.objects.create(
            account=account, transaction=transaction1, amount=100)

        transaction2 = Transaction.objects.create(
            date='2023-08-31T16:05:05.152Z', description='Transaction 2', category=category)
        Operation.objects.create(
            account=account, transaction=transaction2, amount=200)

        transaction3 = Transaction.objects.create(
            date='2023-08-05T16:05:05.152Z', description='Transaction 3', category=category)
        Operation.objects.create(
            account=account, transaction=transaction3, amount=300)

        path = f"/api/accounts/{account.id}/operations/"
        response = self.client.get(path=path)
        expected = [
            OrderedDict([('id', 2), ('amount', 200.0), ('date',
                        '2023-08-31T20:05:05.152000+04:00'), ('description', 'Transaction 2')]),
            OrderedDict([('id', 1), ('amount', 100.0), ('date',
                        '2023-08-28T20:05:05.152000+04:00'), ('description', 'Transaction 1')]),
            OrderedDict([('id', 3), ('amount', 300.0), ('date',
                        '2023-08-05T20:05:05.152000+04:00'), ('description', 'Transaction 3')])
        ]

        self.assertEqual(expected, response.data)


class ReportsApiTestCase(APITestCase):
    def test_expenses_by_currencies_report(self):
        account_type = AccountType.objects.create(title='Cash')
        usdAccount = Account.objects.create(
            name='Dollars', currency='USD', account_type=account_type)
        rubAccount = Account.objects.create(
            name='Rubles', currency='RUB', account_type=account_type)

        category = Category.objects.create(name='Expense', is_expense=True)

        transaction1 = Transaction.objects.create(
            date='2023-08-28T16:05:05.152Z', description='Transaction 1', category=category)
        Operation.objects.create(
            account=rubAccount, transaction=transaction1, amount=100)

        transaction2 = Transaction.objects.create(
            date='2023-08-31T16:05:05.152Z', description='Transaction 2', category=category)
        Operation.objects.create(
            account=usdAccount, transaction=transaction2, amount=200)

        transaction3 = Transaction.objects.create(
            date='2023-05-05T16:05:05.152Z', description='Transaction 3', category=category)
        Operation.objects.create(
            account=rubAccount, transaction=transaction3, amount=300)

        path = f"/api/reports/expenses-by-currencies?year=2023"
        response = self.client.get(path=path)
        raw_data = [
            {'currency': 'RUB', 'month': 5, 'total_amount': 300},
            {'currency': 'RUB', 'month': 8, 'total_amount': 100},
            {'currency': 'USD', 'month': 8, 'total_amount': 200}
        ]
        serializer_data = ExpensesByCurrenciesReportSerializer(
            raw_data, many=True).data

        self.assertEqual(200, response.status_code)
        self.assertEqual(serializer_data, response.data)

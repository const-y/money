from app.models import Operation
from django.db.models import Sum, F, Case, When, IntegerField
from app.models import Category, Operation, Account


class ReportService():
    def get_expenses_grouped_by_currency(self, year: int):
        """Возвращает отчет о расходах по каждой из валют"""

        return Operation.objects.filter(transaction__date__year=year, transaction__category__is_expense=True).values(
            currency=F('account__currency'), month=F('transaction__date__month')).annotate(total_amount=Sum('amount'))

    def get_expenses_grouped_by_currency_details(self, currency: str, year: int, month: int):
        """Возвращает детализацию отчета о расходах по каждой из валют в виде записей категория-сумма"""

        query = """
            SELECT ac.id, ac.name, ABS(SUM(ao.amount)) AS total_amount
            FROM app_category ac 
            LEFT JOIN app_transaction at2
            ON ac.id = at2.category_id
            LEFT JOIN app_operation ao 
            ON at2.id = ao.transaction_id
            WHERE 
                ac.is_expense = TRUE 
                AND TO_CHAR(at2.date, 'YYYY-MM') = %s
                AND ao.account_id IN (SELECT id FROM app_account aa WHERE aa.currency = %s)
            GROUP BY ac.id
        """

        return Category.objects.raw(query, [f"{year:04}-{month:02}", currency])

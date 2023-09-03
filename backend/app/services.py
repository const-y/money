from app.models import Operation
from django.db.models import Sum, F


class ReportService():
    def get_expenses_grouped_by_currency(self, year: int):
        """Возвращает отчет о расходах по каждой из валют"""

        return Operation.objects.filter(transaction__date__year=year, transaction__category__is_expense=True).values(
            currency=F('account__currency'), month=F('transaction__date__month')).annotate(total_amount=Sum('amount'))

from .models import CurrencyRate, Setting


def get_currency_rate(currency):
    base_currency = Setting.objects.get(pk='base_currency').value
    latest_currency_rate = CurrencyRate.objects.filter(
        currency=currency,
        base_currency=base_currency
    ).latest('date')
    return latest_currency_rate.rate


def convert_currency(value, currency):
    rate = get_currency_rate(currency=currency)
    return float(value) * rate

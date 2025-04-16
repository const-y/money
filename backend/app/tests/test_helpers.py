import pytest
from unittest.mock import patch, MagicMock

from app.helpers import get_currency_rate, convert_currency


@pytest.mark.django_db
@patch("app.helpers.Setting")
@patch("app.helpers.CurrencyRate")
def test_get_currency_rate(mock_currency_rate, mock_setting):
    # Arrange
    mock_setting.objects.get.return_value.value = "USD"
    
    mock_latest_rate = MagicMock()
    mock_latest_rate.rate = 1.2

    mock_currency_rate.objects.filter.return_value.latest.return_value = mock_latest_rate

    # Act
    rate = get_currency_rate(currency="EUR")

    # Assert
    assert rate == 1.2
    mock_setting.objects.get.assert_called_once_with(pk="base_currency")
    mock_currency_rate.objects.filter.assert_called_once_with(
        currency="EUR",
        base_currency="USD"
    )


@pytest.mark.django_db
@patch("app.helpers.get_currency_rate")
def test_convert_currency(mock_get_currency_rate):
    # Arrange
    mock_get_currency_rate.return_value = 1.5

    # Act
    result = convert_currency(100, "GBP")

    # Assert
    assert result == 150.0
    mock_get_currency_rate.assert_called_once_with(currency="GBP")

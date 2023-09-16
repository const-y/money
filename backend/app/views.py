from rest_framework import views, status
from .models import AccountType, Account, Setting, Operation, Transaction, Category, Counterparty, CurrencyRate
from .serializers import (AccountTypeSerializer, AccountSerializer, SettingSerializer, CapitalSerializer,
                          CategorySerializer, TransactionSerializer, AccountOperationSerializer, CurrencyRateSerializer,
                          IncomeExpensesReportSerializer, ExpensesByCurrenciesReportSerializer)
from rest_framework.response import Response
from .helpers import convert_currency
from django.db.models import F
from drf_yasg.utils import swagger_auto_schema
from django.db import transaction
from rest_framework import generics
from datetime import datetime
from drf_yasg import openapi

from app.services import ReportService


class AccountTypeListAPIView(views.APIView):
    @swagger_auto_schema(responses={200: AccountSerializer(many=True)})
    def get(self, request, *args, **kwargs):
        accountTypes = AccountType.objects.all()
        serializer = AccountTypeSerializer(accountTypes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(request_body=AccountTypeSerializer, responses={201: AccountTypeSerializer()})
    def post(self, request, *args, **kwargs):
        serializer = AccountTypeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AccountTypeAPIView(views.APIView):
    def get(self, request, *args, **kwargs):
        accountTypes = AccountType.objects.get(pk=kwargs['pk'])
        serializer = AccountTypeSerializer(accountTypes)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(request_body=AccountTypeSerializer, responses={200: AccountTypeSerializer()})
    def put(self, request, *args, **kwargs):
        try:
            accountType = AccountType.objects.get(pk=kwargs['pk'])
        except AccountType.DoesNotExist:
            return Response({'error': 'AccountType not found.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = AccountTypeSerializer(accountType, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(request_body=AccountTypeSerializer, responses={204: AccountTypeSerializer()})
    def delete(self, request, *args, **kwargs):
        try:
            accountType = AccountType.objects.get(pk=kwargs['pk'])
        except AccountType.DoesNotExist:
            return Response({'error': 'AccountType not found.'}, status=status.HTTP_404_NOT_FOUND)

        accountType.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class AccountListAPIView(views.APIView):
    @swagger_auto_schema(responses={200: AccountSerializer(many=True)})
    def get(self, request, *args, **kwargs):
        accountTypes = Account.objects.all()
        serializer = AccountSerializer(accountTypes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(request_body=AccountSerializer(), responses={200: AccountSerializer()})
    def post(self, request, *args, **kwargs):
        serializer = AccountSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AccountAPIView(views.APIView):
    @swagger_auto_schema(responses={200: AccountSerializer()})
    def get(self, request, *args, **kwargs):
        account = Account.objects.get(pk=kwargs['pk'])
        serializer = AccountSerializer(account)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, *args, **kwargs):
        try:
            accountType = Account.objects.get(pk=kwargs['pk'])
        except Account.DoesNotExist:
            return Response({'error': 'Account not found.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = AccountSerializer(accountType, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        try:
            accountType = Account.objects.get(pk=kwargs['pk'])
        except Account.DoesNotExist:
            return Response({'error': 'Account not found.'}, status=status.HTTP_404_NOT_FOUND)

        accountType.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class SettingAPIView(views.APIView):
    @swagger_auto_schema(responses={200: SettingSerializer(many=True)})
    def get(self, request, *args, **kwargs):
        settings = Setting.objects.all()
        serializer = SettingSerializer(settings, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CapitalAPIView(views.APIView):
    @swagger_auto_schema(responses={200: CapitalSerializer()})
    def get(self, request, *args, **kwargs):
        operations = Operation.objects.all()
        capital = 0
        for item in operations:
            capital += convert_currency(item.amount, item.account.currency)

        serializer = CapitalSerializer({'capital': capital})
        return Response(serializer.data, status=status.HTTP_200_OK)


class OperationListAPIView(views.APIView):
    @swagger_auto_schema(responses={200: AccountOperationSerializer(many=True)})
    def get(self, request, *args, **kwargs):
        operations = Operation.objects.filter(account=kwargs['pk']).annotate(
            date=F('transaction__date'), description=F('transaction__description')).order_by('-date').distinct()

        serializer = AccountOperationSerializer(operations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(request_body=AccountOperationSerializer, responses={201: AccountOperationSerializer()})
    @transaction.atomic
    def post(self, request, *args, **kwargs):
        serializer = AccountOperationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            validated_data = serializer.validated_data
            counterparty_id = validated_data.get('counterparty')
            category_id = validated_data['category']
            category = Category.objects.get(pk=category_id)
            account = Account.objects.get(pk=kwargs['pk'])
            if (counterparty_id):
                counterparty = Counterparty.objects.get(pk=counterparty_id)
            else:
                counterparty = None
            transaction = Transaction(description=validated_data['description'], date=validated_data['date'],
                                      counterparty=counterparty, category=category)
            transaction.save()
            operation = Operation(
                amount=validated_data['amount'], account=account, transaction=transaction)
            operation.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    pagination_class = None


class CategoryRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class TransactionListCreateView(generics.ListCreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        transactions_data = request.data
        operations_data = transactions_data.pop('operations', [])

        serializer = self.get_serializer(data=transactions_data)
        serializer.is_valid(raise_exception=True)
        transaction = serializer.save()

        for operation_data in operations_data:
            account_id = operation_data.pop('account')
            account = Account.objects.get(pk=account_id)
            Operation.objects.create(
                transaction=transaction, account=account, **operation_data)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class TransactionRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer


class ExchangeRateListCreateView(generics.ListCreateAPIView):
    queryset = CurrencyRate.objects.all().order_by('-date')
    serializer_class = CurrencyRateSerializer
    pagination_class = None


class ExchangeRateRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CurrencyRate.objects.all()
    serializer_class = CurrencyRateSerializer


class IncomeExpensesReportView(views.APIView):
    @swagger_auto_schema(manual_parameters=[
        openapi.Parameter('from', openapi.IN_QUERY,
                          description="Начальная дата (%Y-%m-%dT%H:%M:%SZ)", type=openapi.TYPE_STRING),
        openapi.Parameter('to', openapi.IN_QUERY,
                          description="Конечная дата (%Y-%m-%dT%H:%M:%SZ)", type=openapi.TYPE_STRING),
    ], responses={200: IncomeExpensesReportSerializer()})
    def get(self, request, *args, **kwargs):
        from_date_str = request.query_params.get('from')
        to_date_str = request.query_params.get('to')
        try:
            start_date = datetime.strptime(
                from_date_str, "%Y-%m-%dT%H:%M:%S.%fZ")
            end_date = datetime.strptime(to_date_str, "%Y-%m-%dT%H:%M:%S.%fZ")
        except (ValueError, TypeError):
            return Response({'error': 'Некорректный формат даты'}, status=status.HTTP_400_BAD_REQUEST)

        original_income = Operation.objects.filter(transaction__date__range=(
            start_date, end_date), transaction__category__is_expense=False)

        original_expenses = Operation.objects.filter(transaction__date__range=(
            start_date, end_date), transaction__category__is_expense=True)

        income = 0
        expenses = 0

        for item in original_income:
            income += convert_currency(item.amount, item.account.currency)

        for item in original_expenses:
            expenses += convert_currency(item.amount, item.account.currency)

        serializer = IncomeExpensesReportSerializer({
            'income': income,
            'expenses': abs(expenses)
        })
        return Response(serializer.data, status=status.HTTP_200_OK)


class ExpensesByCurrenciesReportView(views.APIView):
    @swagger_auto_schema(manual_parameters=[
        openapi.Parameter('year', openapi.IN_QUERY,
                          description="Год", type=openapi.TYPE_NUMBER),
    ], responses={200: IncomeExpensesReportSerializer()})
    def get(self, request, *args, **kwargs):
        year = request.query_params.get('year')
        service = ReportService()
        data = service.get_expenses_grouped_by_currency(year=year)

        serializer = ExpensesByCurrenciesReportSerializer(
            data, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

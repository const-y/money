from django.urls import path
from django.urls import path
from .views import AccountTypeAPIView, AccountTypeListAPIView, AccountAPIView, AccountListAPIView, SettingAPIView, CapitalAPIView, OperationListAPIView, CategoryListCreateView, CategoryRetrieveUpdateDeleteView

urlpatterns = [
    path('account-types/', AccountTypeListAPIView.as_view()),
    path('account-types/<int:pk>/', AccountTypeAPIView.as_view()),
    path('accounts/', AccountListAPIView.as_view()),
    path('accounts/<int:pk>/', AccountAPIView.as_view()),
    path('accounts/<int:pk>/operations/', OperationListAPIView.as_view()),
    path('settings/', SettingAPIView.as_view()),
    path('capital/', CapitalAPIView.as_view()),
    path('categories/', CategoryListCreateView.as_view()),
    path('categories/<int:pk>/', CategoryRetrieveUpdateDeleteView.as_view()),
]

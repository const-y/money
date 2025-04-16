from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView
from django.conf import settings


def set_refresh_cookie(response, refresh_token):
    response.set_cookie(
        key=settings.SIMPLE_JWT['AUTH_COOKIE'],
        value=refresh_token,
        httponly=True,
        secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
        samesite='Lax',
        path='/api/auth/',
    )


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)

        if user is None:
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        res = Response({'access_token': access_token}, status=status.HTTP_200_OK)
        set_refresh_cookie(res, str(refresh))
        return res


class LogoutView(APIView):
    def post(self, request):
        response = Response({'detail': 'Logged out'}, status=status.HTTP_200_OK)
        response.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE'], path='/api/auth/')
        return response


class MeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'id': user.id,
            'username': user.username,
            'email': user.email,
        })


class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE'])
        if refresh_token:
            request.data['refresh'] = refresh_token
        return super().post(request, *args, **kwargs)

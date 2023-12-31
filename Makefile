# Команды для активации виртуального окружения и бэкенда
VENV_DIR = backend/env
ACTIVATE_VENV = . $(VENV_DIR)/bin/activate
DJANGO_MANAGE = backend/manage.py
DJANGO_RUN = python3 $(DJANGO_MANAGE) runserver
DJANGO_MIGRATE = python3 $(DJANGO_MANAGE) migrate

# Команды для фронтенда
FRONTEND_DIR = frontend
VITE_RUN = cd $(FRONTEND_DIR) && yarn dev

.PHONY: backend frontend

install_venv:
	cd backend && python3 -m venv env

# Запуск бэкенда
backend:
	$(ACTIVATE_VENV) && $(DJANGO_RUN)

# Выполнение миграций
migrate:
	$(ACTIVATE_VENV) && $(DJANGO_MIGRATE)

# Запуск фронтенда
frontend:
	$(VITE_RUN)

bootstrap:
	$(ACTIVATE_VENV) && cd backend && pip install -r requirements.txt && cd ../frontend && yarn install

test: 
	$(ACTIVATE_VENV) && cd backend && python3 manage.py test . && cd ../frontend && yarn test

coverage:
	$(ACTIVATE_VENV) && cd backend && python3 manage.py test .
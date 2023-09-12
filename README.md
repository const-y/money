# Домашняя бухгалтерия
[![Maintainability](https://api.codeclimate.com/v1/badges/3d649aed5880f3cef832/maintainability)](https://codeclimate.com/github/const-y/money/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/3d649aed5880f3cef832/test_coverage)](https://codeclimate.com/github/const-y/money/test_coverage)

## Установка

Клонируйте проект из репозитория

```bash
git clone git@github.com:const-y/money.git
```

Установите и активируйте виртуальное окружение

```bash
cd money/backend
python3 -m venv env
source env/bin/activate
```

Установите backend зависимости

```bash
pip install -r requirements.txt
```

Выполните миграции

```bash
python3 manage.py migrate
```

Создайте суперпользователя

```bash
python3 manage.py createsuperuser
```

Загрузите начальные данные в базу

```bash
python3 manage.py loaddata ./fixtures/data.json
```

Установите фронтенд зависимости

```bash
cd ../frontend
yarn
```

## Запуск

Перейдите в корень проекта (там где находится файл Makefile)

```bash
cd ..
```

Теперь можно запустить бэкенд часть проекта

```bash
make backend
```

А затем фронтенд часть в другом терминале

```bash
make frontend
```

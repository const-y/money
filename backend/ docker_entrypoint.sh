#!/bin/bash

# Проверяем, выполнены ли миграции
python manage.py migrate

# Загружаем данные, если они ещё не были загружены
if [ $(python manage.py showmigrations | grep -v '\[X\]' | wc -l) -gt 0 ]; then
    echo "Loading initial data..."
    python manage.py loaddata ./fixtures/data.json
else
    echo "Data already loaded, skipping loaddata"
fi

# Запуск основного процесса (например, Django server)
exec "$@"

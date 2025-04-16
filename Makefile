.PHONY: up down migrations migrate load-data setup superuser frontend-install backend-install

up:
	docker-compose up --build -d

down:
	docker-compose down --remove-orphans -v

migrations:
	docker-compose exec backend python manage.py makemigrations

migrate:
	docker-compose exec -T backend python manage.py migrate

load-data:
	docker-compose exec -T backend python manage.py loaddata ./fixtures/data.json
	
superuser:
	docker-compose exec backend python manage.py createsuperuser

frontend-install:
	docker-compose exec frontend npm install

backend-install:
	docker-compose exec backend pip install -r requirements.txt

logs:
	docker-compose logs -f

wait-for-db:
	docker-compose exec -T backend sh -c 'until nc -z db 5432; do echo "Waiting for db..."; sleep 1; done'

test:
	docker-compose exec -T backend python manage.py test

coverage:
	docker-compose exec -T backend coverage run manage.py test

coverage-xml: coverage
	docker-compose exec -T backend coverage xml

setup: up wait-for-db migrate load-data
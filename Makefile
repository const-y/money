up:
	docker-compose up --build
	migrate

down:
	docker-compose down

migrations:
	docker-compose exec backend python manage.py makemigrations

migrate:
	docker-compose exec backend python manage.py migrate
	docker-compose exec backend python manage.py loaddata ./fixtures/data.json

superuser:
	docker-compose exec backend python manage.py createsuperuser

frontend-install:
	docker-compose exec frontend npm install

backend-install:
	docker-compose exec backend pip install -r requirements.txt


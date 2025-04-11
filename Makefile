up:
	docker-compose up --build

down:
	docker-compose down

migrate:
	docker-compose exec backend python manage.py migrate

createsuperuser:
	docker-compose exec backend python manage.py createsuperuser

frontend-install:
	docker-compose exec frontend npm install

backend-install:
	docker-compose exec backend pip install -r requirements.txt


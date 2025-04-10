FROM python:3.13-alpine

WORKDIR /app

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . . 

RUN python manage.py migrate && python manage.py createsuperuser && python manage.py loaddata ./fixtures/data.json

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

EXPOSE 8000
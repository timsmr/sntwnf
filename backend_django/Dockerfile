FROM python:3.9
WORKDIR /backend_django
COPY . /backend_django
RUN pip install -r requirements.txt
EXPOSE 8000
CMD python manage.py makemigrations; python manage.py migrate; python manage.py runserver

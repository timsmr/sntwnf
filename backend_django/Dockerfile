FROM python:3.8.13-slim-buster
ENV PYTHONUNBUFFERED 1
WORKDIR /backend_django
COPY . /backend_django
RUN pip3 install -r requirements.txt; python3 manage.py migrate
COPY . .
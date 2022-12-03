FROM python:3.9
WORKDIR /backend
COPY . /backend
RUN pip install -r requirements.txt
RUN chmod +x docker-entrypoint.sh
EXPOSE 8000
ENTRYPOINT ["./docker-entrypoint.sh"]
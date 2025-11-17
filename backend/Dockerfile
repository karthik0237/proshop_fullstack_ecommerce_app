FROM python:3.11-slim

ENV PYTHONDONTRUNBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# install system(linux) dependencies for psycopg 
RUN apt-get update \
&& apt-get install -y --no-install-recommends libpq-dev gcc build-essential \
&& rm -rf /var/lib/apt/lists/*

# run pip freeze > requirements.txt first
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["python","manage.py","runserver","0.0.0.0:8000"]

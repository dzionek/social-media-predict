FROM python:3.8.3-alpine

WORKDIR /usr/src/app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY . /usr/src/app

# Install packages neccessary to build
RUN apk add --update --no-cache gfortran build-base wget freetype-dev libpng-dev openblas-dev

# Install pip and Python dependencies
RUN pip install --upgrade pip &&\
    pip install -r requirements.txt

# Install npm and JS dependencies
RUN apk add --update --no-cache nodejs npm &&\
    cd frontend &&\
    npm install --save &&\
    npm run build

# Create Django db
RUN python manage.py makemigrations &&\
    python manage.py migrate

EXPOSE 8000

# Run the server
CMD python manage.py runserver 0.0.0.0:8000

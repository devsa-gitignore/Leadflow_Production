# LeadFlow Backend

Django REST API for lead management.

## Requirements

- Python 3.14
- pip

## Setup

```bash
cp .env.example .env
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

## Environment Variables

Copy `.env.example` to `.env` and fill in your values.
See `.env.example` for all required variables.

## Project Structure

```
leadflow/
├── config/          # Django project settings and URLs
├── leads/           # Leads app
├── manage.py
├── requirements.txt
├── .env.example
└── README.md
```

## Tech Stack

- Django 6.0
- Django REST Framework
- django-cors-headers
- python-dotenv
- Pillow

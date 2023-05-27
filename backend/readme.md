# Product
-   product_name
-   product_price
-   product_image

# Cart
- products

# Order
- name
- address
- email
- cart
- products

# Routes
| Type | Route | DEscription |
| --- | ---  | ---         |
| GET  | /products | Get all products|
| GET  | /cart/:cart_id | Get cart|
| POST | /cart  | Create cart|
| PUT | /cart/:cart_id/product/:product_id  | Add product to cart|
| DELETE  | /cart/:cart_id/product/:product_id | Remove product from cart|
| POST | /order | create Order |
| GET | /order/{id} | Get 1 order by id |


## Setup
1. Install virtual environment `python -m venv .venv`
1. Activate the virtual environment
    windows `.venv/Scripts/Activate.ps1`
    mac `source .venv/bin/activate`

    > Note: on windows may need to run `Set-ExecutionPolicy Unrestricted -Scope Process`
1. Install fastapi and uvicorn `pip3 install fastapi "uvicorn[standard]"`
1. Install sqlalchemy `pip install sqlalchemy psycopg2`
1. Install dotenv `pip install python-dotenv`
1. Run app `uvicorn main:app --reload`

# Database
1. Log into psql`psql`
1. Create database `CREATE DATABASE onlinestoredb`

## Dependencies
1. Save dependencies `pip freeze > requirements.txt`
1. Install dependencies `pip install -r requirements.txt`

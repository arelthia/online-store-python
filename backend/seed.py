import os
from dotenv import load_dotenv
load_dotenv()
from sqlalchemy import Column, FLOAT, Integer, String, ARRAY, create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
#from sqlalchemy.dialects.postgresql import Array
from types_model import ProductType


DATABASE_URL = "postgresql://{}:{}@localhost:5432/{}".format(os.getenv('DB_USERNAME'),os.getenv('DB_PASSWORD'),os.getenv('DB_NAME'))

engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()
Base = declarative_base()

class Product(Base):
    __tablename__="products"

    id = Column(Integer, primary_key=True)
    product_name = Column(String)
    product_price = Column(FLOAT)
    product_image = Column(String)

class Cart(Base):
    __tablename__="carts"

    id = Column(Integer, primary_key=True)
    products = Column(ARRAY(Integer))

class Order(Base):
    __tablename__="orders"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    address = Column(String)
    email = Column(String)
    cart = Column(Integer)


Base.metadata.create_all(engine)


products = [
Product(product_name = "Fruit Cream", product_price = 2.50, product_image = "fruitcreame.jpg"),
Product(product_name = "Ginger", product_price = 2.50, product_image = "ginger.jpg"),
Product(product_name = "Peanutbutter", product_price = 2.75, product_image = "peanutbutter.jpg"),
Product(product_name = "Strawberry Chocholate", product_price = 3.25, product_image = "strawberry-chocholate.jpg"),
Product(product_name = "Strawberry", product_price = 2.25, product_image = "strawberry.jpg"),
Product(product_name = "Watermelon", product_price = 3.25, product_image = "watermelon.jpg")
]

session.add_all(products)

session.commit()

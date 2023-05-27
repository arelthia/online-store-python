import os
from dotenv import load_dotenv
load_dotenv()
from sqlalchemy import Column, Integer, String, FLOAT, ARRAY, create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
#from sqlalchemy.dialects.postgresql import Array


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


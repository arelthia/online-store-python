from typing import List
from fastapi import FastAPI, HTTPException
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from db import Product, Cart, Order, session
from types_model import ProductType, CartType, OrderType


app = FastAPI()

# origins = [
#     "http://localhost:3000/",
# ]

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def root():
    return RedirectResponse(url="/products")

# Get all products
@app.get('/products')
def get_products():
    products: List(ProductType) = session.query(Product)
    return products.all()

# Get products in cart
@app.get('/cart/{cart_id}')
def get_cart(cart_id: int):
    cart: CartType = session.query(Cart).filter(Cart.id == cart_id).first()
    products: List(ProductType) = session.query(Product).filter(Product.id.in_(cart.products)).all()
    return {'id': cart.id, 'products': products}

@app.post('/cart')
def create_cart():
    cart = Cart(products=[])
    session.add(cart)
    session.commit()
    return {"id": cart.id}

# Add product to cart
@app.put('/cart/{cart_id}/product/{product_id}')
def add_product(cart_id: int, product_id: int):
    cart: CartType = session.query(Cart).filter(Cart.id == cart_id).first()
    
    product: ProductType = session.query(Product).filter(Product.id == product_id).first()
    print(Product.id, product_id, product.id)
    if cart and product:
        cart.products = cart.products + [product_id]
        session.add(cart)
        session.commit()
        session.close()
        return {"message": "Product added to cart"}
    raise HTTPException(
        status_code=404,
        detail=f"Unable to add product to cart"
    )

# Remove product from cart
@app.delete('/cart/{cart_id}/product/{product_id}')
def remove_product(cart_id: int, product_id: int):
    cart: CartType = session.query(Cart).filter(Cart.id == cart_id).first()
    if product_id in cart.products:
        index = cart.products.index(product_id)
        cart.products = cart.products[:index] + cart.products[index + 1:]
        session.add(cart)
        session.commit()
        session.close()
        return {"message": "Product removed from cart"}
    raise HTTPException(
        status_code=404,
        detail=f"Product not in cart"
    )

# create order
@app.post('/order')
def create_order(orderDetails: OrderType):
    order = Order( name = orderDetails.name , address = orderDetails.address, email = orderDetails.email, cart = orderDetails.cart)
    if order is not None:
        session.add(order)
        session.commit()
        return {"id": order.id}
    raise HTTPException(
        status_code=404,
        detail=f"Order failed"
    )

# Get 1 order by id
@app.get('/order/{order_id}')
def get_order(order_id: int):
    order = session.query(Order).filter(Order.id == order_id).first()
    cart =  session.query(Cart).filter(Cart.id == order.cart).first()
    products = session.query(Product).filter(Product.id.in_(cart.products)).all()
    if order and products:
        return { "name": order.name, "address": order.address, "email": order.email, "products": products }
    raise HTTPException(
        status_code=404,
        detail=f"Order failed"
    )
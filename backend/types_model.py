from typing import List, Optional
from pydantic import BaseModel

class ProductType(BaseModel):
    id: Optional[int]
    product_name: str
    product_price: float
    product_image: str


class CartType(BaseModel):
    products: List[int]


class OrderType(BaseModel):
    name: str
    address: str
    email: str
    cart: int #cart_id
    products: Optional[List[ProductType]]
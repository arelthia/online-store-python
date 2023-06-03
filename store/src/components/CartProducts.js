import React, {useContext, useEffect} from 'react'
import OrderContext from  '../context/OrderContext';
import CartProduct from './CartProduct';

const CartProducts = () => {
  const {order, setOrder, getCart, removeFromCart} = useContext(OrderContext);
  return (
    <div>
      <h2>CartProducts</h2>
      {order.products.map((product) => { return <CartProduct key={product.id} id={product.id} productName={product.product_name} productPrice={product.product_price} />  })}
      </div>
  )
}

export default CartProducts
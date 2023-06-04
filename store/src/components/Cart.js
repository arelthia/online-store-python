import React, {useContext, useEffect} from 'react'
import CartProducts from './CartProducts';
import CheckOutForm from './CheckOutForm';
import { Link } from "react-router-dom";
import OrderContext from  '../context/OrderContext';
import './Cart.css';

const Cart = (props) => {
  const {order, setOrder, getCart} = useContext(OrderContext);
  const {decreaseCount} = props;
  useEffect(() => {
    getCart();  
  }, [])
 
  return (
    <div className='cart'>
        <h2><Link to="/" >Continue Shopping</Link></h2>
        {!order.cartEmpty ? 
        <>
          <h2>Check Out</h2>
          <div className='cart-wrapper'>
              <CartProducts onRemove={decreaseCount} />
              <CheckOutForm />
          </div>
        </>
        :
        <>
        No Products in Cart
        </>
        }

    </div>
    
  )

}

export default Cart;
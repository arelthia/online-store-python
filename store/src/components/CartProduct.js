import {useContext} from 'react';
import OrderContext from  '../context/OrderContext';
import { deleteIcon } from './Icons.js';
const CartProduct = (props) => {
    const {removeFromCart} = useContext(OrderContext);
    const {removeFromCount} = props;
  const deleteItem = (event) =>{
    event.preventDefault();
    removeFromCart(props.id);
    removeFromCount();
  }   
  return (
    <div className='card'>
        
        <div className='card-body'>
            <span className='product-name'>{props.productName}</span>
            <span className='product-price'>${props.productPrice.toFixed(2)}</span>
            <span className='product-delete' onClick={deleteItem}>{deleteIcon}</span>
        </div>
    </div>
  )
}

export default CartProduct
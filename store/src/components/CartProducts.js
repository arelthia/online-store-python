import React, {useContext} from 'react'
import OrderContext from  '../context/OrderContext';
import CartProduct from './CartProduct';

const CartProducts = (props) => {
  const {order} = useContext(OrderContext);
  const {onRemove} = props;
  return (
    <div className="cart-products">
      <h2>Products</h2>
      {order.products.map((product) => { return <CartProduct key={product.id} id={product.id} productName={product.product_name} productPrice={product.product_price} removeFromCount={onRemove} />  })}
      </div>
  )
}

export default CartProducts
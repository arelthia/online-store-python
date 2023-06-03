import {useContext} from 'react';
import './Product.css';
import OrderContext from  '../context/OrderContext';

const Product = (props) => {
  const {order, setOrder, addToCart} = useContext(OrderContext);
  const addItem = (event) =>{
    event.preventDefault();
    addToCart(props.product_id)
  }
  return (
    <div className="card">
        <img className="card-img-top" src={`./imgs/${props.image}`} alt={`${props.name} cupcake`} />
        <div className="card-body">
            <h5 className="card-title">{props.name}</h5>
            <p className="card-text">${props.price.toFixed(2)}</p>
            <button className="btn btn-primary" onClick={addItem}>Add To Cart </button>
        </div>
    </div>
  )
}

export default Product;
import {useContext} from 'react';
import './Product.css';
import OrderContext from  '../context/OrderContext';

const Product = (props) => {
  const {addToCart} = useContext(OrderContext);
  const {product_id, name, image, price, onAdded} = props;
  const addItem = (event) =>{
    event.preventDefault();
    addToCart(product_id)
    onAdded();
  }
  return (
    <div className="card">
        <img className="card-img-top" src={`./imgs/${image}`} alt={`${name} cupcake`} />
        <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">${price.toFixed(2)}</p>
            <button className="btn btn-primary" onClick={addItem}>Add To Cart </button>
        </div>
    </div>
  )
}

export default Product;
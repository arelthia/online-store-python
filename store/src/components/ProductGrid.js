import React, { useEffect, useState } from 'react'
import Product from './Product';
import './ProductGrid.css';

const ProductGrid = (props) => {
    const [products, setProducts] = useState();
    const {increaseCount} = props;
    useEffect(() => {
        async function getProducts(){
            const response = await fetch('http://localhost:8000/products');
            const allProducts = await response.json();
            setProducts(allProducts);
        }
        getProducts();
    }, []);
    
    return (
    <section className="product-grid">
        <h2>Available Flavors</h2>
        <div  className="card-group">
        {
            products && 
                products.map(product => <Product key={product.id} product_id={product.id} name={product.product_name} price={product.product_price} image={product.product_image} onAdded={increaseCount}  />)
        }
        </div>
        
        
    </section>
  )
}

export default ProductGrid;
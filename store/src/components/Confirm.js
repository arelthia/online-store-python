import {useContext, useEffect, useState} from 'react';
import OrderContext from  '../context/OrderContext';
import { Link } from "react-router-dom";
const Confirm = ({resetCount}) => {
    const {orderId, getOrderId} = useContext(OrderContext);
    const [summary, setSummary] = useState()
    useEffect(()=>{

        async function getDetails(){
            const details = await getOrderId(orderId);
            setSummary(details);
            resetCount();
        }
        
        getDetails();

    }, [])
    console.log(summary);
  return (
    <div className="confirm">
        <div className="order-details">

        <h2>Order Details</h2>
        <div className="split">
            
            <div className="customer">
                <h3>Customer</h3>
                <p><span>Ship To:</span> {summary.name}</p>
                <p><span>Address:</span> {summary.address}</p>
                <p><span>Email:</span> {summary.email}</p>
            </div>
           <div className="products">
            <h3>Products</h3>
            <ul> 
                {summary.products.map(product=>{
                    return <li key={product.id}>
                        <span>- {product.product_name}</span>
                        <span>${product.product_price.toFixed(2)}</span>
                    </li>
                })}
            </ul>
           </div>
            
        </div>
        <div>
        <h2><Link to="/" >Go To Home</Link></h2>
        </div>
        </div>
        
    </div>
  )
}

export default Confirm
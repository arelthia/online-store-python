import { createContext, useState } from "react";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const initialState = {
        cartId: null,
        products: [],
        customer: {},
        cartEmpty: true
    };

    const [order, setOrder] = useState(initialState);
    const [orderId, setOrderId] = useState();
    const createCart = async () => {
        const response = await fetch('http://localhost:8000/cart', { "method": "POST" });
        const cart = await response.json();
            console.log(cart)
        setOrder(prev=>{return {...prev, cartId: cart.id, cartEmpty: false }});
        return cart.id;
    }
    const addToCart = async (product_id) => {
        let cart_id = order.cartId;
        if(order.cartId == null){
           cart_id = await createCart();
        }
        
        const cart_url = `http://localhost:8000/cart/${cart_id}/product/${product_id}`;
        const addResponse = await fetch(cart_url, { "method": "PUT" });
        const response = await addResponse.json();

        getCart();
        
        
       
    }

    const getCart = async () => {
        if(order.cartId == null){
            return;
         }
         const response = await fetch(`http://localhost:8000/cart/${order.cartId}`);
        const cart = await response.json();
        const isEmpty = cart.products?.length == 0;
        setOrder(prev=> {return {...prev, 'products': cart.products, cartEmpty: isEmpty }});
    }

    const removeFromCart = async (product_id) => {
        const cart_url = `http://localhost:8000/cart/${order.cartId}/product/${product_id}`;
        const addResponse = await fetch(cart_url, { "method": "DELETE" });
        const response = await addResponse.json();
        getCart();
    }

    const createOrder = async (details) => {
        try {
            const order_url = `http://localhost:8000/order`;
        const addResponse = await fetch(order_url, {
             "method": "POST", 
             headers:{'content-type': 'application/json'},
            body: JSON.stringify(details)});
        const response = await addResponse.json();
       setOrderId(response.id)
        setOrder({
                cartId: null,
                products: [],
                customer: {},
                cartEmpty: true
            });

            return true;
        } catch (error) {
            return false;
        }
        
    }
    async function getOrderId(order_id){
        if(order_id == null){
            return;
         }
         const response = await fetch(`http://localhost:8000/order/${order_id}`);
        const order_details = await response.json();
         return order_details;
    }


    return (
        <OrderContext.Provider value={{order, setOrder, addToCart, getCart, removeFromCart, createOrder, orderId, getOrderId}}>
            {children}
        </OrderContext.Provider>
    );
}

export default OrderContext;
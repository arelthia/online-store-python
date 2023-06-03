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
    
    const addToCart = async (product_id) => {
       
        if(order.cartId == null){
            const response = await fetch('http://localhost:8000/cart', { "method": "POST" });
            const cart = await response.json();
            
            setOrder(prev=>{return {...prev, cartId: cart.id, cartEmpty: false }});
        }

        const cart_url = `http://localhost:8000/cart/${order.cartId}/product/${product_id}`;
        const addResponse = await fetch(cart_url, { "method": "PUT" });
        const response = await addResponse.json();

        getCart();
       
    }

    const getCart = async () => {
         const response = await fetch(`http://localhost:8000/cart/${order.cartId}`);
        const cart = await response.json();
        const isEmpty = cart.products.length == 0;
        setOrder(prev=> {return {...prev, 'products': cart.products, cartEmpty: isEmpty }});
    }

    const removeFromCart = async (product_id) => {
        const cart_url = `http://localhost:8000/cart/${order.cartId}/product/${product_id}`;
        const addResponse = await fetch(cart_url, { "method": "DELETE" });
        const response = await addResponse.json();
        getCart();
    }

    
    return (
        <OrderContext.Provider value={{order, setOrder, addToCart, getCart, removeFromCart}}>
            {children}
        </OrderContext.Provider>
    );
}

export default OrderContext;
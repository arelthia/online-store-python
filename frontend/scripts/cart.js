const completeOrder = async (event) => {
    event.preventDefault();
    const cart_id = localStorage.getItem('cartId');
    const checkoutForm = document.getElementById('checkout-form');
    const formData = new FormData(checkoutForm);
    const options = {
        "method": "POST",
        headers:{'content-type': 'application/json'},
        body: JSON.stringify(
            {
                name: formData.get('name'),
                address: formData.get('address'),
                email: formData.get('email'),
                cart: localStorage.getItem('cartId')
            }
        )
    };
    try {
        const response = await fetch('http://localhost:8000/order', options);
        const order = await response.json();
        localStorage.removeItem('cartId');
        window.location = `./success.html?oi=${order.id}`;
    } catch (error) {
        const alert = document.getElementById("alert-message");
        alert.innerText = "Something went wrong";
        alert.classList = "alert alert-error";
    }
    
}

const getCart = async() => {
    const cart_id = localStorage.getItem('cartId');
    if(cart_id){
        const url = `http://localhost:8000/cart/${cart_id}`;
        const response = await fetch(url);
        const cart = await response.json();
        return cart.products;
    }
    
    return;
}

const addOneProduct = (container, product) => {
    const cart_id = localStorage.getItem('cartId');
    const productName = document.createElement('div');
    const productPrice = document.createElement('div');
    const removeProduct = document.createElement('div');
    productName.classList = "d-flex flex-row align-items-center product-name";
    productName.innerText = product.product_name;
    container.append(productName);
    productPrice.classList = "d-flex flex-row align-items-center";
    productPrice.innerText = `$${product.product_price.toFixed(2)}`;
    container.append(productPrice);
    removeProduct.classList = "d-flex flex-row align-items-center";
    removeProduct.innerHTML = '<a id="remove-product"><i class="bi bi-trash3-fill"></i></a>';
    removeProduct.addEventListener('click', async (event) => {
        const url = `http://localhost:8000/cart/${cart_id}/product/${product.id}`;
        const response = await fetch(url,  { "method": "DELETE" });
        const data = await response.json();
        if(data.message){
            const alert = document.getElementById("alert-message");
            alert.innerText = data.message;
            alert.classList = "alert alert-success";
            setTimeout(()=>{
                alert.innerText = '';
                alert.classList = '';
            }, 2000);  

            const parent = document.getElementById('product-cart');
            const item = document.getElementById(product.id);
            parent.removeChild(item);
        }
        
    });
    container.append(removeProduct);


}

const displayCart = (products) => {
    const productCart = document.getElementById('product-cart');
    
   
    products.forEach(item => {
        const productWrap = document.createElement('div');
        productWrap.classList = "d-flex justify-content-between";
        productWrap.setAttribute('id', item.id);
        
        addOneProduct(productWrap, item);
        productCart.append(productWrap);
    });
    
}

const loadCart = async () => {
    const products = await getCart();
    const checkoutForm = document.getElementById('checkout-form');
    if(products){
        displayCart(products);
        checkoutForm.addEventListener('submit', (event) => completeOrder(event));
    }else{
        const alert = document.getElementById("alert-message");
        alert.innerText = "No Products In Cart";
        alert.classList = "alert alert-warning";
        // setTimeout(()=>{
        //     alert.innerText = '';
        //     alert.classList = '';
        // }, 2000);  
    }
}

window.addEventListener('load', loadCart)
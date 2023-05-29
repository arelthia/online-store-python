const getOrder = async (id) => {
    try {
        const url = `http://localhost:8000/order/${id}`
        const response = await fetch(url);
        const order = await response.json();
        return order;
    } catch (error) {
        console.log(error)
    }
    
}

const getOrderId = () => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const order_id = params.get('oi');
    return order_id;
}

const displayCustomer = (name, address, email) => {
    const customerSection = document.getElementById('customer-section');
    const nameDiv = document.createElement('div');
    nameDiv.innerText = name;
    customerSection.append(nameDiv);
    const addressDiv = document.createElement('div');
    addressDiv.innerText = address;
    customerSection.append(addressDiv);
    const emailDiv = document.createElement('div');
    emailDiv.innerText = email;
    customerSection.append(emailDiv);

}

const displayProducts = (products) => {
    const productsSection = document.getElementById('products-section');
    products.forEach(item => {
        const productDiv = document.createElement('div');
        productDiv.innerText = `${item.product_name} \t ${item.product_price}`;
        productsSection.append(productDiv);
    });
}

const displayConfirmation = async () => {
    const order_id = getOrderId();
  
    const orderDetails = await getOrder(order_id);
   
    displayCustomer(orderDetails.name, orderDetails.address, orderDetails.email);
    displayProducts(orderDetails.products);
    
}

window.addEventListener('load', displayConfirmation)
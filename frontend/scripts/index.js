
const addToCart = async (cart_id, product_id) => {
    const cart_url = `http://localhost:8000/cart/${cart_id}/product/${product_id}`;
    const addResponse = await fetch(cart_url, { "method": "PUT" });
    const response = await addResponse.json();
    if(response.message){
        const alert = document.getElementById("alert-message");
        alert.innerText = response.message;
        alert.classList = "alert alert-success";
        setTimeout(()=>{
            alert.innerText = '';
            alert.classList = '';
        }, 2000);  
    }
}

const getProducts = async () => {
    const product_url = 'http://localhost:8000/products';
    const response = await fetch(product_url);
    const products = await response.json();
    return products;
}

const setUpBuyButton = (container, product_id) => {

    const cardBtn = document.createElement('button');
    cardBtn.innerText = "Add To Cart";
    cardBtn.classList = "btn btn-warning";
    cardBtn.addEventListener( 'click', async (event) =>{
        
        let cart_id = localStorage.getItem('cartId');
        if(!cart_id){
            const cart_url = 'http://localhost:8000/cart';
            const cartResponse = await fetch(cart_url, { "method": "POST" });
            const cart = await cartResponse.json();
            cart_id = cart.id;
            localStorage.setItem('cartId', cart_id);
        }

        addToCart(cart_id, product_id);

    });
    container.append(cardBtn);
}

const setUpCardBody = (container, product) => {
    const cardName = document.createElement('h5');
    cardName.classList ="card-title";
    cardName.innerText = product.product_name;
    container.append(cardName);
    const cardPrice = document.createElement('p');
    cardPrice.classList = "card-text";
    cardPrice.innerText = `$${product.product_price.toFixed(2)}`;
    container.append(cardPrice);
}

const displayProducts = (products) =>{
    const productGroup = document.getElementById('product-group');
    products.forEach(product => {
        const cardDiv = document.createElement('div');
        cardDiv.classList = "card text-center col";
        productGroup.append(cardDiv);
        const cardImg = document.createElement('img');
        cardImg.classList = "card-img-top";
        cardImg.src = `./imgs/${product.product_image}`;
        cardImg.alt = `${product.product_name} cupcake`;
        cardDiv.append(cardImg);
        const cardBodyDiv = document.createElement('div');
        cardBodyDiv.classList = "card-body";
        setUpCardBody(cardBodyDiv, product);
        setUpBuyButton(cardBodyDiv, product.id);
        cardDiv.append(cardBodyDiv);
    });
}

const loadPage = async () => {
    const products = await getProducts();
    displayProducts(products);
}

window.addEventListener('load', loadPage)
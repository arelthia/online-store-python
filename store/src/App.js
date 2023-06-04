import './App.css';
import React, { useState } from 'react'
import ProductGrid from './components/ProductGrid';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Link } from "react-router-dom";
import Cart from './components/Cart';
import {OrderProvider} from './context/OrderContext';
import Confirm from './components/Confirm';

function App() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="App">
      <OrderProvider>
        <BrowserRouter>
        <header className="App-header">
          <h1>
            CupCake Bar
          </h1>
        
          <Link to="/cart" className='btn btn-primary me-3'>
            <span className='inCart'>{count}</span>
            Cart</Link>  
       
        </header>
        
        <Routes>
        <Route path="/" element={<ProductGrid increaseCount={() => setCount(prev => { return prev + 1})}  />} />
        <Route path="/cart" element={<Cart decreaseCount={() => setCount(prev => { return prev - 1})}  />} />
        <Route path="/confirm" element={<Confirm resetCount={() => setCount(0)} />} />
        </Routes>
        </BrowserRouter>
      </OrderProvider>
    </div>
  );
}

export default App;

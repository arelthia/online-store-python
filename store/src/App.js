import './App.css';
import React, { useEffect, useState } from 'react'
import ProductGrid from './components/ProductGrid';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { useContext } from 'react';
import { Link } from "react-router-dom";
import Cart from './components/Cart';
import {OrderProvider} from './context/OrderContext';
import OrderContext from  './context/OrderContext';

function App() {


  return (
    <div className="App">
      <OrderProvider>
        <BrowserRouter>
        <header className="App-header">
          <h1>
            CupCake Bar
          </h1>
        
          <Link to="/cart" className='btn btn-primary me-3'>
            <span className='inCart'>1</span>
            Cart</Link>  
       
        </header>
        
        <Routes>
        <Route path="/" element={<ProductGrid />} />
        <Route path="/cart" element={<Cart />} />
        </Routes>
        </BrowserRouter>
      </OrderProvider>
    </div>
  );
}

export default App;

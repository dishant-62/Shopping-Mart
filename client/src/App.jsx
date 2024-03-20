import React from 'react'
import Home from "./Pages/Home"
import ProductList from './Pages/ProductList'
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import Login from './Pages/Login'
import Register from './Pages/Register'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

export default function App() {
  const user = true;
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </Router>
  )
}

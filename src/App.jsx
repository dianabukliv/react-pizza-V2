import React, { useEffect, useState, createContext } from 'react';
import '/src/scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import FullPizza from './pages/FullPizza';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

export const SearchContext = createContext('');

function App() {
  const [searchValue, setSearchValue] = useState('');

  return (
          <Routes>
            <Route path='/' element={<MainLayout />} >
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/pizza/:id" element={<FullPizza />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>

  );
}

export default App;



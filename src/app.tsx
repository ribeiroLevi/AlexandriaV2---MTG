import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import { Landing } from './views/landing';
import {CardsList } from './views/cardsList';
import { FavoriteCards } from './views/favoriteCards';

export function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route index element={<Landing />} />
      <Route path="/cardsList" element={<CardsList/>} />
      <Route path="/favoriteCards" element={<FavoriteCards />} />
    </Routes>
  </BrowserRouter>
  );
}

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import { Landing } from './views/landing';
import { CardsList } from './views/cardsList';
import { FavoriteCards } from './views/favoriteCards';
import { FavoritesProvider } from './context/FavoritesContext';

export function App() {
  return (
   <FavoritesProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Landing />} />
          <Route path="/cardsList" element={<CardsList  />} />
          <Route path="/favoriteCards" element={<FavoriteCards/>} />
        </Routes>
    </BrowserRouter>
  </FavoritesProvider>

  );
}

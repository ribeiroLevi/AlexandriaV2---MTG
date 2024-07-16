import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing } from './views/landing';
import './index.css';
import { CardsList } from './views/cardsList';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/cardsList" element={<CardsList />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

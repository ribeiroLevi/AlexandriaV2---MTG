import axios from 'axios';
import { useFavorites } from '../context/UseFavorites';
import { useState, useEffect } from 'react';
import { Card } from './cardsList';

export function FavoriteCards() {
  const { favoriteCards } = useFavorites();
  const [selectedFavoriteCards, setSelectedFavoriteCards] = useState<Card[]>(
    []
  );

  const getFavoriteCards = () => {
    const cardRequests = favoriteCards.map((cardId) =>
      axios.get(`https://api.scryfall.com/cards/${cardId}`)
    );

    Promise.all(cardRequests)
      .then((responses) => {
        const cardsData = responses.map((response) => response.data);
        setSelectedFavoriteCards(cardsData);
      })
      .catch((error) => console.error('Error fetching cards:', error));
  };

  useEffect(() => {
    if (favoriteCards.length > 0) {
      getFavoriteCards();
    }
  }, [favoriteCards]);

  return (
    <div className="grid grid-cols-2 gap-3">
      {selectedFavoriteCards.map((card) => (
        <div key={card.id} className="">
          <img
            src={card.image_uris?.art_crop}
            className="rounded-lg"
            alt={card.name}
          />
        </div>
      ))}
    </div>
  );
}

import axios from 'axios';
import { useEffect, useState } from 'react';
import { CardView } from '../components/cardView';

export interface Card {
  id: string;
  image_uris: {
    small: string;
    normal: string;
    large: string;
    png: string;
    art_crop: string;
    border_crop: string;
  };
}

export function CardsList() {
  const [cards, setCards] = useState<Card[]>([]);

  const getCards = () => {
    axios
      .get('https://api.scryfall.com/cards/search?q=c%3Awhite+mv%3D1')
      .then((response) => setCards(response.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCards();
  }, []);

  return (
    <div>
      <h1>Cartas</h1>
      {cards.map((card, key) => (
        <CardView key={key} card={card} />
      ))}
    </div>
  );
}

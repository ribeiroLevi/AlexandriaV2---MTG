import axios from 'axios';
import { useFavorites } from '../context/UseFavorites';
import { useState, useEffect } from 'react';
import { Card } from './cardsList';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

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
    <div className="flex items-center flex-col w-full bg-[url(magicLogo.svg)]">
      <nav className="mb-0 h-24 flex items-center justify-between w-5/6">
        <Link to={'/cardsList'}>
          <ChevronLeft className="text-orange-800" />
        </Link>

        <Link to={'/'}>
          <div className="flex justify-center gap-2">
            <p className="uppercase font-Karantina text-orange-800 text-4xl">
              Alexandria
            </p>
            <img className="w-7" src="alexandriaLogo.svg" alt="" />
          </div>
        </Link>
      </nav>
      <div className="w-full flex justify-center mb-4">
        <p className="text-3xl font-Karantina text-orange-800">
          Favorite Cards
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 w-5/6">
        {selectedFavoriteCards.map((card) => (
          <div
            key={card.id}
            className="bg-no-repeat bg-cover font-Karantina rounded-2xl h-96"
            style={{ backgroundImage: `url(${card.image_uris?.art_crop})` }}
          >
            <div className="bg-orange-900/50 rounded-2xl w-full flex items-end mb-2 h-full">
              <div className=" ml-3 mb-3">
                <p className="text-orange-200 text-5xl -mb-2 font-Karantina">
                  {card.name}
                </p>
                <p className="text-orange-200 text-3xl">{card.type_line}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

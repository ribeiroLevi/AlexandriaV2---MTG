import axios from 'axios';
import { useEffect, useState } from 'react';
import { CardView } from '../components/cardView';
import { Link } from 'react-router-dom';
import { Combobox } from '../components/ui/combobox';

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
  const [selectedSetUri, setSelectedSetUri] = useState<string>('');

  const getCards = (uri: string) => {
    axios
      .get(uri)
      .then((response) => setCards(response.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (selectedSetUri) {
      getCards(selectedSetUri);
    }
  }, [selectedSetUri]);

  return (
    <div className="flex flex-col items-center justify-center">
      <nav className="h-24 flex items-center w-5/6 mb-6">
        <Link to={'/'}>
          <div className="flex justify-center gap-2">
            <p className="uppercase font-Karantina text-orange-800 text-4xl">
              Alexandria
            </p>
            <img className="w-7" src="alexandriaLogo.svg" alt="" />
          </div>
        </Link>
      </nav>
      <div className="w-5/6 gap-4 grid grid-cols-2">
        <input
          type="text"
          className="h-10 rounded-md w-full bg-orange-200 border-2 border-orange-800 placeholder-orange-800 placeholder:font-bold placeholder:indent-5 indent-5 placeholder:opacity-50"
          placeholder="Carta Aleatória..."
        />
        <Combobox setSelectedSetUri={setSelectedSetUri} />
      </div>
      <div className="w-5/6 flex flex-col">
        <ul>
          <li className="grid md:grid-cols-2 lg:grid-cols-4 ">
            {cards.map((card, key) => (
              <CardView key={key} card={card} />
            ))}
          </li>
        </ul>
      </div>
    </div>
  );
}

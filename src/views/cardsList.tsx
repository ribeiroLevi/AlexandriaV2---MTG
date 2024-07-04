import axios from 'axios';
import { useEffect, useState } from 'react';
import { CardComponent } from '../components/CardComponent';
import { Link } from 'react-router-dom';
import { Combobox } from '../components/ui/combobox';
import { Input } from '../components/ui/input';

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
  cmc: number;
  power: string;
  name: string;
  toughness: string;
  flavor_text: string;
  rarity: string;
  set_name: string;
  prints_search_uri: string;
  type_line: string;
  oracle_text: string;
}

export function CardsList() {
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedSetUri, setSelectedSetUri] = useState<string>('');
  const [showNoSetMessage, setShowNoSetMessage] = useState<boolean>(true);

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
    <div className="flex flex-col items-center justify-center bg-[url('magicLogo.svg')] bg-repeat-x bg-bottom bg-fixed">
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
        <Input />
        <Combobox
          setSelectedSetUri={setSelectedSetUri}
          setShowNoSetMessage={setShowNoSetMessage}
        />
      </div>
      <div className="w-5/6 flex flex-col">
        <ul>
          <li className="grid md:grid-cols-2 lg:grid-cols-4 ">
            {cards.map((card, key) => (
              <CardComponent key={key} card={card} />
            ))}
          </li>
        </ul>
      </div>
      <div className="flex align-middle justify-center items-center mt-20">
        <p
          className={`text-orange-800 ${showNoSetMessage ? 'block' : 'hidden'}`}
        >
          No set selected, please{' '}
          <span className="text-orange-900 font-bold">select a set</span>.
        </p>
      </div>
    </div>
  );
}

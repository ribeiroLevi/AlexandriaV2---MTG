import axios from 'axios';
import { useEffect, useState } from 'react';
import { CardComponent } from '../components/CardComponent';
import { Link } from 'react-router-dom';
import { Combobox } from '../components/ui/combobox';
import { Book, Heart } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../components/ui/sheet';
import { Toaster } from '../components/ui/sonner';
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
  setToDeckCards: () => void;
  quantity: number;
  favoriteCard: Card;
}

export interface FavoriteCardProp {
  setFavoriteCards: (card: Card[]) => void;
}
export function CardsList() {
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedSetUri, setSelectedSetUri] = useState<string>('');
  const [showNoSetMessage, setShowNoSetMessage] = useState<boolean>(true);
  const [toDeckCards, setToDeckCards] = useState<Card[]>([]);

  const handleClearButton = () => {
    setToDeckCards([]);
  };

  const handleExportCardsToList = () => {
    if (toDeckCards.length === 0) {
      alert('NÃO POSSUI CARTAS AINDA');
    } else {
      const fileData = toDeckCards
        .map((card) => `${card.quantity}x ${card.name}\n`)
        .join('');
      const blob = new Blob([fileData], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = 'list.txt';
      link.href = url;
      link.click();
      console.log(fileData);
    }
  };

  const getCards = (uri: string) => {
    saveSetUri(uri);
    axios
      .get(uri)
      .then((response) => setCards(response.data.data))
      .catch((err) => console.log(err));
  };

  const addCardToDeck = (card: Card) => {
    setToDeckCards((prevCards) => {
      const updatedCards = [...prevCards];
      const cardIndex = updatedCards.findIndex((c) => c.id === card.id);

      if (cardIndex !== -1) {
        updatedCards[cardIndex] = {
          ...updatedCards[cardIndex],
          quantity: updatedCards[cardIndex].quantity + 1,
        };
      } else {
        updatedCards.push({
          ...card,
          quantity: 1,
        });
      }

      return updatedCards;
    });
  };

  const handleCardListDelete = (card: Card): void => {
    if (card.quantity > 1) {
      console.log(card.quantity);

      const newCards = [...toDeckCards];
      const oldCard = toDeckCards.find((item) => item.id === card.id);

      if (!oldCard) return;

      const index = toDeckCards.findIndex((item) => item.id === oldCard.id);

      newCards[index] = {
        ...oldCard,
        quantity: oldCard.quantity - 1,
      };

      setToDeckCards(newCards);
    } else {
      const lastCardIndex = toDeckCards.findIndex(
        (item) => item.id === card.id
      );
      const newCards = [
        ...toDeckCards.slice(0, lastCardIndex),
        ...toDeckCards.slice(lastCardIndex + 1),
      ];
      setToDeckCards(newCards);
    }
  };

  const saveSetUri = (uri: string) => {
    try {
      localStorage.setItem('selectedSetUri', uri);
    } catch (err) {
      return undefined;
    }
  };

  const loadSetUri = () => {
    try {
      const uri = localStorage.getItem('selectedSetUri');
      return uri || '';
    } catch (err) {
      console.error('Error loading URI from local storage', err);
      return '';
    }
  };

  useEffect(() => {
    const uri = loadSetUri();
    if (uri) {
      setSelectedSetUri(uri);
      getCards(uri);
    }
  }, []);

  useEffect(() => {
    if (selectedSetUri) {
      getCards(selectedSetUri);
    }
  }, [selectedSetUri]);

  return (
    <div className="flex flex-col items-center justify-center bg-repeat-x bg-bottom bg-fixed">
      <nav className="h-24 flex items-center justify-between w-5/6 mb-6">
        <Link to={'/'}>
          <div className="flex justify-center gap-2">
            <p className="uppercase font-Karantina text-orange-800 text-4xl">
              Alexandria
            </p>
            <img className="w-7" src="alexandriaLogo.svg" alt="" />
          </div>
        </Link>
        <div className="flex flex-row gap-3 text-orange-900">
          <Link to={'/favoriteCards'}>
            <Heart className="cursor-pointer" />
          </Link>

          <Sheet>
            <SheetTrigger>
              <Book className="text-orange-900" />
            </SheetTrigger>
            <SheetContent className="bg-orange-200">
              <SheetHeader>
                <SheetTitle className="text-orange-900 text-3xl font-bold">
                  Deck
                </SheetTitle>
                <SheetDescription className="text-md text-orange-900 ">
                  Here you can save cards to your deck and export it as .txt
                </SheetDescription>
              </SheetHeader>
              {toDeckCards.length === 0 ? (
                <p className="text-orange-900">No cards added to deck</p>
              ) : (
                toDeckCards.map((card) => (
                  <div className="mt-2 flex flex-row-reverse items-center justify-center gap-2">
                    <div
                      onClick={() => handleCardListDelete(card)}
                      className="cursor-pointer font-bold text-orange-900"
                    >
                      X
                    </div>
                    <div className=" text-orange-900 gap-1 flex flex-1 font-bold">
                      <div className="font-medium"> {card.quantity}x</div>
                      <div> {card.name}</div>
                    </div>
                    <div>
                      <img
                        className="w-16 h-6 object-cover rounded-md justify-center flex flex-row items-center"
                        src={card.image_uris.art_crop}
                        alt=""
                      />
                    </div>
                  </div>
                ))
              )}
              <div className="w-full flex justify-between gap-3">
                <button
                  className="w-1/2 bg-orange-900 rounded-md h-10 mt-3 font-bold text-orange-200"
                  onClick={handleExportCardsToList}
                >
                  EXPORT
                </button>
                <button
                  onClick={handleClearButton}
                  className="w-1/2 bg-none border-2 text-orange-900 font-bold rounded-md h-10 mt-3 border-orange-900"
                >
                  CLEAR DECK
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
      <div className="w-5/6 gap-4 grid grid-cols-2">
        <Input
          cards={cards}
          setCards={setCards}
          getCards={getCards}
          uri={selectedSetUri}
        />
        <Combobox
          setSelectedSetUri={setSelectedSetUri}
          setShowNoSetMessage={setShowNoSetMessage}
        />
      </div>
      <div className="w-5/6 flex flex-col">
        <ul className="grid grid-cols-4 gap-x-6 -ml-6 w-full">
          {cards.map((card) => (
            <li className=" w-[335px]">
              <CardComponent
                key={card.id}
                card={card}
                setToDeckCards={addCardToDeck}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="flex align-middle justify-center items-center mt-20">
        <p
          className={`text-orange-800 ${showNoSetMessage ? 'block' : 'hidden'}`}
        >
          No cards arounde here, you can{' '}
          <span className="text-orange-900 font-bold">
            select a set or try another one
          </span>
          .
        </p>
      </div>
      <Toaster />
    </div>
  );
}

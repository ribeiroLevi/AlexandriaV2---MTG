import axios from "axios";
import { useEffect, useState } from "react";
import { CardComponent } from "../components/CardComponent";
import { Link } from "react-router-dom";
import { Combobox } from "../components/ui/combobox";
import { Input } from "../components/ui/input";
import { Book } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import { Toaster } from "../components/ui/sonner";

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
}

export function CardsList() {
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedSetUri, setSelectedSetUri] = useState<string>("");
  const [showNoSetMessage, setShowNoSetMessage] = useState<boolean>(true);
  const [toDeckCards, setToDeckCards] = useState<Card[]>([]);

  const getCards = (uri: string) => {
    axios
      .get(uri)
      .then((response) => setCards(response.data.data))
      .catch((err) => console.log(err));
  };

  const addCardToDeck = (card: Card) => {
    setToDeckCards((prevCards) => [...prevCards, card]); // Adds card to the deck
  };

  useEffect(() => {
    if (selectedSetUri) {
      getCards(selectedSetUri);
    }
  }, [selectedSetUri]);

  return (
    <div className="flex flex-col items-center justify-center bg-[url('magicLogo.svg')] bg-repeat-x bg-bottom bg-fixed">
      <nav className="h-24 flex items-center justify-between w-5/6 mb-6">
        <Link to={"/"}>
          <div className="flex justify-center gap-2">
            <p className="uppercase font-Karantina text-orange-800 text-4xl">
              Alexandria
            </p>
            <img className="w-7" src="alexandriaLogo.svg" alt="" />
          </div>
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
                <div className=" mt-2 flex flex-row-reverse items-center justify-center gap-1">
                  <div className=" text-orange-900 flex flex-1 font-bold">
                    {card.name}
                  </div>
                  <div
                    className=" w-20 rounded-md justify-center flex flex-row items-center"
                    style={{
                      backgroundImage: `url('${card.image_uris.small}')`,
                      backgroundPosition: "center", // Custom position
                      backgroundSize: "cover", // Optional: cover the entire element
                      backgroundRepeat: "no-repeat", // Optional: prevent tiling
                    }}
                  >
                    ''
                  </div>
                </div>
              ))
            )}
          </SheetContent>
        </Sheet>
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
              <CardComponent
                key={key}
                card={card}
                setToDeckCards={addCardToDeck}
              />
            ))}
          </li>
        </ul>
      </div>
      <div className="flex align-middle justify-center items-center mt-20">
        <p
          className={`text-orange-800 ${showNoSetMessage ? "block" : "hidden"}`}
        >
          No set selected, please{" "}
          <span className="text-orange-900 font-bold">select a set</span>.
        </p>
      </div>
      <Toaster />
    </div>
  );
}

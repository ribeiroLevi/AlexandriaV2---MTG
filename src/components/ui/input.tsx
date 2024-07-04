import axios from 'axios';
import { useEffect, useState } from 'react';

export function Input() {
  const [randomPlaceHolder, setRandomPlaceHolder] = useState<string>('');

  const getRandomPlaceHolder = async function fetchRandomName() {
    const response = await axios.get('https://api.scryfall.com/cards/random');
    setRandomPlaceHolder(response.data.name);
  };

  useEffect(() => {
    getRandomPlaceHolder();
  }, []);

  return (
    <div>
      <input
        type="text"
        className="h-10 rounded-md w-full bg-orange-200 border-2 border-orange-800 placeholder-orange-800 placeholder:font-bold placeholder:indent-5 indent-5 placeholder:opacity-50"
        placeholder={randomPlaceHolder}
      />
    </div>
  );
}

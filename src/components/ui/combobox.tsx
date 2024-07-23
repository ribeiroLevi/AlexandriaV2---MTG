import axios from 'axios';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './command';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Button } from './button';
import { useEffect, useState } from 'react';

interface Sets {
  code: string;
  name: string;
  icon_svg_uri: string;
  search_uri: string;
}

interface ComboboxProps {
  setSelectedSetUri: (uri: string) => void;
  setShowNoSetMessage: (showNoSetMessage: boolean) => void;
}

export function Combobox({
  setSelectedSetUri,
  setShowNoSetMessage,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [sets, setSets] = useState<Sets[]>([]);

  const getSets = () => {
    axios
      .get('https://api.scryfall.com/sets')
      .then((response) => setSets(response.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getSets();
  }, []);

  return (
    <div className='trucate'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="truncate w-1/2 items-center justify-between h-10 border-2 border-orange-800 bg-orange-800 text-orange-200 hover:border-orange-800 hover:bg-orange-200 hover:text-orange-800"
          >
            {value ? sets.find((set) => set.code === value)?.name : 'Set...'}
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50 " />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 ">
          <Command className="bg-orange-800 text-orange-200">
            <CommandInput
              className="placeholder:text-orange-200"
              placeholder="Search set..."
            />
            <CommandList>
              <CommandEmpty>No set found.</CommandEmpty>
              <CommandGroup>
                {sets.map((set) =>
                (
                  <div className="flex flex-row text-orange-200" key={set.code}>
                    <img
                      src={set.icon_svg_uri}
                      className="items-center text-orange-200 w-6 fill-orange-200"
                      alt=""
                    />
                    <CommandItem
                      className="text-sm text-start w-full ml-0 hover:bg-orange-200 "
                      value={set.code}
                      onSelect={() => {
                        setValue(set.code);
                        setSelectedSetUri(set.search_uri);
                        setShowNoSetMessage(false);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={`mr-2 h-4 w-4 ${value === set.code ? 'opacity-100' : 'opacity-0'
                          }`}
                      />
                      {set.name}
                    </CommandItem>
                  </div>
                )
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

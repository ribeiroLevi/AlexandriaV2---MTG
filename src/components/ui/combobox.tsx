import * as utils from '../lib/utils';
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
}

export function Combobox() {
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
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between h-10"
          >
            {value ? sets.find((set) => set.code === value)?.name : 'Set...'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search set..." />
            <CommandList>
              <CommandEmpty>No set found.</CommandEmpty>
              <CommandGroup>
                {sets.map((set) => (
                  <CommandItem
                    key={set.code}
                    value={set.code}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? '' : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={utils.cn(
                        'mr-2 h-4 w-4',
                        value === set.code ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {set.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

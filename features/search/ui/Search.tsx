import { SearchProps } from '../model';
import { useEffect, useState } from 'react';
import { Input } from '@/shared';

export const Search = <Result,>({
  onSearch,
  onClickSearchItem,
  results,
  isLoading,
}: SearchProps<Result>) => {
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    if (inputText.length > 3) {
      onSearch(inputText);
    }
  }, [inputText, onSearch]);

  return (
    <div className='flex flex-col md:flex-row gap-4 relative'>
      <Input
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder='Введите название города'
      />

      {inputText.length > 3 && (
        <div className='absolute top-[50px] bg-zinc-950 w-full z-[1]'>
          {isLoading && (
            <span className='text-gray-400 p-2'>Идет загрузка...</span>
          )}
          {results.map((result, index) => (
            <div
              key={index}
              onClick={() => {
                onClickSearchItem(result.value);
                setInputText('');
              }}
              className='text-white p-2 hover:bg-zinc-800 hover:cursor-pointer'
            >
              {result.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Search.displayName = 'CitySearch';

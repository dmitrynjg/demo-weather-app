import { Form, ListGroup } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import styles from './Search.module.scss';
import Spinner from 'react-bootstrap/Spinner';

export type SearchProps<Result> = {
  onSearch: (value: string) => void;
  onClickSearchItem: (item: Result) => void;
  isLoading: boolean;
  results: {
    label: string;
    value: Result;
  }[];
};

export const Search = <Result,>({
  onSearch,
  onClickSearchItem,
  results,
  isLoading,
}: SearchProps<Result>) => {
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    if (inputText.length >= 1) {
      onSearch(inputText);
    }
  }, [inputText, onSearch]);

  return (
    <div className={styles.searchContainer}>
      <Form.Group controlId='citySearch'>
        <Form.Control
          type='text'
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder='Введите название города'
          className={styles.searchInput}
        />

        {inputText.length >= 1 && (
          <div className={styles.resultsWrapper}>
            <ListGroup variant='flush'>
              {isLoading && (
                <ListGroup.Item className={styles.loadingItem}>
                  <Spinner className={`${styles.loadingSpinner} spinner-grow`}/><span>Загрузка...</span>
                </ListGroup.Item>
              )}
              {results.map((result, index) => (
                <ListGroup.Item
                  key={index}
                  action
                  onClick={() => {
                    onClickSearchItem(result.value);
                    setInputText('');
                  }}
                  className={styles.resultItem}
                >
                  {result.label}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        )}
      </Form.Group>
    </div>
  );
};

Search.displayName = 'CitySearch';

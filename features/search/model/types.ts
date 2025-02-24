export type SearchProps<Result> = {
    onSearch: (city: string) => void;
    onClickSearchItem: (item: Result) => void;
    isLoading: boolean;
    results: {
      label: string;
      value: Result;
    }[];
  };
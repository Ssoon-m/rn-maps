import {createContext, useContext} from 'react';

interface ContextValue {
  search: string;
  setSearch: (search: string) => void;
}

export const SearchKeywordContext = createContext<ContextValue | null>(null);

export const useSearchKeywordContext = () => {
  const value = useContext(SearchKeywordContext);
  if (value === null) {
    throw new Error(
      'useAlertDialogContext must be used within a <SearchKeywordContext.Provider />',
    );
  }
  return value;
};

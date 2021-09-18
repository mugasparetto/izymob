import React, { useCallback } from 'react';
import { FiX } from 'react-icons/fi';

import { useSort } from '../../hooks/sort';

import SearchSelect from './SearchSelect';
import { Container } from './styles';

const SearchInput: React.FC = () => {
  const { searchOptionSelected, searchValue, setSearchValue } = useSort();

  const handleSearchChange = useCallback(
    ({ target }) => {
      setSearchValue((prevSearch) =>
        prevSearch === '' ? target.value.trim(' ') : target.value
      );
    },
    [setSearchValue]
  );

  const handleClearSearch = useCallback(() => {
    setSearchValue('');
  }, [setSearchValue]);

  return (
    <Container>
      <SearchSelect />
      <input
        type="text"
        placeholder={`Procure por ${searchOptionSelected.label.toLowerCase()}`}
        value={searchValue}
        onChange={handleSearchChange}
      />
      {searchValue !== '' && (
        <button onClick={handleClearSearch}>
          <FiX size={20} />
        </button>
      )}
    </Container>
  );
};

export default SearchInput;

import React, { useState, useCallback } from 'react';
import { FiX } from 'react-icons/fi';

import { colors } from '../../constants/colors';
import { mediaQueries } from '../../constants/mediaQueries';
import { useMediaQuery } from '../../hooks/mediaQuery';
import { useSort } from '../../hooks/sort';

import SortButton from '../SortButton';
import SearchInput from '../SearchInput';

import { Container, ButtonsRow, CloseButton, ConfigBar } from './styles';

const FilterBar: React.FC = () => {
  const [toggleSort, setToggleSort] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [showButtonsRow, setShowButtonsRow] = useState(true);

  const mobileOnly = !useMediaQuery(`${mediaQueries.tablet}`);
  const { allSortData, handleChangeSortData, setSearchValue } = useSort();

  const handleSortClick = useCallback(() => {
    setToggleSort(true);
  }, []);

  const handleSearchClick = useCallback(() => {
    setToggleSearch(true);
  }, []);

  const closeConfigBar = useCallback(() => {
    setToggleSort(false);
    setToggleSearch(false);
    setSearchValue('');
  }, [setSearchValue]);

  const handleTransitionEnd = useCallback(({ target }) => {
    if (target.id === 'container' || target.id === 'buttons-row')
      setShowButtonsRow((prev) => !prev);
  }, []);

  return (
    <Container
      shouldExpand={toggleSort || toggleSearch}
      onTransitionEnd={handleTransitionEnd}
      id="container"
    >
      {mobileOnly && (
        <div className="content">
          {showButtonsRow && (
            <ButtonsRow
              shouldHide={toggleSort || toggleSearch}
              onTransitionEnd={handleTransitionEnd}
              id="buttons-row"
            >
              <button onClick={handleSearchClick}>Pesquisar</button>
              <button onClick={handleSortClick}>Ordenar</button>
            </ButtonsRow>
          )}
          {!showButtonsRow && (toggleSort || toggleSearch) && (
            <CloseButton onClick={closeConfigBar}>
              <FiX size={24} color={colors.neutral.darkest} />
            </CloseButton>
          )}
          {!showButtonsRow && toggleSort && (
            <ConfigBar>
              {allSortData.map((s) => (
                <SortButton
                  key={s.title}
                  data={s}
                  onClick={() => handleChangeSortData(s.title)}
                />
              ))}
            </ConfigBar>
          )}
          {!showButtonsRow && toggleSearch && (
            <ConfigBar>
              <SearchInput />
            </ConfigBar>
          )}
        </div>
      )}
      {!mobileOnly && (
        <div className="content">
          <SearchInput />
          <ConfigBar>
            {allSortData.map((s) => (
              <SortButton
                key={s.title}
                data={s}
                onClick={() => handleChangeSortData(s.title)}
              />
            ))}
          </ConfigBar>
        </div>
      )}
    </Container>
  );
};

export default FilterBar;

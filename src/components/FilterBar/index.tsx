import React, { useState, useCallback } from 'react';
import { FiX } from 'react-icons/fi';

import { colors } from '../../constants/colors';
import { mediaQueries } from '../../constants/mediaQueries';
import { useMediaQuery } from '../../hooks/mediaQuery';
import { useSortData } from '../../hooks/sort';

import SortButton from '../SortButton';

import { Container, ButtonsRow, CloseButton, SortBar } from './styles';

const FilterBar: React.FC = () => {
  const [toggleSort, setToggleSort] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [showButtonsRow, setShowButtonsRow] = useState(true);

  const mobileOnly = !useMediaQuery(`${mediaQueries.tablet}`);
  const { allSortData, handleChangeSortData } = useSortData();

  const handleSortClick = useCallback(() => {
    setToggleSort(true);
  }, []);

  const closeConfigBar = useCallback(() => {
    setToggleSort(false);
    setToggleSearch(false);
    // setShowButtonsRow(true);
  }, []);

  const handleContainerResize = useCallback(() => {
    setShowButtonsRow((prev) => !prev);
  }, []);

  const handleButtonsRowFade = useCallback(() => {
    setShowButtonsRow((prev) => !prev);
  }, []);

  return (
    <Container
      shouldExpand={toggleSort || toggleSearch}
      onTransitionEnd={handleContainerResize}
    >
      {mobileOnly && (
        <>
          {showButtonsRow && (
            <ButtonsRow
              shouldHide={toggleSort || toggleSearch}
              onTransitionEnd={handleButtonsRowFade}
            >
              <button>Pesquisar</button>
              <button onClick={handleSortClick}>Ordenar</button>
            </ButtonsRow>
          )}
          {!showButtonsRow && (toggleSort || toggleSearch) && (
            <CloseButton onClick={closeConfigBar}>
              <FiX size={24} color={colors.neutral.darkest} />
            </CloseButton>
          )}
          {!showButtonsRow && toggleSort && (
            <SortBar>
              {allSortData.map((s) => (
                <SortButton
                  key={s.title}
                  data={s}
                  onClick={() => handleChangeSortData(s.title)}
                />
              ))}
            </SortBar>
          )}
        </>
      )}
      {!mobileOnly && <h1>tabletandabove</h1>}
    </Container>
  );
};

export default FilterBar;

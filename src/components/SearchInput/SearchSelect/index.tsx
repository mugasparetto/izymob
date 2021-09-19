import React, { useCallback } from 'react';
import Select, { OptionProps } from 'react-select';
import { CSSObject } from 'styled-components';

import { colors } from '../../../constants/colors';
import { mediaQueries } from '../../../constants/mediaQueries';
import { useSort } from '../../../hooks/sort';

const customStyles = {
  control: (provided: CSSObject) => ({
    ...provided,
    width: '6rem',
    height: '2rem',
    borderRadius: 0,
    border: 0,
    fontSize: '0.875rem',
    fontWeight: 500,
    color: `${colors.neutral.lightest}`,
    [`@media ${mediaQueries.mobileM}`]: {
      width: '7.5rem',
    },
  }),
  indicatorSeparator: (provided: CSSObject) => ({
    ...provided,
    display: 'none',
  }),
  option: (
    provided: CSSObject,
    {
      isDisabled,
      isFocused,
      isSelected,
    }: OptionProps<
      {
        value: string;
        label: string;
      },
      false
    >
  ) => ({
    ...provided,
    backgroundColor: isSelected
      ? `${colors.primary}`
      : isFocused
      ? `${colors.neutral.lightWithOpacity}`
      : 'white',
    fontSize: '0.875rem',
    fontWeight: 500,
    ':active': {
      ...provided[':active'],
      backgroundColor:
        !isDisabled && isSelected
          ? 'transparent'
          : `${colors.primaryWithOpacity}`,
    },
  }),
};

const SearchSelect: React.FC = () => {
  const {
    setSearchOptionSelected,
    searchOptions,
    searchOptionSelected,
    setSearchValue,
  } = useSort();

  const handleChangeOption = useCallback(
    (option) => {
      setSearchOptionSelected(option!);
      setSearchValue('');
    },
    [setSearchOptionSelected, setSearchValue]
  );

  return (
    <Select
      styles={customStyles}
      options={searchOptions}
      value={searchOptionSelected}
      isSearchable={false}
      onChange={handleChangeOption}
    />
  );
};

export default SearchSelect;

import React from 'react';
import '@testing-library/jest-dom';
import {
  render,
  act,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

import { colors } from '../../constants/colors';

import LoggedArea from '../../pages/LoggedArea';

const mockedMediaQuery = jest.fn();
const mockedChangeSortData = jest.fn();

let mockedSortData = [
  { id: 'name', title: 'nome', state: 'DESC' },
  { id: 'totalComissions', title: 'comissão', state: null },
];

jest.mock('../../hooks/mediaQuery', () => {
  return {
    useMediaQuery: () => mockedMediaQuery(),
  };
});

jest.mock('../../hooks/sort', () => {
  return {
    useSort: () => ({
      allSortData: mockedSortData,
      searchOptionSelected: { value: 'name', label: 'Nome' },
      searchValue: '',
      handleChangeSortData: mockedChangeSortData,
    }),
  };
});

describe('Logged area', () => {
  it('should render Leads page', () => {
    mockedMediaQuery.mockReturnValue(false);
    const { getByText } = render(<LoggedArea />, { wrapper: BrowserRouter });

    const leadsButton = getByText('Leads');
    const brokersButton = getByText('Corretores');

    expect(leadsButton).toBeInTheDocument();
    expect(brokersButton).toBeInTheDocument();
  });

  it('should render Leads page on tablet and above', () => {
    mockedMediaQuery.mockReturnValue(true);
    const { getByText } = render(<LoggedArea />, { wrapper: BrowserRouter });

    const leadsButton = getByText('Leads');
    const brokersButton = getByText('Corretores');

    expect(leadsButton).toBeInTheDocument();
    expect(brokersButton).toBeInTheDocument();
  });

  it('should render brokers page', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/corretores']}>
        <LoggedArea />
      </MemoryRouter>
    );

    const comissionsButtons = getByText('Pesquisar');

    expect(comissionsButtons).toBeInTheDocument();
  });

  it('should open and close the comissions modal', async () => {
    mockedSortData = [
      { id: 'name', title: 'nome', state: null },
      { id: 'totalComissions', title: 'comissão', state: 'DESC' },
    ];

    const { findByRole, getAllByText, findByTestId } = render(
      <MemoryRouter initialEntries={['/corretores']}>
        <LoggedArea />
      </MemoryRouter>
    );

    const showComissionsButtons = getAllByText('Ver todas comissões');

    act(() => {
      fireEvent.click(showComissionsButtons[0]);
    });

    const modal = await findByRole('dialog');

    expect(modal).toBeInTheDocument();

    const closeButton = await findByTestId('close-modal');

    act(() => {
      fireEvent.click(closeButton);
    });

    expect(modal).not.toBeInTheDocument();
  });

  it('should change sort type', () => {
    mockedMediaQuery.mockReturnValue(true);
    mockedSortData = [
      { id: 'name', title: 'nome', state: 'ASC' },
      { id: 'totalComissions', title: 'comissão', state: null },
    ];

    const { getByText } = render(
      <MemoryRouter initialEntries={['/corretores']}>
        <LoggedArea />
      </MemoryRouter>
    );

    const nameSortButton = getByText('NOME');
    const comissionSortButton = getByText('COMISSÃO');

    act(() => {
      fireEvent.click(nameSortButton);
    });

    act(() => {
      fireEvent.click(comissionSortButton);
    });

    expect(mockedChangeSortData).toHaveBeenCalledTimes(2);
  });
});

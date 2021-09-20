import React, { useState, useMemo, useCallback } from 'react';
import { FiMail, FiPhone, FiArrowRight } from 'react-icons/fi';

import { colors } from '../../constants/colors';
import { getFormattedBrokers } from '../../services';
import { useSort } from '../../hooks/sort';

import Link from '../../components/Link';
import FilterBar from '../../components/FilterBar';
import ComissionsModal from '../../components/ComissionsModal';

import {
  Container,
  BrokerGrid,
  BrokerCard,
  BrokerInfo,
  BrokerHighlights,
} from './styles';

interface ShowComissionsData {
  name: string;
  comissions: ComissionData[];
}

interface ComissionData {
  value: string;
  formattedValue: string;
  property_code: string;
  formattedDate: string;
}

const formattedBrokers = getFormattedBrokers();

const Brokers: React.FC = () => {
  const [
    comissionsToShow,
    setComissionsToShow,
  ] = useState<ShowComissionsData | null>(null);

  const { allSortData, searchOptionSelected, searchValue } = useSort();

  const handleCloseModal = useCallback(() => {
    setComissionsToShow(null);
  }, []);

  const filteredBrokers = useMemo(() => {
    const newFilteredBrokers = [...formattedBrokers];

    newFilteredBrokers.sort((a, b) => {
      const activeSortData = allSortData.find((s) => s.state !== null)!;
      const { id, state } = activeSortData;
      if (id === 'name') {
        return state === 'ASC'
          ? b[id].localeCompare(a[id])
          : a[id].localeCompare(b[id]);
      }
      return state === 'ASC' ? b[id] - a[id] : a[id] - b[id];
    });

    const { value } = searchOptionSelected;
    const searchType = value as 'name' | 'formattedPhone';

    return newFilteredBrokers.filter((broker) =>
      broker[searchType].toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [allSortData, searchValue, searchOptionSelected]);

  return (
    <>
      <FilterBar />
      <Container>
        <BrokerGrid role="grid">
          {filteredBrokers.map(
            ({
              key,
              name,
              email,
              fullPhoneNumber,
              formattedPhone,
              formattedTotalComissions,
              leadCount,
              comissions,
            }) => (
              <BrokerCard key={key}>
                <BrokerInfo>
                  <h2>{name}</h2>
                  <Link
                    color={colors.neutral.dark}
                    style={{ textDecoration: 'underline' }}
                    href={`mailto:${email}`}
                    iconData={{ position: 'left', Icon: FiMail }}
                  >
                    {email}
                  </Link>
                  <Link
                    color={colors.neutral.dark}
                    style={{ textDecoration: 'underline' }}
                    href={`https://wa.me/${fullPhoneNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    iconData={{ position: 'left', Icon: FiPhone }}
                  >
                    {formattedPhone}
                  </Link>
                </BrokerInfo>

                <BrokerHighlights>
                  <div>
                    <span>Total de comissões</span>
                    <span>{formattedTotalComissions}</span>
                  </div>

                  <div>
                    <span>Total de leads</span>
                    <span>{leadCount}</span>
                  </div>
                </BrokerHighlights>

                <Link
                  iconData={{ position: 'right', Icon: FiArrowRight }}
                  onClick={() => {
                    setComissionsToShow({ name, comissions });
                  }}
                >
                  Ver todas comissões
                </Link>
              </BrokerCard>
            )
          )}
        </BrokerGrid>
      </Container>
      <ComissionsModal closeModal={handleCloseModal} data={comissionsToShow!} />
    </>
  );
};

export default Brokers;

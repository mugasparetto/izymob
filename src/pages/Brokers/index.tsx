import React, { useState, useMemo, useEffect } from 'react';
import { FiMail, FiPhone, FiArrowRight } from 'react-icons/fi';

import { colors } from '../../constants/colors';
import { getFormattedBrokers } from '../../services';
import { useSortData } from '../../hooks/sort';

import Link from '../../components/Link';
import FilterBar from '../../components/FilterBar';

import {
  Container,
  BrokerGrid,
  BrokerCard,
  BrokerInfo,
  BrokerHighlights,
} from './styles';

const Brokers: React.FC = () => {
  const formattedBrokers = useMemo(() => getFormattedBrokers(), []);
  const [filteredBrokers, setFilteredBrokers] = useState(formattedBrokers);
  const { activeSortData } = useSortData();

  useEffect(() => {
    const newFilteredBrokers = [...filteredBrokers];
    newFilteredBrokers.sort((a, b) => {
      const { id, state } = activeSortData;
      if (id === 'name') {
        return state === 'ASC'
          ? b[id].localeCompare(a[id])
          : a[id].localeCompare(b[id]);
      }

      return state === 'ASC' ? b[id] - a[id] : a[id] - b[id];
    });

    setFilteredBrokers(newFilteredBrokers);
  }, [activeSortData, activeSortData.state]);

  return (
    <>
      <FilterBar />
      <Container>
        <BrokerGrid>
          {filteredBrokers.map(
            ({
              key,
              name,
              email,
              fullPhoneNumber,
              formattedPhone,
              formattedTotalComissions,
              leadCount,
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
                    console.log('clique');
                  }}
                >
                  Ver todas comissões
                </Link>
              </BrokerCard>
            )
          )}
        </BrokerGrid>
      </Container>
    </>
  );
};

export default Brokers;

import React, { useMemo } from 'react';
import { FiMail, FiPhone, FiArrowRight } from 'react-icons/fi';

import { colors } from '../../constants/colors';
import { getFormattedBrokers } from '../../services';

import Link from '../../components/Link';

import { BrokerGrid, BrokerCard, BrokerInfo, BrokerHighlights } from './styles';

const Brokers: React.FC = () => {
  const formattedBrokers = useMemo(() => getFormattedBrokers(), []);

  return (
    <>
      <BrokerGrid>
        {formattedBrokers.map(
          ({
            key,
            name,
            email,
            fullPhoneNumber,
            formattedPhone,
            totalComissions,
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
                  <span>{totalComissions}</span>
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
    </>
  );
};

export default Brokers;

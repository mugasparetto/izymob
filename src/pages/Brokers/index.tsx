import React, { useMemo } from 'react';
import { FiMail, FiPhone, FiArrowRight } from 'react-icons/fi';

import brokers from '../../data/brokers.json';
import { colors } from '../../constants/colors';
import Link from '../../components/Link';

import {
  getLeadsCount,
  formatPhoneNumber,
  formatPrice,
  formatCreatedAt,
} from '../../utils';

import { BrokerGrid, BrokerCard, BrokerInfo, BrokerHighlights } from './styles';

interface BrokerData {
  key: number;
  name: string;
  email: string;
  fullPhoneNumber: string;
  formattedPhone: string;
  totalComissions: string;
  leadCount: number;
  comissions: ComissionData[];
}

interface ComissionData {
  value: string;
  formattedValue: string;
  property_code: string;
  formattedDate: string;
}

const Brokers: React.FC = () => {
  const formattedBrokers: BrokerData[] = useMemo(() => {
    const leadsCount = getLeadsCount();

    return brokers.map((broker) => {
      const formattedComissions = broker.commissions.map(
        ({ value, property_code, date }) => {
          return {
            value,
            property_code,
            formattedValue: formatPrice(parseInt(value)),
            formattedDate: formatCreatedAt(date),
          } as ComissionData;
        }
      );

      return {
        key: broker.key,
        name: broker.name,
        email: broker.email,
        fullPhoneNumber: broker.int_code + broker.phone,
        leadCount: leadsCount[broker.key],
        totalComissions: formatPrice(
          formattedComissions.reduce(
            (acc, curr) => acc + parseInt(curr.value),
            0
          )
        ),
        formattedPhone: formatPhoneNumber({
          code: broker.int_code,
          phoneNumber: broker.phone,
        }),
        comissions: formattedComissions,
      } as BrokerData;
    });
  }, []);

  return (
    <>
      <BrokerGrid>
        {formattedBrokers.map(
          ({
            name,
            email,
            fullPhoneNumber,
            formattedPhone,
            totalComissions,
            leadCount,
          }) => (
            <BrokerCard>
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

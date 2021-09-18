import React, { useMemo } from 'react';
import { FiMail, FiPhone } from 'react-icons/fi';

import leads from '../../data/leads.json';
import { colors } from '../../constants/colors';
import Link from '../../components/Link';
import { typesImages } from '../../constants/typesImages';

import {
  getBrokerData,
  formatPhoneNumber,
  formatCreatedAt,
  formatPrice,
} from '../../utils';

import {
  LeadCount,
  LeadGrid,
  LeadCard,
  TagsContainer,
  LeadTag,
  LeadInfo,
  InterestsContainer,
  LeadInterest,
  InterestType,
} from './styles';

interface LeadData {
  key: number;
  name: string;
  email: string;
  broker: LeadBroker;
  fullPhoneNumber: string;
  formattedPhone: string;
  formattedCreatedAt: string;
  interests: InterestData[];
}

interface LeadBroker {
  key: number;
  name: string;
  color: string;
}

interface InterestData {
  code: string;
  title: string;
  type: 'APARTAMENTO' | 'CASA' | 'CASA_DE_VILA' | 'PALAFITA' | 'CAVERNA';
  formattedPrice: string;
  formattedType: string;
}

const Leads: React.FC = () => {
  const formattedLeads: LeadData[] = useMemo(() => {
    return leads.map((lead) => {
      const formattedInterests = lead.interests.map(
        ({ code, sale_price, title, type }) => {
          return {
            code,
            title,
            type,
            formattedPrice: formatPrice(parseInt(sale_price)),
            formattedType: type.replace(/_/g, ' '),
          } as InterestData;
        }
      );

      return {
        key: lead.key,
        name: lead.name,
        email: lead.email,
        broker: getBrokerData(lead.broker_key),
        fullPhoneNumber: lead.int_code + lead.phone,
        formattedPhone: formatPhoneNumber({
          code: lead.int_code,
          phoneNumber: lead.phone,
        }),
        formattedCreatedAt: formatCreatedAt(lead.created_at),
        interests: formattedInterests,
      } as LeadData;
    });
  }, []);

  return (
    <>
      <LeadCount>{leads.length} leads cadastrados</LeadCount>
      <LeadGrid>
        {formattedLeads.map(
          ({
            name,
            key,
            broker,
            email,
            fullPhoneNumber,
            formattedPhone,
            formattedCreatedAt,
            interests,
          }) => (
            <LeadCard key={key}>
              <TagsContainer>
                <LeadTag tagStyle="primary" backgroundColor={broker.color}>
                  {broker.name}
                </LeadTag>
                <LeadTag tagStyle="ghost">
                  Criado em {formattedCreatedAt}
                </LeadTag>
              </TagsContainer>

              <LeadInfo>
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
              </LeadInfo>

              <InterestsContainer>
                <h3>Interesses</h3>
                {interests.map(
                  ({ title, code, type, formattedPrice, formattedType }) => (
                    <LeadInterest>
                      <InterestType>
                        <div>
                          <img src={typesImages[`${type}`]} alt="Lead" />
                        </div>
                        <span>{code}</span>
                      </InterestType>

                      <div>
                        <span>
                          {formattedType} • {code}
                        </span>
                        <h4>{title}</h4>
                        <strong>{formattedPrice}</strong>
                      </div>
                    </LeadInterest>
                  )
                )}
              </InterestsContainer>
            </LeadCard>
          )
        )}
      </LeadGrid>
    </>
  );
};

export default Leads;

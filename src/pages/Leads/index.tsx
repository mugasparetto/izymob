import React, { useMemo } from 'react';
import { FiMail, FiPhone } from 'react-icons/fi';

import { colors } from '../../constants/colors';
import { getFormattedLeads } from '../../services';
import { typesImages } from '../../constants/typesImages';

import Link from '../../components/Link';

import {
  Container,
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

const Leads: React.FC = () => {
  const formattedLeads = useMemo(() => getFormattedLeads(), []);

  return (
    <Container>
      <LeadCount>{formattedLeads.length} leads cadastrados</LeadCount>
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
    </Container>
  );
};

export default Leads;

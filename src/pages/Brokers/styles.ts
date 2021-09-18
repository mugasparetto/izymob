import styled from 'styled-components';

import { mediaQueries } from '../../constants/mediaQueries';
import { colors } from '../../constants/colors';

export const BrokerGrid = styled.section`
  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding-bottom: 3rem;

  @media ${mediaQueries.tablet} {
    grid-template-columns: 1fr 1fr;
  }
`;

export const BrokerCard = styled.article`
  background: ${colors.neutral.white};
  width: 100%;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0px 0px 8px 0px ${colors.neutral.darkest}1f;
`;

export const BrokerInfo = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    margin-bottom: 1rem;
  }

  a {
    align-self: flex-start;
  }

  a + a {
    margin-top: 0.5rem;
  }
`;

export const BrokerHighlights = styled.div`
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;

  div {
    display: flex;
    flex-direction: column;

    span:first-child {
      color: ${colors.neutral.darkest};
      font-weight: 500;
      font-size: 0.75rem;
      margin-bottom: 0.25rem;
    }

    span {
      color: ${colors.secondary};
      font-weight: 700;
    }
  }

  div + div {
    margin-top: 1rem;
  }

  @media ${mediaQueries.mobileM} {
    flex-direction: row;

    div + div {
      margin-top: 0;
      margin-left: 1.25rem;
    }
  }
`;

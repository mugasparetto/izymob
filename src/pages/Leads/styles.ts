import styled from 'styled-components';

import { mediaQueries } from '../../constants/mediaQueries';
import { colors } from '../../constants/colors';

interface LeadTagProps {
  tagStyle: 'primary' | 'ghost';
  backgroundColor?: string;
}

export const LeadCount = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${colors.neutral.dark};
  margin-top: 3rem;
`;

export const LeadGrid = styled.section`
  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding-bottom: 3rem;

  @media ${mediaQueries.tablet} {
    grid-template-columns: 1fr 1fr;
  }
`;

export const LeadCard = styled.article`
  background: ${colors.neutral.white};
  width: 100%;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0px 0px 8px 0px ${colors.neutral.darkest}1f;
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -0.5rem;
  margin-left: -0.5rem;

  @media ${mediaQueries.mobileL} {
    flex-direction: row;
  }
`;

export const LeadTag = styled.span<LeadTagProps>`
  margin-top: 0.5rem;
  margin-left: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 1rem;

  align-self: flex-start;
  line-height: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: -0.02rem;

  border: ${(props) =>
    props.tagStyle === 'ghost' ? `1px solid ${colors.neutral.light}` : 'none'};
  color: ${(props) =>
    props.tagStyle === 'ghost' ? colors.neutral.dark : colors.neutral.white};
  background-color: ${(props) =>
    props.tagStyle === 'ghost' ? colors.neutral.white : props.backgroundColor};
`;

export const LeadInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1.5rem 0;

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

export const InterestsContainer = styled.div`
  h3 {
    margin-bottom: 0.65rem;
  }
`;

export const LeadInterest = styled.div`
  position: relative;

  span {
    color: ${colors.neutral.dark};
    font-size: 0.7rem;
    font-weight: 600;
  }

  h4 {
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }

  strong {
    color: ${colors.secondary};
    font-size: 0.875rem;
    font-weight: 500;
    font-size: 1rem;
    font-weight: 700;
  }

  & + div {
    margin-top: 1rem;
  }

  @media ${mediaQueries.tablet} {
    height: 5rem;
    display: flex;

    img {
      display: block;
      width: 2.75rem;
      height: 2.75rem;
    }

    strong {
      position: absolute;
      bottom: 0;
    }
  }
`;

export const InterestType = styled.div`
  display: none;

  @media ${mediaQueries.tablet} {
    position: relative;
    display: block;
    margin-right: 0.75rem;

    div {
      background: ${colors.neutral.white};
      position: relative;
      z-index: 10;

      width: 4rem;
      height: 4rem;
      flex-shrink: 0;

      display: flex;
      align-items: center;
      justify-content: center;

      border: 1px solid ${colors.neutral.light};
      border-radius: 0.25rem;
    }

    span {
      background: ${colors.neutral.lightWithOpacity};
      width: 100%;

      position: absolute;
      top: 0;
      bottom: 0;

      display: flex;
      align-items: flex-end;
      justify-content: center;

      border-radius: 0.25rem;
      padding-bottom: 0.1rem;
    }
  }
`;

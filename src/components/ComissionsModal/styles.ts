import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { mediaQueries } from '../../constants/mediaQueries';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  button {
    padding: 0.5rem;
    line-height: 0;
    border: none;
    background: ${colors.neutral.white};
  }
`;

export const ComissionsGrid = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  span {
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.5rem;
  }

  span + span {
    color: ${colors.neutral.dark};
    margin-left: 0.75rem;
  }

  strong {
    color: ${colors.secondary};
    font-weight: 700;
    font-size: 1.25rem;
  }

  @media ${mediaQueries.mobileL} {
    grid-template-columns: 1fr 1fr;
  }
`;

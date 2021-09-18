import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { mediaQueries } from '../../constants/mediaQueries';

interface ContainerProps {
  shouldExpand: boolean;
}

interface ButtonsRowProps {
  shouldHide: boolean;
}

export const Container = styled.div<ContainerProps>`
  height: ${(props) => (props.shouldExpand ? '6rem' : '4.5rem')};
  background: ${colors.neutral.white};
  border-bottom: 1px solid ${colors.neutral.light};

  position: relative;
  display: flex;
  transition: all 0.2s ease;
`;

export const ButtonsRow = styled.div<ButtonsRowProps>`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  opacity: ${(props) => (props.shouldHide ? 0 : 1)};
  transition: all 0.2s ease;

  button {
    border: 1px solid ${colors.neutral.dark};
    border-radius: 0.25rem;
    background: ${colors.neutral.white};

    height: 2.5rem;
    min-width: 7rem;

    color: ${colors.neutral.dark};
    font-size: 0.875rem;
    font-weight: 500;
  }

  button + button {
    margin-left: 2rem;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  padding: 0.5rem;
  line-height: 0;
  border: none;
  right: 0.5rem;
  background: ${colors.neutral.white};
`;

export const SortBar = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;

  padding: 2.5rem 1rem 0;

  button + button {
    margin-left: 0.5rem;

    @media ${mediaQueries.mobileM} {
      margin-left: 1rem;
    }
  }
`;

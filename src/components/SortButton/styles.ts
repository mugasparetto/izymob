import styled, { css } from 'styled-components';
import { colors } from '../../constants/colors';

interface ContainerProps {
  state: 'ASC' | 'DESC' | null;
}

export const Container = styled.button<ContainerProps>`
  height: 2.5rem;
  padding: 0 0.75rem;
  border-radius: 1.25rem;
  border: none;

  font-size: 0.875rem;
  font-weight: 700;

  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.state
      ? css`
          background: ${colors.primary};
          color: ${colors.neutral.white};
        `
      : css`
          background: ${colors.neutral.white};
          border: 1px solid ${colors.neutral.darkest};
          color: ${colors.neutral.darkest};
        `}

  svg {
    margin-right: 0.25rem;
  }
`;

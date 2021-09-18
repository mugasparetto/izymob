import styled, { css } from 'styled-components';
import { colors } from '../../constants/colors';

interface ContainerProps {
  iconPosition?: 'left' | 'right';
}

export const Container = styled.a<ContainerProps>`
  color: ${(props) => (props.color ? props.color : colors.primary)};
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.5rem;
  text-decoration: none;

  display: inline-flex;
  align-items: center;

  cursor: pointer;

  svg {
    ${(props) =>
      props.iconPosition
        ? props.iconPosition === 'left'
          ? css`
              margin-right: 0.5rem;
            `
          : css`
              margin-left: 0.5rem;
            `
        : css`
            margin: 0;
          `}
  }
`;

import styled from 'styled-components';
import { colors } from '../../constants/colors';

export const Container = styled.div`
  display: flex;
  position: relative;
  padding: 0.25rem;
  background: ${colors.neutral.white};
  border-radius: 0.25rem;
  border: 1px solid ${colors.neutral.light};

  input {
    width: 100%;
    border: 0;
    font-size: 0.875rem;
    padding-left: 1rem;
    padding-right: 2.75rem;
    border-left: 1px solid ${colors.neutral.light};
    color: ${colors.neutral.darkest};
    font-weight: 500;
    border-radius: 0;
  }

  button {
    position: absolute;
    right: 0;
    font-size: 0;
    padding: 0.4rem;
    border: 0;
    top: 0.45rem;
    color: ${colors.neutral.dark};
    background: ${colors.neutral.white};
  }
`;

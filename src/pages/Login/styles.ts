import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { mediaQueries } from '../../constants/mediaQueries';

interface InputProps {
  hasError: boolean;
}

export const Container = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const Content = styled.div`
  background: ${colors.neutral.white};
  width: 100%;
  max-width: 27.5rem;
  height: 100%;
  padding: 3rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    height: 3rem;
    margin-bottom: 2.5rem;
  }

  form {
    margin: 3rem 0 2rem;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  button {
    height: 2.5rem;
    border: 0;
    border-radius: 0.25rem;
    background: ${colors.primary};
    color: ${colors.neutral.white};
    font-size: 0.875rem;
    font-weight: 600;
  }

  a {
    color: ${colors.neutral.dark};
    text-decoration: underline;
  }

  @media ${mediaQueries.tablet} {
    max-height: 37rem;
    border-radius: 1rem;
    box-shadow: 0px 4px 16px 4px ${colors.neutral.darkest}1f;
  }
`;

export const InputGroup = styled.fieldset<InputProps>`
  border: 0;
  display: flex;
  flex-direction: column;

  input {
    height: 3rem;
    border: 1px solid
      ${(props) => (props.hasError ? colors.error : colors.neutral.light)};
    color: ${(props) =>
      props.hasError ? colors.error : colors.neutral.darkest};
    border-radius: 0.25rem;
    padding: 0 1rem;
  }

  input::placeholder {
    color: ${(props) => (props.hasError ? colors.error : colors.neutral.dark)};
  }

  span {
    margin-left: 1rem;
    margin-top: 0.5rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: ${colors.error};
  }

  & + fieldset {
    margin: 1.5rem 0 2.25rem;
  }
`;

import React, { ButtonHTMLAttributes } from 'react';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

import { Container } from './styles';

interface SortButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  data: ButtonData;
}

interface ButtonData {
  title: string;
  state: 'ASC' | 'DESC' | null;
}

const SortButton: React.FC<SortButtonProps> = ({ data, ...rest }) => {
  const { title, state } = data;

  return (
    <Container {...rest} state={state}>
      {state === 'DESC' && <FiArrowDown size={20} />}
      {state === 'ASC' && <FiArrowUp size={20} />}
      {title.toUpperCase()}
    </Container>
  );
};

export default SortButton;

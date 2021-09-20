import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, act, waitFor } from '@testing-library/react';

import Login from '../../pages/Login';

const mockedSignIn = jest.fn();

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      signIn: mockedSignIn,
    }),
  };
});

describe('Leads page', () => {
  it('should be able to sign in', async () => {
    const { getByPlaceholderText, getByText } = render(<Login />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const button = getByText('ENTRAR');

    act(() => {
      fireEvent.change(emailField, { target: { value: 'murilo@example.com' } });
      fireEvent.change(passwordField, { target: { value: '123456' } });
    });

    act(() => {
      fireEvent.click(button);
    });

    await waitFor(() =>
      expect(mockedSignIn).toHaveBeenCalledWith({
        email: 'murilo@example.com',
        password: '123456',
      })
    );
  });
});

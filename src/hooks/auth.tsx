import React, { createContext, useCallback, useState, useContext } from 'react';

interface User {
  email: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): void;
  signOut(): void;
}

interface AuthState {
  user: User;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({
    user: { email: 'teste' },
  } as AuthState);

  const signIn = useCallback(({ email, password }) => {}, []);

  const signOut = useCallback(() => {}, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  return context;
};

import React from 'react';

import { AuthProvider } from './auth';
import { SortProvider } from './sort';

const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <SortProvider>{children}</SortProvider>
    </AuthProvider>
  );
};

export default AppProvider;

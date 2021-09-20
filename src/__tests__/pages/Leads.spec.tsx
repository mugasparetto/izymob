import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import Leads from '../../pages/Leads';

describe('Leads page', () => {
  it('should render correctly', () => {
    const { getByRole } = render(<Leads />);

    const leadGrid = getByRole('grid');

    expect(leadGrid).toBeInTheDocument();
  });
});

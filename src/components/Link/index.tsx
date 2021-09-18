import React, { AnchorHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

interface IconData {
  position: 'left' | 'right';
  Icon: React.ComponentType<IconBaseProps>;
}

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  iconData?: IconData;
}

const Link: React.FC<LinkProps> = ({ iconData, children, ...rest }) => {
  const { position, Icon } = iconData || {};

  return (
    <Container {...rest} iconPosition={position}>
      {position === 'left' && Icon && <Icon size={16} />}
      {children}
      {position === 'right' && Icon && <Icon size={16} />}
    </Container>
  );
};

export default Link;

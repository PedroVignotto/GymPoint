import React from 'react';

import { Container } from './styles';

export default function Button({ children, Icon, background, ...rest }) {
  return (
    <Container {...rest} background={background}>
      {Icon && <Icon size={24} color="#fff" />}
      {children}
    </Container>
  );
}

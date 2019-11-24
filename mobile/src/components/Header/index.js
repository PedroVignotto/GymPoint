import React from 'react';

import { Container, Logo } from './styles';

import logoHeader from '~/assets/logoHeader.png';

export default function Header() {
  return (
    <Container>
      <Logo source={logoHeader} resizeMode="contain" />
    </Container>
  );
}

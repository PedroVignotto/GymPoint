import React from 'react';

import Header from '~/components/Header';

import { Wrapper, Container } from './styles';

export default function DefaultLayout({ children, GoBack, page }) {
  return (
    <Wrapper>
      <Header GoBack={GoBack} page={page} />
      <Container>{children}</Container>
    </Wrapper>
  );
}

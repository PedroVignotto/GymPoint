import React from 'react';

import error from '~/assets/404.svg';
import { Container } from './styles';

export default function _Error404() {
  return (
    <Container>
      <img src={error} alt="404" />
    </Container>
  );
}

import React from 'react';

import error from '~/assets/404.svg';
import { Wrapper } from './styles';

export default function _Error404() {
  return (
    <Wrapper>
      <img src={error} alt="404" />
    </Wrapper>
  );
}

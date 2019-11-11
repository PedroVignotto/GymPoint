import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export function Button({ children, Icon, background, ...rest }) {
  return (
    <Container {...rest} background={background}>
      <Icon size={24} color="#fff" />
      {children}
    </Container>
  );
}

Button.propTypes = {
  Icon: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

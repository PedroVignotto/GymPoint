import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Button({ children, Icon, background, ...rest }) {
  return (
    <Container {...rest} background={background}>
      {Icon && <Icon size={24} color="#fff" />}
      {children}
    </Container>
  );
}

Button.propTypes = {
  Icon: PropTypes.string,
  background: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

Button.defaultProps = {
  Icon: '',
};

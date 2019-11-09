import React from 'react';
import PropTypes from 'prop-types';

import { Container, Wrapper } from './styles';

// two buttons were created because darken does not accept props as parameter in color,
// so two were created, MainButton with reddish color and BackButton with grayish
export function MainButton({ children, Icon, ...rest }) {
  return (
    <Container {...rest}>
      <Icon size={24} color="#fff" />
      {children}
    </Container>
  );
}

export function BackButton({ children, Icon, ...rest }) {
  return (
    <Wrapper {...rest}>
      <Icon size={24} color="#fff" />
      {children}
    </Wrapper>
  );
}

MainButton.propTypes = {
  Icon: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

BackButton.propTypes = {
  Icon: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

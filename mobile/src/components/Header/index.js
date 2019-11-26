import React from 'react';
import { withNavigation } from 'react-navigation';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Logo, Back } from './styles';

import logoHeader from '~/assets/logoHeader.png';

const Header = ({ navigation, GoBack, page }) => {
  return (
    <Container>
      {GoBack ? (
        <Back
          onPress={() => {
            navigation.navigate(page);
          }}
        >
          <Icon name="chevron-left" size={24} color="#000" />
        </Back>
      ) : (
        <View />
      )}
      <Logo source={logoHeader} resizeMode="contain" />
    </Container>
  );
};

export default withNavigation(Header);

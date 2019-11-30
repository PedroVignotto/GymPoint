import React from 'react';
import { withNavigation } from 'react-navigation';
import { useDispatch } from 'react-redux';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Logo, Back, LogOut } from './styles';

import logoHeader from '~/assets/logoHeader.png';

const Header = ({ navigation, GoBack, page }) => {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(signOut());
  }

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

      <LogOut onPress={handleLogout}>
        <Icon name="exit-to-app" size={24} color="#ee4d64" />
      </LogOut>
    </Container>
  );
};

export default withNavigation(Header);

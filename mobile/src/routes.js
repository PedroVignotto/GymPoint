import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './pages/SignIn';

import Checkins from './pages/Checkins';
import Help from './pages/Help';

import Question from './pages/Help/Question';
import Answer from './pages/Help/Answer';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: SignIn,
        App: createBottomTabNavigator(
          {
            Checkins,
            Help: {
              screen: createSwitchNavigator({
                Help,
                Answer,
                Question,
              }),
              navigationOptions: {
                tabBarLabel: 'Ask for help',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="live-help" size={22} color={tintColor} />
                ),
              },
            },
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#ee4e62',
              inactiveTintColor: '#999',
              style: {
                backgroundColor: '#fff',
                padding: 4,
              },
            },
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      }
    )
  );

import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { parseISO, formatDistance } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';
import DefaultLayout from '~/pages/_layouts';

import {
  Container,
  CheckInButton,
  CheckInList,
  Content,
  CheckInTitle,
  CheckInDate,
} from './styles';

export default function Checkins() {
  const [checkins, setCheckins] = useState([]);

  const id = useSelector(state => state.auth.student.id);

  useEffect(() => {
    async function loadCheckins() {
      const response = await api.get(`students/${id}/checkins`);

      const data = response.data.map(checkin => ({
        ...checkin,
        createdAt: formatDistance(parseISO(checkin.createdAt), new Date(), {
          addSuffix: true,
        }),
      }));

      setCheckins(data);
    }

    loadCheckins();
  }, []) //eslint-disable-line

  async function handleCheckIn() {
    try {
      const response = await api.post(`students/${id}/checkins`);

      const data = {
        ...response.data,
        createdAt: formatDistance(
          parseISO(response.data.createdAt),
          new Date(),
          {
            addSuffix: true,
          }
        ),
      };

      setCheckins([...checkins, data]);
      Alert.alert('Success', 'Checkin performed');
    } catch (err) {
      Alert.alert('Error', 'There was an error checking in');
    }
  }

  return (
    <DefaultLayout>
      <Container>
        <CheckInButton onPress={handleCheckIn}>New checkin</CheckInButton>

        <CheckInList
          data={checkins}
          keyExtractor={checkin => String(checkin.id)}
          renderItem={({ item }) => (
            <Content>
              <CheckInTitle>Checkin #{item.id}</CheckInTitle>
              <CheckInDate>{item.createdAt}</CheckInDate>
            </Content>
          )}
        />
      </Container>
    </DefaultLayout>
  );
}

Checkins.navigationOptions = {
  tabBarLabel: 'Checkins',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="room" size={20} color={tintColor} />
  ),
};

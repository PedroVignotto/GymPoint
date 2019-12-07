import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastActionsCreators } from 'react-native-redux-toast';
import { parseISO, formatDistance } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';
import DefaultLayout from '~/pages/_layouts';

import {
  CheckInButton,
  CheckInList,
  Content,
  CheckInTitle,
  CheckInDate,
  Loading,
} from './styles';

export default function Checkins() {
  const dispatch = useDispatch();

  const [checkins, setCheckins] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const id = useSelector(state => state.auth.student.id);

  async function loadCheckins(pageNumber = page) {
    if (total && pageNumber > total) return;

    setLoading(true);

    const response = await api.get(`students/${id}/checkins`, {
      params: { page: pageNumber },
    });

    const data = response.data.checkins.map(checkin => ({
      ...checkin,
      createdAt: formatDistance(parseISO(checkin.created_at), new Date(), {
        addSuffix: true,
      }),
    }));

    const { totalPage } = response.data;

    setTotal(totalPage);
    setPage(pageNumber + 1);
    setCheckins(page > 1 ? [...checkins, ...data] : data);
    setLoading(false);
  }

  useEffect(() => {
    loadCheckins();
  }, []) //eslint-disable-line

  async function handleCheckIn() {
    try {
      const response = await api.post(`students/${id}/checkins`);

      const data = [
        {
          id: response.data.id,
          createdAt: formatDistance(
            parseISO(response.data.createdAt),
            new Date(),
            {
              addSuffix: true,
            }
          ),
        },
      ];

      setCheckins([...data, ...checkins]);
      dispatch(ToastActionsCreators.displayWarning('Checkin performed', 3000));
    } catch (err) {
      dispatch(
        ToastActionsCreators.displayError(err.response.data.error, 3000)
      );
    }
  }

  return (
    <DefaultLayout>
      <CheckInButton onPress={handleCheckIn}>New checkin</CheckInButton>

      <CheckInList
        data={checkins}
        onEndReachedThreshold={0.1}
        onEndReached={() => loadCheckins()}
        ListFooterComponent={loading && <Loading />}
        keyExtractor={checkin => String(checkin.id)}
        renderItem={({ item, index }) => (
          <Content>
            <CheckInTitle>Checkin #{index + 1}</CheckInTitle>
            <CheckInDate>{item.createdAt}</CheckInDate>
          </Content>
        )}
      />
    </DefaultLayout>
  );
}

Checkins.navigationOptions = {
  tabBarLabel: 'Checkins',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="room" size={22} color={tintColor} />
  ),
};

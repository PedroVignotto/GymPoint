import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { parseISO, formatDistance } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';
import DefaultLayout from '~/pages/_layouts';

import {
  OrderButton,
  OrderList,
  Content,
  Top,
  OrderStatus,
  Status,
  OrderDate,
  Question,
} from './styles';

export default function Help({ navigation }) {
  const [helps, setHelps] = useState([]);

  const id = useSelector(state => state.auth.student.id);

  async function loadHelp() {
    const response = await api.get(`students/${id}/help-orders`);

    const data = response.data.map(help => ({
      ...help,
      createdAt: formatDistance(parseISO(help.created_at), new Date(), {
        addSuffix: true,
      }),
    }));

    setHelps(data);
  }

  useEffect(() => {
    loadHelp();
  }, []) //eslint-disable-line


  return (
    <DefaultLayout>
      <OrderButton onPress={() => {}}>New requests for assistance</OrderButton>

      <OrderList
        data={helps}
        keyExtractor={help => String(help.id)}
        renderItem={({ item }) => (
          <Content onPress={() => navigation.navigate('Answer', { item })}>
            <Top>
              <OrderStatus>
                <Icon
                  name="check-circle"
                  color={item.answer ? '#42CB59' : '#999'}
                  size={18}
                />
                <Status answer={item.answer}>
                  {item.answer ? 'Answered' : 'No reply'}
                </Status>
              </OrderStatus>
              <OrderDate>{item.createdAt}</OrderDate>
            </Top>

            <Question>{item.question}</Question>
          </Content>
        )}
      />
    </DefaultLayout>
  );
}

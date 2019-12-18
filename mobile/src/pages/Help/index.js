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
  Loading,
} from './styles';

export default function Help({ navigation }) {
  const [helps, setHelps] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const id = useSelector(state => state.auth.student.id);

  async function loadHelp(pageNumber = page) {
    if (total && pageNumber > total) return;

    setLoading(true);

    const response = await api.get(`students/${id}/help-orders`, {
      params: { page: pageNumber },
    });

    const data = response.data.order.map(help => ({
      ...help,
      createdAt: formatDistance(parseISO(help.created_at), new Date(), {
        addSuffix: true,
      }),
    }));

    const { totalPage } = response.data;

    setTotal(totalPage);
    setPage(pageNumber + 1);
    setHelps(page > 1 ? [...helps, ...data] : data);
    setLoading(false);
  }

  useEffect(() => {
    loadHelp();
  }, []) //eslint-disable-line

  return (
    <DefaultLayout>
      <OrderButton onPress={() => navigation.navigate('Question')}>
        New requests for assistance
      </OrderButton>

      <OrderList
        data={helps}
        onEndReachedThreshold={0.1}
        onEndReached={() => loadHelp()}
        ListFooterComponent={loading && <Loading />}
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

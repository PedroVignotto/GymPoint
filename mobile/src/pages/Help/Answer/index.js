import React from 'react';

import DefaultLayout from '~/pages/_layouts';

import { Content, Nav, Title, Time, Description } from './styles';

export default function Answer({ navigation }) {
  const Order = navigation.getParam('item');

  return (
    <DefaultLayout GoBack page="Help">
      <Content>
        <Nav>
          <Title>Question</Title>
          <Time>{Order.createdAt}</Time>
        </Nav>
        <Description>{Order.question}</Description>
        <Title>Answer</Title>
        <Description>
          {Order.answer
            ? Order.answer
            : 'Your question has not yet been answered.'}
        </Description>
      </Content>
    </DefaultLayout>
  );
}

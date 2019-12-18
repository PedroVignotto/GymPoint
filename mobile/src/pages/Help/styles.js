import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import Button from '~/components/Button';

export const OrderButton = styled(Button)`
  margin-bottom: 16px;
`;

export const Loading = styled.ActivityIndicator.attrs({
  size: 'small',
  color: '#ee4d64',
})``;

export const OrderList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const Content = styled(RectButton)`
  background: #fff;
  border: 1px solid #ddd;
  padding: 16px 24px;
  margin: 8px 0;
`;

export const Top = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const OrderStatus = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Status = styled.Text`
  color: ${props => (props.answer ? '#42CB59' : '#999999')};
  font-size: 15px;
  font-weight: bold;
  margin-left: 4px;
`;

export const OrderDate = styled.Text`
  font-size: 14px;
  color: #666;
`;

export const Question = styled.Text.attrs({
  numberOfLines: 3,
})`
  margin-top: 8px;
  font-size: 14px;
  line-height: 26px;
`;

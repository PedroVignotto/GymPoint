import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  background: #f5f5f5;
  padding: 24px;
`;

export const Loading = styled.ActivityIndicator.attrs({
  size: 'small',
  color: '#ee4d64',
})``;

export const CheckInButton = styled(Button)`
  margin-bottom: 16px;
`;

export const CheckInList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const Content = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background: #fff;
  border: 1px solid #ddd;
  padding: 16px 24px;
  margin: 8px 0;
`;

export const CheckInTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #444;
`;

export const CheckInDate = styled.Text`
  font-size: 14px;
  color: #666;
`;

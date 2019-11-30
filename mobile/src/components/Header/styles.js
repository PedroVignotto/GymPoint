import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px;
  background: #fff;
`;

export const Logo = styled.Image`
  width: 184px;
  height: 24px;
`;

export const Back = styled.TouchableOpacity`
  position: absolute;
  left: 20px;
`;

export const LogOut = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
`;

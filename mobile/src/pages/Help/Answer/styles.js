import styled from 'styled-components/native';

export const Content = styled.View`
  background: #fff;
  border: 1px solid #ddd;
  padding: 16px 24px;
  margin: 8px 0;
`;

export const Nav = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #444;
  text-transform: uppercase;
`;

export const Time = styled.Text`
  font-size: 14px;
  color: #666;
`;

export const Description = styled.Text`
  font-size: 14px;
  color: #666666;
  line-height: 26px;
  padding: 16px 0;
`;

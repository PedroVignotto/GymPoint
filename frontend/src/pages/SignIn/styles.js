import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  background: #ee4d64;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  height: 456px;
  max-width: 360px;
  text-align: center;
  background: #fff;
  border-radius: 4px;
  padding: 40px 35px;

  img {
    width: 153px;
    height: 100px;
  }

  form {
    display: flex;
    flex-direction: column;
    text-align: start;
    margin-top: 30px;

    button {
      height: 44px;
    }
  }
`;

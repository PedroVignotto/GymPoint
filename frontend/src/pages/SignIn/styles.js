import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  height: 100%;
  background: #ee4d64;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  height: 448px;
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
    margin-top: 30px;

    span {
      color: #de3b3b;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: 500;
    }

    strong {
      align-self: flex-start;
      color: #444;
      margin-bottom: 8px;
      font-weight: 500;
    }

    input {
      background: none;
      border: 1px solid #ddd;
      border-radius: 4px;
      height: 45px;
      padding: 0 15px;
      margin: 0 0 10px;

      + strong {
        margin-top: 5px;
      }
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #ee4d64;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      :hover {
        background: ${darken(0.05, '#ee4d64')};
      }
    }
  }
`;

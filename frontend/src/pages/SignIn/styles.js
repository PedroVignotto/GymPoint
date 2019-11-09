import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
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
      align-self: flex-start;
      color: #444;
      margin-bottom: 8px;
      font-weight: 500;
    }

    input + span {
      margin-top: 5px;
    }

    input {
      background: none;
      border: 1px solid #ddd;
      border-radius: 4px;
      height: 45px;
      padding: 0 15px;
      color: #999;
      margin: 0 0 10px;

      &::placeholder {
        color: #999;
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

      &:hover {
        background: ${darken(0.03, '#ee4d64')};
      }
    }
  }
`;

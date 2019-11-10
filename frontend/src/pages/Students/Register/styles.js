import styled from 'styled-components';
import { Form, Input } from '@rocketseat/unform';

export const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 0;

  strong {
    font-size: 24px;
    font-weight: bold;
    color: #444;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;

    button + button {
      margin-left: 10px;
    }
  }
`;

export const UnForm = styled(Form)`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 30px 40px;
  border-radius: 4px;

  strong {
    align-self: flex-start;
    color: #444;
    margin-bottom: 8px;
    font-weight: 500;
  }

  aside {
    display: flex;
    flex-direction: row;
  }
`;

export const UnInput = styled(Input)`
  background: none;
  border: 1px solid #ddd;
  border-radius: 4px;
  height: 35px;
  width: 100%;
  padding: 0 15px;
  color: #999;
  margin: 0 0 10px;

  &::placeholder {
    color: #999;
  }

  + strong {
    margin-top: 5px;
  }
`;

export const Label = styled.div`
  input {
    margin-top: 8px;
  }

  + div {
    margin-left: 24px;
  }
`;

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

  > strong {
    font-size: 24px;
    font-weight: bold;
    color: #444;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;

    button:first-child {
      margin-right: 10px;
    }
  }
`;

export const UnForm = styled(Form)`
  display: flex;
  flex-direction: column;
  border-radius: 4px;

  aside {
    display: flex;
    flex-direction: row;
  }

  span {
    color: #de3b3b;
    align-self: flex-start;
    font-weight: 500;
  }
`;

export const StyleForm = styled.section`
  background: #fff;
  padding: 30px 40px;
  border-radius: 4px;

  strong {
    align-self: flex-start;
    color: #444;
    font-weight: 500;
  }
`;

export const UnInput = styled(Input)`
  background: none;
  border: 1px solid #ddd;
  border-radius: 4px;
  height: 35px;
  width: 100%;
  padding: 0 15px;
  margin: 8px 0 10px;
`;

export const Label = styled.div`
  + div {
    margin-left: 24px;
  }
`;

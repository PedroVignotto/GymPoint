import styled from 'styled-components';
import { Form } from '@rocketseat/unform';

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
`;

export const StyleForm = styled.section`
  background: #fff;
  padding: 30px 40px;
  border-radius: 4px;

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    label {
      flex: 1;

      + label {
        margin-left: 32px;
      }
    }
  }
`;

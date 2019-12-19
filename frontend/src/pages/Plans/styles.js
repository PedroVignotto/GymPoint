import styled from 'styled-components';

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
`;

export const List = styled.table`
  width: 100%;
  padding: 10px 30px 10px 50px;
  background: #fff;
  border-radius: 4px;

  thead th {
    color: #444;
    text-align: left;
    font-weight: 700;
    text-transform: uppercase;
    padding-bottom: 8px;
  }

  tbody td {
    color: #666;
    line-height: 20px;
    padding: 8px 0 8px 0;

    :last-child {
      text-align: right;
    }
  }

  button {
    font-size: 15px;
    color: #4d85ee;
    font-weight: 500;
    background: none;
    border: 0;
    text-align: right;

    + button {
      color: #de3b3b;
      margin-left: 24px;
    }
  }
`;

export const Empty = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 100px auto;

  h6 {
    font-size: 28px;
    font-weight: 500;
    color: #444;
  }
`;

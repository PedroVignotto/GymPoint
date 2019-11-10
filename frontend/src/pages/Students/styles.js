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

  div {
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      display: flex;
      align-items: center;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-left: 16px;
      padding: 0 10px 0 5px;

      button {
        display: flex;
        align-items: center;
        background: none;
        border: 0;
      }

      input {
        border: 0;
        height: 32px;
        margin-left: 5px;
        color: #999;

        &::placeholder {
          color: #999;
        }
      }
    }
  }
`;

export const List = styled.table`
  width: 100%;
  padding: 10px 30px 10px 50px;

  thead th {
    color: #444;
    text-align: left;
    font-weight: 700;
    text-transform: uppercase;
    padding-bottom: 8px;

    &:nth-last-child(-n + 2) {
      text-align: center;
    }
  }

  tbody td {
    color: #666;
    line-height: 20px;
    padding: 8px 0 8px 0;
    border-bottom: 1px solid #eee;

    &:nth-last-child(-n + 3) {
      text-align: center;
    }

    &:last-child {
      text-align: right;
    }
  }

  span {
    width: 20px;
    height: 20px;
    background: #42cb59;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
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

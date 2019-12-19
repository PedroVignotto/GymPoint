import styled from 'styled-components';
import { Modal } from 'react-bootstrap';

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
  }
`;

export const Modals = styled(Modal)`
  div.modal-body {
    padding: 30px;

    span {
      color: #e0042d;
      font-size: 12px;
      font-weight: 500;
      line-height: 1.3;
      width: 100%;
      transform: none;
      animation: fadeIn 350ms ease-in-out 1;

      @keyframes fadeIn {
        from {
          transform: translateY(-20px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
    }

    strong {
      color: #444;
      font-weight: 14px;
      font-weight: 500;
      text-transform: uppercase;
    }

    p {
      margin: 8px 0;
      color: #666;
      line-height: 26px;
      text-align: justify;
    }

    textarea {
      resize: none;
      width: 100%;
      height: 150px;
      margin: 8px 0;
      border: 1px solid #ddd;
      border-radius: 4px;
      color: #444;
      background: none;
      padding: 8px 16px;
    }

    button {
      width: 100%;
      height: 40px;
      margin-top: 8px;
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

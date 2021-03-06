import styled from 'styled-components';

export const Label = styled.label`
  display: flex;
  flex-direction: column-reverse;
  position: relative;
  margin-bottom: 16px;

  > span:first-child {
    color: #e0042d;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.3;
    width: 100%;
    margin: 8px 0 4px;
    border-radius: 4px;
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

  div.css-1pahdxg-control {
    box-shadow: none;
    border-color: #ddd;
    margin: 0 !important;
  }

  strong {
    font-weight: 700;
    color: #444;
    margin-bottom: 8px;
    text-transform: uppercase;
  }
`;

import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 16px;
  border: none;
  border-radius: 4px;
  background: ${props => props.background};
  color: #fff;
  font-weight: 500;
  text-transform: uppercase;
  transition: background 0.2s;

  a {
    color: #fff;
    text-decoration: none;
  }

  &:hover {
    background: ${props => darken(0.05, props.background)};
  }

  svg {
    margin-right: 5px;
  }
`;

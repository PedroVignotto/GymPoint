import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.button`
  display: flex;
  align-items: center;
  padding: 4px 16px;
  border: none;
  border-radius: 4px;
  background: #ee4d64;
  color: #fff;
  font-weight: 500;
  text-transform: uppercase;
  transition: background 0.2s;

  a {
    color: #fff;
    text-decoration: none;
  }

  &:hover {
    background: ${darken(0.05, '#ee4d64')};
  }

  svg {
    margin-right: 5px;
  }
`;

export const Wrapper = styled.button`
  display: flex;
  align-items: center;
  padding: 4px 16px;
  border: none;
  border-radius: 4px;
  background: ${darken(0.05, '#ddd')};
  color: #fff;
  font-weight: 500;
  text-transform: uppercase;
  transition: background 0.2s;

  a {
    color: #fff;
    text-decoration: none;
  }

  &:hover {
    background: ${darken(0.08, '#ddd')};
  }

  svg {
    margin-right: 5px;
  }
`;

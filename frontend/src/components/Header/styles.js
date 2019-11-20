import styled from 'styled-components';
import { darken } from 'polished';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
  border-bottom: 1px solid #eee;
`;

export const Link = styled(NavLink).attrs({
  activeStyle: { color: '#ee4d64' },
})``;

export const Content = styled.div`
  height: 64px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      width: 135px;
      height: 24px;
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }

    a {
      font-weight: 500;
      color: #999;
      text-transform: uppercase;

      + a {
        margin-left: 20px;
      }
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    background: #ee4d64;
    border: none;
    border-radius: 4px;
    color: #fff;
    font-weight: 500;
    padding: 4px 8px;
    transition: background 0.2s;

    :hover {
      background: ${darken(0.05, '#ee4d64')};
    }

    svg {
      margin-right: 5px;
    }
  }
`;

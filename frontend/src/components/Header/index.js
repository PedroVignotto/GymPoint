import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdExitToApp } from 'react-icons/md';

import { signOut } from '~/store/modules/auth/actions';

import logoHeader from '~/assets/logoHeader.svg';

import { Container, Content } from './styles';

export default function Header() {
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logoHeader} alt="GymPoint" />
          <Link to="/dashboard">Students</Link>
          <Link to="/dashboard">Plans</Link>
          <Link to="/dashboard">Enrollments</Link>
          <Link to="/dashboard">Requests for assistance</Link>
        </nav>

        <button type="button" onClick={handleSignOut}>
          <MdExitToApp size={24} color="#FFF" />
          Sair
        </button>
      </Content>
    </Container>
  );
}

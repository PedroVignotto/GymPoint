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
          <Link to="/students">Students</Link>
          <Link to="/plans">Plans</Link>
          <Link to="/students">Enrollments</Link>
          <Link to="/students">Requests for assistance</Link>
        </nav>

        <button type="button" onClick={handleSignOut}>
          <MdExitToApp size={24} color="#FFF" />
          Sign out
        </button>
      </Content>
    </Container>
  );
}

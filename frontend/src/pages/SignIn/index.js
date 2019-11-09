import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';
import { Container, Content } from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid e-mail address')
    .required('E-mail is required'),
  password: Yup.string().required('Password is required'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <Container>
      <Content>
        <img src={logo} alt="GymPoint" />

        <Form schema={schema} onSubmit={handleSubmit}>
          <strong>Your e-mail</strong>
          <Input name="email" placeholder="exemple@email.com" />
          <strong>Your password</strong>
          <Input name="password" type="password" placeholder="*************" />

          <button type="submit">
            {loading ? 'Loading...' : 'Login to the system'}
          </button>
        </Form>
      </Content>
    </Container>
  );
}

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';
import Input from '~/components/Input';
import Button from '~/components/Button';

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
          <Input label="E-mail" name="email" placeholder="exemple@email.com" />
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="*************"
          />

          <Button type="submit" background="#ee4d64">
            {loading ? 'Loading...' : 'Login to the system'}
          </Button>
        </Form>
      </Content>
    </Container>
  );
}

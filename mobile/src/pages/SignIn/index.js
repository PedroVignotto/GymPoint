import React, { useState } from 'react';
import { Image, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { signInRequest } from '~/store/modules/auth/actions';

import { Container, Content, Form, FormInput, SubmitButton } from './styles';

import logo from '~/assets/logo.png';

export default function SignIn() {
  const dispatch = useDispatch();

  const [id, setId] = useState('');

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    dispatch(signInRequest(id));
  }

  return (
    <Container onPress={Keyboard.dismiss}>
      <Content>
        <Image source={logo} />

        <Form>
          <FormInput
            keyboardType="numeric"
            placeholder="Enter your registration ID"
            value={id}
            onSubmitEditing={handleSubmit}
            onChangeText={setId}
          />

          <SubmitButton loading={loading} onPress={handleSubmit}>
            Login to the system
          </SubmitButton>
        </Form>
      </Content>
    </Container>
  );
}

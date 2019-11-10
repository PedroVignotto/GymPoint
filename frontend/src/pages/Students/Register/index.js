import React from 'react';
import { MdDone, MdArrowBack } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { MainButton, BackButton } from '~/components/Button';
import { Container, Top, UnForm, UnInput, Label } from './styles';

export default function Register() {
  return (
    <Container>
      <Top>
        <strong>Student registration</strong>
        <div>
          <BackButton type="button" Icon={MdArrowBack} iconColor="#fff">
            <Link to="/students">Back</Link>
          </BackButton>
          <MainButton type="button" Icon={MdDone} iconColor="#fff">
            Save
          </MainButton>
        </div>
      </Top>

      <UnForm>
        <strong>Full name</strong>
        <UnInput name="name" />
        <strong>E-mail address</strong>
        <UnInput name="email" />
        <aside>
          <Label>
            <strong>Age</strong>
            <UnInput name="age" />
          </Label>
          <Label>
            <strong>Weight</strong>
            <UnInput name="weight" />
          </Label>
          <Label>
            <strong>Height</strong>
            <UnInput name="height" />
          </Label>
        </aside>
      </UnForm>
    </Container>
  );
}

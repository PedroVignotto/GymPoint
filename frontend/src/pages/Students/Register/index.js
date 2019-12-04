import React from 'react';
import { toast } from 'react-toastify';
import { MdDone, MdArrowBack } from 'react-icons/md';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import api from '~/services/api';
import history from '~/services/history';
import Button from '~/components/Button';
import Input from '~/components/Input';

import { Container, Top, UnForm, StyleForm } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid e-mail address')
    .required('E-mail is required'),
  age: Yup.number('Age must be a number')
    .integer('Age must be an integer')
    .typeError('Invalid value')
    .positive('Age must be a positive number')
    .required('Age is required'),
  weight: Yup.number('Weight must be a number')
    .typeError('Invalid value')
    .positive('Weight must be a positive number')
    .required('Weight is required'),
  height: Yup.number('Height must be a number')
    .typeError('Invalid value')
    .positive('Height must be a positive number')
    .required('Height is required'),
});

export default function Register() {
  async function handleSubmit({ name, email, age, weight, height }) {
    try {
      await api.post('students', {
        name,
        email,
        age,
        weight,
        height,
      });

      toast.success('User successfully added');
      history.push('/students');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  return (
    <Container>
      <UnForm onSubmit={handleSubmit} schema={schema}>
        <Top>
          <strong>Student registration</strong>
          <div>
            <Link to="/students">
              <Button
                type="button"
                Icon={MdArrowBack}
                iconColor="#fff"
                background="#ddd"
              >
                Back
              </Button>
            </Link>
            <Button
              type="submit"
              Icon={MdDone}
              iconColor="#fff"
              background="#ee4d64"
            >
              Save
            </Button>
          </div>
        </Top>

        <StyleForm>
          <Input label="Full name" name="name" />
          <Input label="E-mail address" name="email" />
          <div>
            <Input label="Age" name="age" />
            <Input label="Weight (in kg)" name="weight" />
            <Input label="Height" name="height" />
          </div>
        </StyleForm>
      </UnForm>
    </Container>
  );
}

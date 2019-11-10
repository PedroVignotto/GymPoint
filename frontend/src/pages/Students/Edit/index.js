import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { MdDone, MdArrowBack } from 'react-icons/md';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import api from '~/services/api';
import history from '~/services/history';
import { MainButton, BackButton } from '~/components/Button';
import { Container, Top, UnForm, UnInput, Label, StyleForm } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string()
    .email('Invalid e-mail address')
    .required('E-mail is required'),
  age: Yup.number('Age must be a number')
    .integer('Age must be an integer')
    .positive('Age must be a positive number')
    .required('Age is required'),
  weight: Yup.number('Weight must be a number')
    .positive('Weight must be a positive number')
    .required('Weight is required'),
  height: Yup.number('Height must be a number')
    .positive('Height must be a positive number')
    .required('Height is required'),
});

export default function Edit({ match }) {
  const [student, setStudent] = useState([]);

  useEffect(() => {
    async function loadStudent() {
      const { id } = match.params;

      const response = await api.get(`students/${id}`);

      setStudent(response.data);
    }

    loadStudent();
  }, []); //eslint-disable-line

  async function handleSubmit({ name, email, age, weight, height }) {
    try {
      const { id } = match.params;

      await api.put(`students/${id}`, {
        name,
        email,
        age,
        weight,
        height,
      });

      toast.success('Data updated successfully');
      history.push('/students');
    } catch (err) {
      toast.error('Something went wrong try again');
    }
  }

  return (
    <Container>
      <UnForm initialData={student} onSubmit={handleSubmit} schema={schema}>
        <Top>
          <strong>Student Edition</strong>
          <div>
            <BackButton type="button" Icon={MdArrowBack} iconColor="#fff">
              <Link to="/students">Back</Link>
            </BackButton>
            <MainButton type="submit" Icon={MdDone} iconColor="#fff">
              Save
            </MainButton>
          </div>
        </Top>

        <StyleForm>
          <strong>Full name</strong>
          <UnInput name="name" />
          <br />
          <strong>E-mail address</strong>
          <UnInput name="email" />
          <aside>
            <Label>
              <strong>Age</strong>
              <UnInput name="age" />
            </Label>
            <Label>
              <strong>Weight (in kg)</strong>
              <UnInput name="weight" />
            </Label>
            <Label>
              <strong>Height</strong>
              <UnInput name="height" />
            </Label>
          </aside>
        </StyleForm>
      </UnForm>
    </Container>
  );
}

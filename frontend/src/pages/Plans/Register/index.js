import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { MdDone, MdArrowBack } from 'react-icons/md';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import api from '~/services/api';
import history from '~/services/history';
import { Button } from '~/components/Button';
import { Container, Top, UnForm, UnInput, Label, StyleForm } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required(),
  duration: Yup.number('Duration must be a number')
    .integer('Duration must be an integer')
    .positive('Duration must be a positive number')
    .required('Duration is required'),
  price: Yup.number('Weight must be a number')
    .positive('Weight must be a positive number')
    .required('Weight is required'),
});

export default function Register() {
  const [total, setTotal] = useState(0);
  const [planDuration, setPlanDuration] = useState(null);
  const [planPrice, setPlanPrice] = useState(null);

  useEffect(() => {
    setTotal(planDuration * planPrice);
  }, [planDuration, planPrice]);

  async function handleSubmit({ title, duration, price }) {
    try {
      await api.post('plans', {
        title,
        duration,
        price,
      });

      toast.success('Plan successfully added');
      history.goBack();
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  return (
    <Container>
      <UnForm onSubmit={handleSubmit} schema={schema}>
        <Top>
          <strong>Plan registration</strong>
          <div>
            <Link to="/plans">
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
          <strong>Title</strong>
          <UnInput name="title" />
          <aside>
            <Label>
              <strong>Duration (in months)</strong>
              <UnInput
                name="duration"
                onChange={e => setPlanDuration(e.target.value)}
              />
            </Label>
            <Label>
              <strong>Monthly payment</strong>
              <UnInput
                name="price"
                onChange={e => setPlanPrice(e.target.value)}
              />
            </Label>
            <Label>
              <strong>Total price</strong>
              <UnInput name="total" value={total} disabled />
            </Label>
          </aside>
        </StyleForm>
      </UnForm>
    </Container>
  );
}

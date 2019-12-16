import React, { useEffect, useState } from 'react';
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
  title: Yup.string().required(),
  duration: Yup.number('Duration must be a number')
    .typeError('Invalid value')
    .integer('Duration must be an integer')
    .positive('Duration must be a positive number')
    .required('Duration is required'),
  price: Yup.number('Weight must be a number')
    .typeError('Invalid value')
    .positive('Weight must be a positive number')
    .required('Weight is required'),
});

export default function Edit({ match }) {
  const [plan, setPlan] = useState([]);
  const [total, setTotal] = useState(null);
  const [planDuration, setPlanDuration] = useState(null);
  const [planPrice, setPlanPrice] = useState(null);
  const { id } = match.params;

  useEffect(() => {
    setTotal(planDuration * planPrice);
  }, [planDuration, planPrice]);

  useEffect(() => {
    async function loadPlan() {
      const response = await api.get(`plans/${id}`);

      setTotal(response.data.duration * response.data.price);
      setPlanDuration(response.data.duration);
      setPlanPrice(response.data.price);
      setPlan(response.data);
    }

    loadPlan();
  }, []); //eslint-disable-line

  async function handleSubmit({ title, duration, price }) {
    try {
      await api.put(`plans/${id}`, {
        title,
        duration,
        price,
      });

      toast.success('Plan updated successfully');
      history.goBack();
    } catch (err) {
      toast.error('Something went wrong try again');
    }
  }

  return (
    <Container>
      <UnForm initialData={plan} onSubmit={handleSubmit} schema={schema}>
        <Top>
          <strong>Plan edition</strong>
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
          <Input label="Title" name="title" />
          <div>
            <Input
              label="Duration (in months)"
              name="duration"
              onChange={e => setPlanDuration(e.target.value)}
            />
            <Input
              label="Monthly payment"
              name="price"
              onChange={e => setPlanPrice(e.target.value)}
            />
            <Input
              label="Total price"
              thousandSeparator
              name="total"
              value={total}
              disabled
            />
          </div>
        </StyleForm>
      </UnForm>
    </Container>
  );
}

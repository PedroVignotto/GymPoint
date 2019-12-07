import React, { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { format, addMonths, parseISO } from 'date-fns';
import { MdDone, MdArrowBack } from 'react-icons/md';
import { Link } from 'react-router-dom';

import * as Yup from 'yup';

import api from '~/services/api';
import history from '~/services/history';

import Select from '~/components/Select';
import Button from '~/components/Button';
import DatePicker from '~/components/DatePicker';
import Input from '~/components/Input';

import { formatPrice } from '~/util/format';

import { Container, Top, UnForm, StyleForm } from './styles';

const schema = Yup.object().shape({
  plan: Yup.mixed().typeError('Invalid value'),
  start_date: Yup.date()
    .typeError('Invalid value')
    .required('Start date is required'),
});

export default function Edit({ match }) {
  const [student, setStudent] = useState([]);
  const [newPlan, setNewPlan] = useState();
  const [startDate, setStartDate] = useState();
  const [total, setTotal] = useState('');
  const { id } = match.params;

  const end_date = useMemo(() => {
    if (startDate && newPlan) {
      setTotal(formatPrice(newPlan.duration * newPlan.price));
      return format(addMonths(startDate, newPlan.duration), 'MM/dd/yyyy');
    }
    return '';
  }, [startDate, newPlan]);

  useEffect(() => {
    async function enrollmentData() {
      const response = await api.get(`enrollments/${id}`);

      setNewPlan({
        label: response.data.plan.title,
        value: response.data.plan.id,
        duration: response.data.plan.duration,
        price: response.data.plan.price,
      });
      setStartDate(parseISO(response.data.start_date));
      setStudent(response.data.student);
    }

    enrollmentData();
  }, []) //eslint-disable-line


  async function handleSubmit({ plan, start_date }) {
    try {
      if (!plan) {
        await api.put(`enrollments/${id}`, {
          plan_id: newPlan.value,
          start_date,
        });
        toast.success('Enrollment updated successfully');
        history.push('/enrollments');
      } else {
        await api.put(`enrollments/${id}`, {
          plan_id: plan.value,
          start_date,
        });
        toast.success('Enrollment updated successfully');
        history.push('/enrollments');
      }
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  return (
    <Container>
      <UnForm onSubmit={handleSubmit} schema={schema}>
        <Top>
          <strong>Enrollment edition</strong>
          <div>
            <Link to="/enrollments">
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
          <Input label="Student" name="student" value={student.name} disabled />
          <Select
            label="Plan"
            name="plan"
            value={newPlan}
            setChange={setNewPlan}
          />
          <aside>
            <DatePicker
              label="Start date"
              name="start_date"
              setChange={setStartDate}
              selected={startDate}
            />
            <Input
              label="End date"
              name="end_date"
              value={end_date || ''}
              disabled
            />
            <Input label="Final price" name="total" value={total} disabled />
          </aside>
        </StyleForm>
      </UnForm>
    </Container>
  );
}

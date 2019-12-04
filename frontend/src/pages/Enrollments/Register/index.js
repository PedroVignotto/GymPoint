import React, { useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import { format, addMonths } from 'date-fns';
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
  student: Yup.mixed()
    .typeError('Invalid value')
    .required('Student is required'),
  plan: Yup.mixed()
    .typeError('Invalid value')
    .required('Plan is required'),
  start_date: Yup.date()
    .typeError('Invalid value')
    .required('Start date is required'),
});

export default function Register() {
  const [newPlan, setNewPlan] = useState();
  const [startDate, setStartDate] = useState();
  const [total, setTotal] = useState('');

  const end_date = useMemo(() => {
    if (startDate && newPlan) {
      setTotal(formatPrice(newPlan.duration * newPlan.price));
      return format(addMonths(startDate, newPlan.duration), 'dd/MM/yyyy');
    }
    return '';
  }, [startDate, newPlan]);

  async function handleSubmit({ student, plan, start_date }) {
    try {
      await api.post('enrollments', {
        student_id: student.value,
        plan_id: plan.value,
        start_date,
      });
      toast.success('Successful Enrolled Student');
      history.push('/enrollments');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  return (
    <Container>
      <UnForm onSubmit={handleSubmit} schema={schema}>
        <Top>
          <strong>Enrollment registration</strong>
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
          <Select label="Student" name="student" />
          <Select label="Plan" name="plan" setChange={setNewPlan} />
          <aside>
            <DatePicker
              label="Start date"
              name="start_date"
              setChange={setStartDate}
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

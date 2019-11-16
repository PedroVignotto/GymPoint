import React, { useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import { format, addMonths } from 'date-fns';
import { MdDone, MdArrowBack } from 'react-icons/md';
import { Link } from 'react-router-dom';

import api from '~/services/api';
import history from '~/services/history';

import { Button } from '~/components/Button';
import DatePicker from '~/components/DatePicker';
import { formatPrice } from '~/util/format';

import {
  Container,
  Top,
  UnForm,
  UnInput,
  Label,
  StyleForm,
  UnSelect,
} from './styles';

export default function Register() {
  const [newPlan, setNewPlan] = useState();
  const [startDate, setStartDate] = useState();
  const [total, setTotal] = useState('');

  const end_date = useMemo(() => {
    if (startDate && newPlan) {
      setTotal(formatPrice(newPlan.duration * newPlan.price));
      return format(addMonths(startDate, newPlan.duration), 'MM/dd/yyyy');
    }
    return '';
  }, [newPlan, startDate]);

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
      <UnForm onSubmit={handleSubmit}>
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
          <strong>Student</strong>
          <UnSelect name="student" />
          <strong>Plan</strong>
          <UnSelect name="plan" setChange={setNewPlan} />
          <aside>
            <Label>
              <strong>Start date</strong>
              <DatePicker name="start_date" setChange={setStartDate} />
            </Label>
            <Label>
              <strong>End date</strong>
              <UnInput name="total" value={end_date || ''} disabled />
            </Label>
            <Label>
              <strong>Final price</strong>
              <UnInput name="total" value={total} disabled />
            </Label>
          </aside>
        </StyleForm>
      </UnForm>
    </Container>
  );
}

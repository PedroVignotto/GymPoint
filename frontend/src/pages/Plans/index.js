import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import api from '~/services/api';
import { formatPrice } from '~/util/format';
import { Button } from '~/components/Button';

import { Top, List } from './styles';

export default function Plans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('plans');

      const data = response.data.map(plan => ({
        ...plan,
        priceFormatted: formatPrice(plan.price),
      }));

      setPlans(data);
    }

    loadStudents();
  }, [plans]);

  async function handleDelete(id) {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonColor: '#42cb59',
        cancelButtonColor: '#ee4d64',
        confirmButtonText: 'Yes, delete it!',
      }).then(result => {
        if (result.value) {
          api.delete(`plans/${id}`);
          toast.success('Plan successfully deleted');
        }
      });
    } catch (err) {
      toast.error('Something went wrong try again');
    }
  }

  return (
    <>
      <Top>
        <strong>Managing plans</strong>
        <Button
          type="button"
          Icon={MdAdd}
          iconColor="#fff"
          background="#ee4d64"
        >
          Register
        </Button>
      </Top>

      <List>
        <thead>
          <tr>
            <th>Title</th>
            <th>Duration</th>
            <th>Monthly payment</th>
          </tr>
        </thead>
        {plans.map(plan => (
          <tbody>
            <td>{plan.title}</td>
            <td>
              {plan.duration === 1
                ? `${plan.duration} Month`
                : `${plan.duration} Months`}
            </td>
            <td>{plan.priceFormatted}</td>
            <td>
              <button type="button">edit</button>
              <button type="button" onClick={() => handleDelete(plan.id)}>
                delete
              </button>
            </td>
          </tbody>
        ))}
      </List>
    </>
  );
}
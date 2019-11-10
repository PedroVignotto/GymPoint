import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';

import api from '~/services/api';
import { formatPrice } from '~/util/format';
import { MainButton } from '~/components/Button';

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
  }, []);

  return (
    <>
      <Top>
        <strong>Managing plans</strong>
        <MainButton type="button" Icon={MdAdd} iconColor="#fff">
          Register
        </MainButton>
      </Top>

      <List>
        <thead>
          <tr>
            <th>Title</th>
            <th>Duration</th>
            <th>monthly payment</th>
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
              <button type="button">delete</button>
            </td>
          </tbody>
        ))}
      </List>
    </>
  );
}

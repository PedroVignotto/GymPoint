import React, { useState, useEffect, useMemo } from 'react';
import { MdAdd } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import history from '~/services/history';
import api from '~/services/api';
import { formatPrice } from '~/util/format';
import Button from '~/components/Button';
import Loading from '~/components/Loading';

import { Top, List, Empty } from './styles';

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('plans');

      const data = response.data.map(plan => ({
        ...plan,
        priceFormatted: formatPrice(plan.price),
      }));

      setPlans(data);
      setLoading(false);
    }

    loadPlans();
  }, []);

  const planSize = useMemo(() => plans.length, [plans]);

  async function handleDelete(id) {
    try {
      // eslint-disable-next-line no-restricted-globals
      const delet = confirm('Are you sure?');

      if (delet) {
        api.delete(`plans/${id}`);

        setPlans(plans.filter(plan => plan.id !== id));
        toast.success('Plan successfully deleted');
      }
    } catch (err) {
      toast.error('Something went wrong try again');
    }
  }

  return (
    <>
      <Top>
        <strong>Managing plans</strong>
        <Link to="/plans/register">
          <Button
            type="button"
            Icon={MdAdd}
            iconColor="#fff"
            background="#ee4d64"
          >
            Register
          </Button>
        </Link>
      </Top>

      {loading ? (
        <Loading />
      ) : (
        <List>
          <thead>
            <tr>
              <th>Title</th>
              <th>Duration</th>
              <th>Monthly payment</th>
            </tr>
          </thead>
          {plans.map(plan => (
            <tbody key={plan.id}>
              <tr>
                <td>{plan.title}</td>
                <td>
                  {plan.duration === 1
                    ? `${plan.duration} Month`
                    : `${plan.duration} Months`}
                </td>
                <td>{plan.priceFormatted}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => history.push(`/plans/edit/${plan.id}`)}
                  >
                    edit
                  </button>
                  <button type="button" onClick={() => handleDelete(plan.id)}>
                    delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </List>
      )}

      {!loading && !planSize && (
        <Empty>
          <h6>No plans registered</h6>
        </Empty>
      )}
    </>
  );
}

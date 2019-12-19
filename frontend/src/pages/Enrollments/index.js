import React, { useState, useEffect, useMemo } from 'react';
import { MdAdd, MdDone } from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';
import Button from '~/components/Button';
import Loading from '~/components/Loading';

import { Top, List, Active, Empty } from './styles';

export default function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEnrollments() {
      const response = await api.get('enrollments');

      const data = response.data.map(enrollment => ({
        ...enrollment,
        startDate: format(parseISO(enrollment.start_date), 'MMMM dd, yyyy'),
        endDate: format(parseISO(enrollment.end_date), 'MMMM dd, yyyy'),
      }));

      setEnrollments(data);
      setLoading(false);
    }

    loadEnrollments();
  }, []);

  const enrollmentSize = useMemo(() => enrollments.length, [enrollments]);

  async function handleDelete(id) {
    try {
      // eslint-disable-next-line no-restricted-globals
      const delet = confirm('Are you sure?');

      if (delet) {
        api.delete(`enrollments/${id}`);

        setEnrollments(enrollments.filter(enrollment => enrollment.id !== id));
        toast.success('Enrollment successfully deleted');
      }
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  return (
    <>
      <Top>
        <strong>Managing enrollments</strong>
        <div>
          <Link to="/enrollments/register">
            <Button
              type="button"
              Icon={MdAdd}
              iconColor="#fff"
              background="#ee4d64"
            >
              Register
            </Button>
          </Link>
        </div>
      </Top>

      {loading ? (
        <Loading />
      ) : (
        <List>
          <thead>
            <tr>
              <th>Name</th>
              <th>Plan</th>
              <th>start</th>
              <th>end</th>
              <th>active</th>
            </tr>
          </thead>
          {enrollments.map(enrollment => (
            <tbody key={enrollment.id}>
              <tr>
                <td>{enrollment.student.name}</td>
                <td>{enrollment.plan && enrollment.plan.title}</td>
                <td>{enrollment.startDate}</td>
                <td>{enrollment.endDate}</td>
                <td>
                  <Active active={enrollment.active}>
                    <MdDone size={16} color="#fff" />
                  </Active>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() =>
                      history.push(`/enrollments/edit/${enrollment.id}`)
                    }
                  >
                    edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(enrollment.id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </List>
      )}

      {!loading && !enrollmentSize && (
        <Empty>
          <h6>No enrolled student</h6>
        </Empty>
      )}
    </>
  );
}

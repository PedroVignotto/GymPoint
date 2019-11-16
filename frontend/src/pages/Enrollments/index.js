import React, { useState, useEffect } from 'react';
import { MdAdd, MdDone } from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';

import api from '~/services/api';
import { Button } from '~/components/Button';

import { Top, List, Active } from './styles';

export default function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('enrollments');

      const data = response.data.map(enrollment => ({
        ...enrollment,
        startDate: format(parseISO(enrollment.start_date), 'MMMM dd, yyyy'),
        endDate: format(parseISO(enrollment.end_date), 'MMMM dd, yyyy'),
      }));

      setEnrollments(data);
    }

    loadStudents();
  }, []);

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

      <List>
        <thead>
          <tr>
            <th>Name</th>
            <th>e-mail</th>
            <th>start</th>
            <th>end</th>
            <th>active</th>
          </tr>
        </thead>
        {enrollments.map(enrollment => (
          <tbody>
            <td>{enrollment.student.name}</td>
            <td>{enrollment.plan.title}</td>
            <td>{enrollment.startDate}</td>
            <td>{enrollment.endDate}</td>
            <td>
              <Active active={enrollment.active}>
                <MdDone size={16} color="#fff" />
              </Active>
            </td>
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

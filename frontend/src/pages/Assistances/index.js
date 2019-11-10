import React, { useState, useEffect } from 'react';
import { MdAdd, MdDone } from 'react-icons/md';
import { parseISO, formatDistance } from 'date-fns';
import api from '~/services/api';

import { MainButton } from '~/components/Button';

import { Top, List, Answer } from './styles';

export default function Assistances() {
  const [assistances, setAssistances] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('help-orders/answers');

      const data = response.data.map(assistance => ({
        ...assistance,
        createdAt: formatDistance(parseISO(assistance.created_at), new Date(), {
          addSuffix: true,
        }),
      }));

      setAssistances(data);
    }

    loadStudents();
  }, []);

  return (
    <>
      <Top>
        <strong>Requests for assistance</strong>
        <div>
          <MainButton type="button" Icon={MdAdd} iconColor="#fff">
            Register
          </MainButton>
        </div>
      </Top>

      <List>
        <thead>
          <tr>
            <th>Date</th>
            <th>Student</th>
            <th>Answer</th>
          </tr>
        </thead>
        {assistances.map(assistance => (
          <tbody>
            <td>{assistance.createdAt}</td>
            <td>{assistance.student.name}</td>
            <td>
              <Answer answer={assistance.answer_at}>
                <MdDone size={16} color="#fff" />
              </Answer>
            </td>
            <td>
              {assistance.answer_at ? (
                <button type="button">view</button>
              ) : (
                <button type="button">reply</button>
              )}
            </td>
          </tbody>
        ))}
      </List>
    </>
  );
}

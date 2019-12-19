import React, { useState, useEffect, useMemo } from 'react';
import { parseISO, formatDistance } from 'date-fns';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import api from '~/services/api';

import Button from '~/components/Button';
import Loading from '~/components/Loading';

import { Top, List, Modals, Empty } from './styles';

const schema = Yup.object().shape({
  id: Yup.number().required(),
  answer: Yup.string().required('Answer is required'),
});

export default function Assistances() {
  const [assistances, setAssistances] = useState([]);
  const [question, setQuestion] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAssistances() {
      const response = await api.get('help-orders/answers');

      const data = response.data.map(assistance => ({
        ...assistance,
        createdAt: formatDistance(parseISO(assistance.created_at), new Date(), {
          addSuffix: true,
        }),
      }));

      setAssistances(data);
      setLoading(false);
    }

    loadAssistances();
  }, []); //eslint-disable-line

  const assistanceSize = useMemo(() => assistances.length, [assistances]);

  function handleOpenModal(assistance) {
    setOpen(true);
    setQuestion(assistance);
  }

  async function handleSubmit({ id, answer }) {
    try {
      await api.put(`/help-orders/${id}/answers`, {
        answer,
      });

      setAssistances(assistances.filter(assistance => assistance.id !== id));
      setOpen(false);
      toast.success('The answer was sent to the student');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  return (
    <>
      <Top>
        <strong>Requests for assistance</strong>
      </Top>

      {loading ? (
        <Loading />
      ) : (
        <List>
          <thead>
            <tr>
              <th>Date</th>
              <th>Student</th>
            </tr>
          </thead>
          {assistances.map(assistance => (
            <tbody key={assistance.id}>
              <tr>
                <td>{assistance.createdAt}</td>
                <td>{assistance.student.name}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleOpenModal(assistance)}
                  >
                    reply
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </List>
      )}

      {!loading && !assistanceSize && (
        <Empty>
          <h6>No assistance requests</h6>
        </Empty>
      )}

      <Modals show={open} onHide={() => setOpen(false)} animation>
        <Modals.Body>
          <strong>Student question</strong>
          <p>{question.question}</p>
          <strong>Your answer</strong>
          <Form initialData={question} onSubmit={handleSubmit} schema={schema}>
            <Input name="id" type="hidden" />
            <Input
              name="answer"
              placeholder="Write here your answer"
              multiline
            />
            <Button type="submit" background="#ee4d64">
              Answer student
            </Button>
          </Form>
        </Modals.Body>
      </Modals>
    </>
  );
}

import React, { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { MdAdd, MdSearch } from 'react-icons/md';
import { Link } from 'react-router-dom';

import history from '~/services/history';
import api from '~/services/api';
import Button from '~/components/Button';
import Loading from '~/components/Loading';

import { Top, List, Empty } from './styles';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  async function loadStudents() {
    const response = await api.get('students', {
      params: { q: search },
    });

    setStudents(response.data);
    setLoading(false);
  }

  useEffect(() => {
    loadStudents();
  }, []); //eslint-disable-line

  const studentSize = useMemo(() => students.length, [students]);

  async function handleDelete(id) {
    try {
      // eslint-disable-next-line no-restricted-globals
      const delet = confirm('Are you sure?');

      if (delet) {
        api.delete(`students/${id}`);

        setStudents(students.filter(student => student.id !== id));
        toast.success('Student successfully deleted');
      }
    } catch (err) {
      toast.error('Something went wrong try again');
    }
  }

  return (
    <>
      <Top>
        <strong>Managing students</strong>
        <div>
          <Link to="/students/register">
            <Button
              type="button"
              Icon={MdAdd}
              iconColor="#fff"
              background="#ee4d64"
            >
              register
            </Button>
          </Link>
          <span>
            <button type="button" onClick={() => loadStudents()}>
              <MdSearch size={24} color="#999" />
            </button>
            <input
              name="search"
              placeholder="Search student"
              autoComplete="off"
              onKeyDown={e => e.key === 'Enter' && loadStudents()}
              onChange={e => setSearch(e.target.value)}
            />
          </span>
        </div>
      </Top>

      {loading ? (
        <Loading />
      ) : (
        <List>
          <thead>
            <tr>
              <th>Name</th>
              <th>e-mail</th>
              <th>age</th>
            </tr>
          </thead>
          {students.map(student => (
            <tbody key={student.id}>
              <tr>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => history.push(`/students/edit/${student.id}`)}
                  >
                    edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(student.id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </List>
      )}

      {!loading && !studentSize && (
        <Empty>
          <h6>No students registered</h6>
        </Empty>
      )}
    </>
  );
}

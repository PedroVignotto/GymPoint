import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { MdAdd, MdSearch } from 'react-icons/md';
import { Link } from 'react-router-dom';

import history from '~/services/history';
import api from '~/services/api';
import Button from '~/components/Button';

import { Top, List } from './styles';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState([]);

  async function loadStudents() {
    const response = await api.get('students', {
      params: { q: search },
    });

    setStudents(response.data);
  }

  useEffect(() => {
    loadStudents();
  }, []); //eslint-disable-line

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

  function handleSearch(e) {
    setSearch(e.target.value);
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
              onKeyDown={event => event.key === 'Enter' && loadStudents()}
              onChange={handleSearch}
            />
          </span>
        </div>
      </Top>

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
                <button type="button" onClick={() => handleDelete(student.id)}>
                  delete
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </List>
    </>
  );
}

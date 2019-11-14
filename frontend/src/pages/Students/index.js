import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { MdAdd, MdSearch } from 'react-icons/md';
import { Link } from 'react-router-dom';

import history from '~/services/history';
import api from '~/services/api';
import { Button } from '~/components/Button';

import { Top, List } from './styles';

export default function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('students');

      setStudents(response.data);
    }

    loadStudents();
  }, [students]);

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
          api.delete(`students/${id}`);
          toast.success('Student successfully deleted');
        }
      });
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
            <button type="button">
              <MdSearch size={24} color="#999" />
            </button>
            <input
              name="search"
              placeholder="Search student"
              autoComplete="off"
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
          <tbody>
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

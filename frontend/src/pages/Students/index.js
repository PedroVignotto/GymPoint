import React, { useState, useEffect } from 'react';
import { MdAdd, MdSearch, MdDone } from 'react-icons/md';
import api from '~/services/api';

import { MainButton } from '~/components/Button';

import { Top, List } from './styles';

export default function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('students');

      setStudents(response.data);
    }

    loadStudents();
  }, []);

  return (
    <>
      <Top>
        <strong>Managing students</strong>
        <div>
          <MainButton type="button" Icon={MdAdd} iconColor="#fff">
            Register
          </MainButton>
          <span>
            <button type="button">
              <MdSearch size={24} color="#999" />
            </button>
            <input name="search" placeholder="Search student" />
          </span>
        </div>
      </Top>

      <List>
        <thead>
          <tr>
            <th>Name</th>
            <th>e-mail</th>
            <th>age</th>
            <th>active enrollment</th>
          </tr>
        </thead>
        {students.map(student => (
          <tbody>
            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>{student.age}</td>
            <td>
              <span>
                <MdDone size={16} color="#fff" />
              </span>
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

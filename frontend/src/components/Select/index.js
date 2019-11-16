import React, { useRef, useEffect, useState, useMemo } from 'react';
import Select from 'react-select';

import { useField } from '@rocketseat/unform';

import api from '~/services/api';

export default function ReactSelect({ name, label, setChange }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [options, setOptions] = useState();

  function parseSelectValue(selectRef) {
    const selectedValue = selectRef.state.value;
    return selectedValue;
  }

  useMemo(() => {
    if (name === 'plan') {
      // eslint-disable-next-line no-inner-declarations
      async function loadPlans() {
        const response = await api.get('plans');
        const plans = response.data.map(plan => ({
          label: plan.title,
          value: plan.id,
          duration: plan.duration,
          price: plan.price,
        }));
        setOptions(plans);
      }
      loadPlans();
    } else {
      // eslint-disable-next-line no-inner-declarations
      async function loadStudents() {
        const response = await api.get('students');
        const students = response.data.map(student => ({
          label: student.name,
          value: student.id,
        }));
        setOptions(students);
      }
      loadStudents();
    }
  }, [name]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'state.value',
      parseValue: parseSelectValue,
      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  function handleOnChangePlan(plan) {
    setChange(plan);
  }

  function handleOnChangeStudent(student) {
    if (setChange) {
      setChange(student);
    }
  }

  return (
    <>
      <Select
        name={fieldName}
        aria-label={fieldName}
        defaultValue={defaultValue}
        label={label}
        options={options}
        placeholder={name === 'plan' ? 'Select plan' : 'Search student'}
        onChange={
          name === 'plan'
            ? plan => handleOnChangePlan(plan)
            : student => handleOnChangeStudent(student)
        }
        ref={ref}
      />

      {error && <span>{error}</span>}
    </>
  );
}

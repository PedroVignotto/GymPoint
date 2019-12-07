import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';

import 'react-datepicker/dist/react-datepicker.css';

import { Picker, Label } from './styles';

export default function DatePicker({
  name,
  label,
  setChange,
  getChange,
  ...rest
}) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

  const renderLabel = label || name;

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  useEffect(() => {
    setSelected(getChange);
  }, [getChange]);

  function handleOnChange(date) {
    setSelected(date);
    setChange(date);
  }

  return (
    <Label htmlFor={fieldName}>
      {error && <span>{error}</span>}
      <Picker
        name={fieldName}
        selected={selected}
        autoComplete="off"
        onChange={date => handleOnChange(date)}
        ref={ref}
        {...rest}
      />
      <strong>{renderLabel}</strong>
    </Label>
  );
}

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  getChange: PropTypes.objectOf(PropTypes.string),
  setChange: PropTypes.func,
};

DatePicker.defaultProps = {
  setChange: PropTypes.null,
  getChange: PropTypes.null,
};

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

export default function NewTaskForm({ addTask = () => {} }) {
  const [stateObj, setStateObj] = useState({
    label: '',
    Min: '',
    Sec: '',
  });

  const changeInput = e => {
    setStateObj(stateObj => {
      return {
        ...stateObj,
        label: e.target.value,
      };
    });
  };
  const changeInputTimer = e => {
    setStateObj(stateObj => {
      return {
        ...stateObj,
        [e.target.placeholder]: e.target.value,
      };
    });
  };

  const submitForm = e => {
    e.preventDefault();
    if (
      stateObj.label !== '' &&
      stateObj.Min !== '' &&
      stateObj.Sec !== '' &&
      /^[0-9]*$/.test(stateObj.Min) &&
      /^[0-9]*$/.test(stateObj.Sec)
    ) {
      addTask(stateObj.label, stateObj.Min, stateObj.Sec);
    } else {
      alert(Error('Incorrect data entered'));
    }
    setStateObj({
      label: '',
      Min: '',
      Sec: '',
    });
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={submitForm}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={changeInput}
          value={stateObj.label}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          autoFocus
          onChange={changeInputTimer}
          value={stateObj.Min}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          autoFocus
          onChange={changeInputTimer}
          value={stateObj.Sec}
        />
        <button type="submit"></button>
      </form>
    </header>
  );
}

NewTaskForm.propTypes = {
  addTask: PropTypes.func,
};

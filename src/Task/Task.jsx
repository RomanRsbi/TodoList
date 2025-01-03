import React, { useState, useEffect } from 'react';
import { formatDistance } from 'date-fns';
import PropTypes from 'prop-types';

import Timer from '../Timer/Timer';
import './Task.css';

export default function Task({
  label,
  className,
  completed,
  id,
  createTime,
  min,
  sec,
  checkCompleted = () => {},
  deleteTask = () => {},
  editTask = () => {},
  editAdd = () => {},
}) {
  const [timeObj, setTimeObj] = useState({
    label: label,
    min: Number(min),
    sec: Number(sec),
    countTimer: Number(sec) + Number(min) * 60,
  });
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setTimeObj(timeObj => {
      return {
        ...timeObj,
        countTime: Number(sec) + Number(min) * 60,
      };
    });
  }, [min, sec]);

  useEffect(() => {
    const timeout = setInterval(() => {
      setDate(new Date());
    }, 5000);
    return () => clearInterval(timeout);
  });

  function nullFirst(t) {
    if (t.toString().length === 1) return '0' + t;
    return t.toString();
  }

  const clickOnPen = () => {
    editTask();
    setTimeObj(timeObj => {
      return {
        ...timeObj,
        min: nullFirst(Math.trunc((Number(timeObj.sec) + Number(timeObj.min) * 60) / 60)),
        sec: nullFirst((Number(timeObj.sec) + Number(timeObj.min) * 60) % 60),
      };
    });
  };

  const changeInput = e => {
    setTimeObj(timeObj => {
      return {
        ...timeObj,
        [e.target.id]: e.target.value,
      };
    });
  };

  const editSubmit = event => {
    event.preventDefault();
    if (
      timeObj.label !== '' &&
      timeObj.min !== '' &&
      timeObj.sec !== '' &&
      /^[0-9]*$/.test(timeObj.min) &&
      /^[0-9]*$/.test(timeObj.sec)
    ) {
      editAdd(timeObj.label, timeObj.min, timeObj.sec);
    } else {
      alert(Error('Incorrect data entered'));
    }
  };

  let classNames = className;

  if (completed === true && classNames == null) {
    classNames = 'completed';
  }
  if (completed === true && className != null) {
    classNames += ' completed';
  }

  return (
    <li className={classNames}>
      <div className="view">
        <input className="toggle" type="checkbox" onClick={() => checkCompleted(id)} />
        <label>
          <span className="title">{label}</span>
          <Timer min={min} sec={sec} />
          <span className="description">
            create{' '}
            {formatDistance(createTime, date, {
              includeSeconds: true,
              addSuffix: true,
            })}
          </span>
        </label>
        <button className="icon icon-edit" onClick={clickOnPen}></button>
        <button className="icon icon-destroy" onClick={deleteTask}></button>
      </div>
      <form className="new-todo-form" onSubmit={editSubmit}>
        <input id="label" type="text" className="edit" defaultValue={label} onChange={changeInput} />
        <input id="min" type="text" className="edit edit-input-timer" value={timeObj.min} onChange={changeInput} />
        <input id="sec" type="text" className="edit edit-input-timer" value={timeObj.sec} onChange={changeInput} />
        <button type="submit"></button>
      </form>
    </li>
  );
}

Task.propTypes = {
  checkCompleted: PropTypes.func,
  deleteTask: PropTypes.func,
  editTask: PropTypes.func,
  editAdd: PropTypes.func,
};

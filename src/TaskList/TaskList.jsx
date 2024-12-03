import React from 'react';
import PropTypes from 'prop-types';

import Task from '../Task/Task';
import './TaskList.css';

export default function TaskList({
  todoData = [],
  checkCompleted = () => {},
  deleteTask = () => {},
  editTask = () => {},
  editAdd = () => {},
}) {
  const el = todoData.map(item => (
    <Task
      {...item}
      key={item.id}
      checkCompleted={checkCompleted}
      deleteTask={() => deleteTask(item.id)}
      editTask={() => editTask(item.id)}
      editAdd={text => editAdd(text, item.id)}
    />
  ));

  return <ul className="todo-list">{el}</ul>;
}

Task.propTypes = {
  checkCompleted: PropTypes.func,
  deleteTask: PropTypes.func,
  editTask: PropTypes.func,
  editAdd: PropTypes.func,
  todoData: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      completed: PropTypes.bool,
      id: PropTypes.number,
      createTime: PropTypes.instanceOf(Date),
    })
  ),
};

import React, { useState } from 'react';

import NewTaskForm from './NewTaskForm/NewTaskForm';
import TaskList from './TaskList/TaskList';
import Footer from './Footer/Footer';
import './app.css';

export default function App() {
  const [todoData, setTodoData] = useState([]);
  const [countId, setCountId] = useState(10);
  const [buttonType, setButtonType] = useState('All');

  const filterTask = (text = 'All') => {
    const newArr = todoData.map(el => {
      if (text === 'Active') {
        if (el.completed === true) {
          el.className = 'hidden';
          return el;
        }
        el.className = null;
        return el;
      }
      if (text === 'Completed') {
        if (el.completed === false) {
          el.className = 'hidden';
          return el;
        }
        el.className = null;
        return el;
      }
      el.className = null;
      return el;
    });
    setTodoData(newArr);
  };

  const checkBtnType = text => {
    filterTask(text);
    setButtonType(text);
  };

  function createTask(label, min, sec) {
    setCountId(countId => {
      return countId + 1;
    });
    return {
      label,
      className: null,
      completed: false,
      id: countId,
      createTime: new Date(),
      min,
      sec,
    };
  }

  const checkCompleted = id => {
    const indx = todoData.findIndex(el => el.id === id);
    const newArr = todoData.toSpliced(indx, 1, {
      ...todoData[indx],
      completed: !todoData[indx].completed,
    });
    setTodoData(newArr);
  };

  const deleteTask = id => {
    const newArr = todoData.filter(el => el.id !== id);
    setTodoData(newArr);
  };

  const addTask = (label, min, sec) => {
    setTodoData(todoData => {
      const newEl = createTask(label, min, sec);
      const newArr = [...todoData, newEl];
      return newArr;
    });
  };

  const deleteAll = () => {
    const newArr = todoData.filter(el => el.completed === false);
    setTodoData(newArr);
  };

  const editTask = id => {
    const indx = todoData.findIndex(el => el.id === id);
    const newArr = todoData.toSpliced(indx, 1, { ...todoData[indx], className: 'editing' });
    setTodoData(newArr);
  };

  const editAdd = (text, min, sec, id) => {
    setTodoData(todoData => {
      const indx = todoData.findIndex(el => el.id === id);
      const newArr = todoData.toSpliced(indx, 1, {
        ...todoData[indx],
        className: null,
        label: text,
        min: min,
        sec: sec,
      });
      return newArr;
    });
  };

  const activeCount = todoData.filter(el => el.completed === false).length;

  return (
    <section className="todoapp">
      <NewTaskForm addTask={addTask} />
      <section className="main">
        <TaskList
          todoData={todoData}
          checkCompleted={checkCompleted}
          deleteTask={deleteTask}
          editTask={editTask}
          editAdd={editAdd}
        />
        <Footer buttonType={buttonType} checkBtnType={checkBtnType} deleteAll={deleteAll} activeCount={activeCount} />
      </section>
    </section>
  );
}

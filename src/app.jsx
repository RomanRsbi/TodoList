import React, { Component } from 'react';

import NewTaskForm from './NewTaskForm/NewTaskForm';
import TaskList from './TaskList/TaskList';
import Footer from './Footer/Footer';
import './app.css';

export default class App extends Component {
  countId = 10;

  state = {
    todoData: [],
    buttonType: 'All',
  };

  filterTask = (text = 'All') => {
    this.setState(({ todoData }) => {
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
      return {
        todoData: newArr,
      };
    });
  };

  checkBtnType = text => {
    this.filterTask(text);
    this.setState(() => ({
      buttonType: text,
    }));
  };

  createTask(label, min, sec) {
    return {
      label,
      className: null,
      completed: false,
      id: this.countId++,
      createTime: new Date(),
      min,
      sec,
    };
  }

  checkCompleted = id => {
    this.setState(({ todoData }) => {
      const indx = todoData.findIndex(el => el.id === id);
      const newArr = todoData.toSpliced(indx, 1, {
        ...todoData[indx],
        completed: !todoData[indx].completed,
      });
      return {
        todoData: newArr,
      };
    });
  };

  deleteTask = id => {
    this.setState(({ todoData }) => {
      const newArr = todoData.filter(el => el.id !== id);
      return {
        todoData: newArr,
      };
    });
  };

  addTask = (label, min, sec) => {
    this.setState(({ todoData }) => {
      const newEl = this.createTask(label, min, sec);
      const newArr = [...todoData, newEl];
      return {
        todoData: newArr,
      };
    });
  };

  deleteAll = () => {
    this.setState(({ todoData }) => {
      const newArr = todoData.filter(el => el.completed === false);
      return {
        todoData: newArr,
      };
    });
  };

  editTask = id => {
    this.setState(({ todoData }) => {
      const indx = todoData.findIndex(el => el.id === id);
      const newArr = todoData.toSpliced(indx, 1, { ...todoData[indx], className: 'editing' });
      return {
        todoData: newArr,
      };
    });
  };

  editAdd = (text, id) => {
    this.setState(({ todoData }) => {
      const indx = todoData.findIndex(el => el.id === id);
      const newArr = todoData.toSpliced(indx, 1, { ...todoData[indx], className: null, label: text });
      return {
        todoData: newArr,
      };
    });
  };

  render() {
    const activeCount = this.state.todoData.filter(el => el.completed === false).length;

    return (
      <section className="todoapp">
        <NewTaskForm addTask={this.addTask} />
        <section className="main">
          <TaskList
            todoData={this.state.todoData}
            checkCompleted={this.checkCompleted}
            deleteTask={this.deleteTask}
            editTask={this.editTask}
            editAdd={this.editAdd}
          />
          <Footer
            buttonType={this.state.buttonType}
            checkBtnType={this.checkBtnType}
            deleteAll={this.deleteAll}
            activeCount={activeCount}
          />
        </section>
      </section>
    );
  }
}

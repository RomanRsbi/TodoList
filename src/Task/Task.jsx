import React, { Component } from 'react';
import { formatDistance } from 'date-fns';
import PropTypes from 'prop-types';

import Timer from '../Timer/Timer';
import './Task.css';

export default class Task extends Component {
  state = {
    label: this.props.label,
    min: Number(this.props.min),
    sec: Number(this.props.sec),
    countTime: Number(this.props.sec) + Number(this.props.min) * 60,
    date: new Date(),
  };

  static defaultProps = {
    checkCompleted: () => {},
    deleteTask: () => {},
    editTask: () => {},
    editAdd: () => {},
    clickOnEscape: () => {},
  };

  static propTypes = {
    checkCompleted: PropTypes.func,
    deleteTask: PropTypes.func,
    editTask: PropTypes.func,
    editAdd: PropTypes.func,
  };

  nullFirst(t) {
    if (t.toString().length === 1) return '0' + t;
    return t.toString();
  }

  toTime(sec) {
    return this.nullFirst(Math.trunc(sec / 60)) + ':' + this.nullFirst(sec % 60);
  }

  clickOnPen = () => {
    this.props.editTask();
    this.setState(({ min, sec }) => {
      return {
        min: this.nullFirst(Math.trunc((Number(sec) + Number(min) * 60) / 60)),
        sec: this.nullFirst((Number(sec) + Number(min) * 60) % 60),
      };
    });
  };

  changeInput = e => {
    this.setState(() => {
      return { [e.target.id]: e.target.value };
    });
  };

  editSubmit = event => {
    event.preventDefault();
    if (
      this.state.label !== '' &&
      this.state.min !== '' &&
      this.state.sec !== '' &&
      /^[0-9]*$/.test(this.state.min) &&
      /^[0-9]*$/.test(this.state.sec)
    ) {
      this.props.editAdd(this.state.label, this.state.min, this.state.sec);
    } else {
      alert(Error('Incorrect data entered'));
    }
  };

  timeInterval = setInterval(() => {
    this.setState(() => ({
      date: new Date(),
    }));
  }, 5000);

  componentDidUpdate(prevProps) {
    if (prevProps.min !== this.props.min || prevProps.sec !== this.props.sec) {
      this.setState({
        countTime: Number(this.props.sec) + Number(this.props.min) * 60,
      });
    }
  }

  render() {
    const { label, className, completed, id, createTime, deleteTask, checkCompleted, min, sec } = this.props;

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
              {formatDistance(createTime, this.state.date, {
                includeSeconds: true,
                addSuffix: true,
              })}
            </span>
          </label>
          <button className="icon icon-edit" onClick={this.clickOnPen}></button>
          <button className="icon icon-destroy" onClick={deleteTask}></button>
        </div>
        <form className="new-todo-form" onSubmit={this.editSubmit}>
          <input id="label" type="text" className="edit" defaultValue={label} onChange={this.changeInput} />
          <input
            id="min"
            type="text"
            className="edit edit-input-timer"
            value={this.state.min}
            onChange={this.changeInput}
          />
          <input
            id="sec"
            type="text"
            className="edit edit-input-timer"
            value={this.state.sec}
            onChange={this.changeInput}
          />
          <button type="submit"></button>
        </form>
      </li>
    );
  }
}

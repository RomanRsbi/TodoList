import React, { Component } from 'react';
import { formatDistance } from 'date-fns';
import PropTypes from 'prop-types';

import './Task.css';

export default class Task extends Component {
  state = {
    label: '',
    date: new Date(),
  };

  static defaultProps = {
    checkCompleted: () => {},
    deleteTask: () => {},
    editTask: () => {},
    editAdd: () => {},
  };

  static propTypes = {
    checkCompleted: PropTypes.func,
    deleteTask: PropTypes.func,
    editTask: PropTypes.func,
    editAdd: PropTypes.func,
  };

  changeInput = e => {
    this.setState({
      label: e.target.value,
    });
  };

  editSubmit = event => {
    if (event.key === 'Enter') {
      if (this.state.label !== '') {
        this.props.editAdd(this.state.label);
      }
    }
  };

  timeInterval = setInterval(() => {
    this.setState(() => ({
      date: new Date(),
    }));
  }, 5000);

  render() {
    const { label, className, completed, id, createTime, deleteTask, checkCompleted, editTask } = this.props;

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
            <span className="description">{label}</span>
            <span className="created">
              create{' '}
              {formatDistance(createTime, this.state.date, {
                includeSeconds: true,
                addSuffix: true,
              })}
            </span>
          </label>
          <button className="icon icon-edit" onClick={editTask}></button>
          <button className="icon icon-destroy" onClick={deleteTask}></button>
        </div>
        <input
          type="text"
          className="edit"
          defaultValue={label}
          onKeyDown={this.editSubmit}
          onChange={this.changeInput}
        />
      </li>
    );
  }
}

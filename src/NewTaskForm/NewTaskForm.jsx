import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  addTask = this.props.addTask;

  state = {
    label: '',
    Min: '',
    Sec: '',
  };

  static defaultProps = {
    addTask: () => {},
  };

  static propTypes = {
    addTask: PropTypes.func,
  };

  changeInput = e => {
    this.setState({
      label: e.target.value,
    });
  };
  changeInputTimer = e => {
    this.setState({
      [e.target.placeholder]: e.target.value,
    });
  };

  submitForm = e => {
    e.preventDefault();
    if (
      this.state.label !== '' &&
      this.state.Min !== '' &&
      this.state.Sec !== '' &&
      /^[0-9]*$/.test(this.state.Min) &&
      /^[0-9]*$/.test(this.state.Sec)
    ) {
      this.addTask(this.state.label, this.state.Min, this.state.Sec);
    } else {
      alert(Error('Incorrect data entered'));
    }
    this.setState(() => {
      return {
        label: '',
        Min: '',
        Sec: '',
      };
    });
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.submitForm}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            onChange={this.changeInput}
            value={this.state.label}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            autoFocus
            onChange={this.changeInputTimer}
            value={this.state.Min}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            autoFocus
            onChange={this.changeInputTimer}
            value={this.state.Sec}
          />
          <button type="submit"></button>
        </form>
      </header>
    );
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  addTask = this.props.addTask;

  state = {
    label: '',
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

  submitForm = e => {
    e.preventDefault();
    if (this.state.label !== '') {
      this.addTask(this.state.label);
    }
    this.setState(() => {
      return {
        label: '',
      };
    });
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.submitForm}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            onChange={this.changeInput}
            value={this.state.label}
          />
        </form>
      </header>
    );
  }
}

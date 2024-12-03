import React from 'react';
import PropTypes from 'prop-types';

import TaskFilter from '../TaskFilter/TaskFilter';
import './Footer.css';

export default function Footer({ buttonType = 'All', checkBtnType = () => {}, deleteAll = () => {}, activeCount = 0 }) {
  let countInfo = '';
  if (activeCount === 0) {
    countInfo += 'no active task';
  }
  if (activeCount !== 0) {
    countInfo += `${activeCount} items left`;
  }
  return (
    <footer className="footer">
      <span className="todo-count">{countInfo}</span>
      <TaskFilter buttonType={buttonType} checkBtnType={checkBtnType} />
      <button className="clear-completed" onClick={deleteAll}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.protoTypes = {
  buttonType: PropTypes.string,
  checkBtnType: PropTypes.func,
  deleteAll: PropTypes.func,
  activeCount: PropTypes.number,
};

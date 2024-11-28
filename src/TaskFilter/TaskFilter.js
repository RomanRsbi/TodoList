import React from 'react';
import PropTypes from 'prop-types';

import './TaskFilter.css';

export default function TaskFilter({ buttonType = 'All', checkBtnType = () => {} }) {
  return (
    <ul className="filters">
      <li>
        <button className={buttonType === 'All' ? 'selected' : null} onClick={e => checkBtnType(e.target.textContent)}>
          All
        </button>
      </li>
      <li>
        <button
          className={buttonType === 'Active' ? 'selected' : null}
          onClick={e => checkBtnType(e.target.textContent)}
        >
          Active
        </button>
      </li>
      <li>
        <button
          className={buttonType === 'Completed' ? 'selected' : null}
          onClick={e => checkBtnType(e.target.textContent)}
        >
          Completed
        </button>
      </li>
    </ul>
  );
}

TaskFilter.propTypes = {
  buttonType: PropTypes.string,
  checkBtnType: PropTypes.func,
};

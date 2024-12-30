import React from 'react';
import PropTypes from 'prop-types';

import './TaskFilter.css';

export default function TaskFilter({ buttonType = 'All', checkBtnType = () => {} }) {
  const nameArr = ['All', 'Active', 'Completed'];
  const renderElement = nameArr.map((el, index) => (
    <li key={index}>
      <button className={buttonType == { el } ? 'selected' : null} onClick={e => checkBtnType(e.target.textContent)}>
        {el}
      </button>
    </li>
  ));
  return <ul className="filters">{renderElement}</ul>;
}

TaskFilter.propTypes = {
  buttonType: PropTypes.string,
  checkBtnType: PropTypes.func,
};

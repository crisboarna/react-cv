// @flow
import React from 'react';
import PropTypes from 'prop-types';

type Props = {
  title : string,
  list: Array<Object>
};

const renderInterest = function renderInterest(item : Object) {
  return (
    <li key={`${item.name}`}>
      <span className="lang-desc">{`· ${item.name}: `}</span>
      <span>  {item.description}</span>
    </li>
  );
};

const Interests = ({ title, list } : Props) => (
  <div className="languages-container container-block">
    <h2 className="container-block-title">
      <i className="fas fa-exclamation" />
      {' '}
      {title}
    </h2>
    <ul className="list-unstyled interests-list">
      {list && list.constructor === Array ? list.map(item => renderInterest(item)) : null }
    </ul>
  </div>
);

export default Interests;

Interests.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
};


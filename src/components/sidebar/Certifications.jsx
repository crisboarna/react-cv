// @flow
import React from 'react';
import PropTypes from 'prop-types';

type Props = {
  title ?: string,
  list ?: Array<Object>
};

const renderCertification = function renderCertification(item : Object) {
  return (
    <li key={item.name}>
      {item.name}
      <div className="time">· {item.description}</div>
    </li>
  );
};

const Certifications = ({ list, title } : Props) => (
  <div className="certification-container container-block">
    <h2 className="container-block-title">
      <i className="fas fa-book" />
      {' '}
      {title}
    </h2>
    <ul className="list-unstyled interests-list">
      {list && list.constructor === Array ? list.map(item => renderCertification(item)) : null }
    </ul>
  </div>
);

export default Certifications;


Certifications.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  title: PropTypes.string.isRequired
};

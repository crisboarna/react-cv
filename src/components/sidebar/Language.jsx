// @flow
import React from 'react';
import PropTypes from 'prop-types';

type Props = {
  title ?: string,
  list ?: Object
};

const renderLanguage = function renderLanguage(item : Object, i : number) {
  return (
    <li key={`language_item_${i}`}>
      {item.name}
      <span className="lang-desc">  ({item.level})</span>
    </li>
  );
};

const Language = ({ title, list } : Props) => (
  <div className="languages-container container-block">
    <h2 className="container-block-title" key="lang_header">
      <i className="far fa-comment" />
      {' '}
      {title}
    </h2>
    <ul className="list-unstyled interests-list" key="lang_list">
      {list && list.constructor === Array ? list.map((item, i) => renderLanguage(item, i)) : null }
    </ul>
  </div>
);

export default Language;

Language.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  title: PropTypes.string.isRequired,
};


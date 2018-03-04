// @flow
import React from 'react';
import PropTypes from 'prop-types';

type Props = {
  title ?: string,
  list ?: {[string] : Array<string>}
};

const getKeyUpercase = function getKeyUpercase(string : string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const renderSkills = function renderLanguage(key : string, entry : any) {
  return (
    <li key={`${key}`}>
      <span className="lang-desc">{`· ${getKeyUpercase(key)}: `}</span>
      <span >  {entry.join(', ')}</span>
    </li>
  );
};

const Skills = ({title, list} : Props) => {
  return (
    <div className="skills-container container-block">
      <h2 className="container-block-title" key="lang_header">
        <i className='fas fa-code' />
        {' '}
        {title}
      </h2>
      <ul className="list-unstyled skills-list" key="lang_list">
        {list && list.constructor === Object ? Object.entries(list).map(([key, entry]) => renderSkills(key, entry)) : null }
      </ul>
    </div>
  );
};

export default Skills;

Skills.propTypes = {
  list: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
};


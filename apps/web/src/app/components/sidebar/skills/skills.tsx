import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SkillsProps } from './index';
import './skills.css';

const getKeyUpercase = function getKeyUpercase(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderSkills = function renderLanguage(key: string, entry: any) {
  return (
    <li key={`${key}`}>
      <span
        className="lang-desc"
        data-testid={'skills/item-key'}
      >{`· ${getKeyUpercase(key)}: `}</span>
      <span className={'lang-desc-details'} data-testid={'skills/item-entry'}>
        {entry.join(', ')}
      </span>
    </li>
  );
};

const Skills: FC<SkillsProps> = ({ title, list }) => (
  <div
    className="skills-container container-block"
    data-testid={'skills/container'}
  >
    <h2
      className="container-block-title"
      key="lang_header"
      data-testid={'skills/title'}
    >
      <FontAwesomeIcon
        icon={['fas', 'code']}
        className={'icon'}
        data-testid={'skills/icon'}
      />{' '}
      {title}
    </h2>
    <ul className="list-unstyled skills-list" key="lang_list">
      {list && list.constructor === Object
        ? Object.entries(list).map(([key, entry]) => renderSkills(key, entry))
        : null}
    </ul>
  </div>
);

export default Skills;

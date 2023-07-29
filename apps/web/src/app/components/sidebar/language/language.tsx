import React, { FC } from 'react';
import { LanguageProps, LanguageItem } from './index';
import './language.css';

const renderLanguage = function renderLanguage(item: LanguageItem, i: number) {
  return (
    <li key={`language_item_${i}`} data-testid={'language/item-name'}>
      {item.name}
      <span className="lang-desc" data-testid={'language/item-level'}>
        {' '}
        ({item.level})
      </span>
    </li>
  );
};

const Language: FC<LanguageProps> = ({ title, list }) => (
  <div
    className="languages-container container-block"
    data-testid={'language/container'}
  >
    {
      /*// puppeteer does not take into account padding by itself when on next page*/
      Array.from(Array(8)).map(() => (
        <br />
      ))
    }
    <h2 className="container-block-title" key="lang_header">
      <i className="far fa-comment" data-testid={'language/icon'} /> {title}
    </h2>
    <ul className="list-unstyled interests-list" key="lang_list">
      {list && list.constructor === Array
        ? list.map((item, i) => renderLanguage(item, i))
        : null}
    </ul>
  </div>
);

export default Language;

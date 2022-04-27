import React, { FC } from 'react';
import { InterestProps, InterestItem } from './index';
import './interests.css';

const renderInterest = function renderInterest(item: InterestItem) {
  return (
    <li key={`${item.name}`}>
      <span data-testid={'interests/item'}>{`· ${item.name}: `}</span>
      <span className="interest-desc" data-testid={'interests/item-desc'}>
        {' '}
        {item.description}
      </span>
    </li>
  );
};

const Interests: FC<InterestProps> = ({ title, list }) => (
  <div
    className="interests-container container-block"
    data-testid={'interests/container'}
  >
    {
      /*// puppeteer does not take into account padding by itself when on next page*/
      Array.from(Array(18)).map(() => (
        <br />
      ))
    }
    <h2 className="container-block-title">
      <i className="fas fa-exclamation" data-testid={'interests/icon'} />{' '}
      {title}
    </h2>
    <ul className="list-unstyled interests-list">
      {list && list.constructor === Array
        ? list.map((item) => renderInterest(item))
        : null}
    </ul>
  </div>
);

export default Interests;

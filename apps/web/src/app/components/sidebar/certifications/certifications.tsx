import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types';
import './certifications.css';
import { CertificationProps, CertificationItem } from './index';

const renderCertification = function renderCertification(
  item: CertificationItem
) {
  const iconElements: [IconPrefix, IconName] = item.icon.split(' ') as never;

  return (
    <li key={item.name} data-testid={'certifications/item'}>
      <FontAwesomeIcon icon={iconElements} className={'certification-icon'} />
      {item.name}
      <div className="time" data-testid={'certifications/item-description'}>
        · {item.description}
      </div>
    </li>
  );
};

const Certifications: FC<CertificationProps> = ({ list, title }) => (
  <div
    className="certification-container container-block"
    data-testid={'certifications/container'}
  >
    <h2 className="container-block-title" data-testid={'certifications/title'}>
      <FontAwesomeIcon
        icon={['fas', 'book']}
        data-testid={'certifications/icon'}
      />{' '}
      {title}
    </h2>
    <ul className="list-unstyled interests-list">
      {list && list.constructor === Array
        ? list.map((item) => renderCertification(item))
        : null}
    </ul>
  </div>
);

export default Certifications;

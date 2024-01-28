import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types';
import { ContactProps } from './index';
import './contact.css';

const renderContactAnchors = function renderContactAnchors(
  href: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  entry: any
) {
  return (
    <a
      data-testid={'contact/item-icon-anchor'}
      className={'contactAnchor'}
      href={
        ['mailto', 'tel'].some((entry) => href.includes(entry))
          ? href
          : `//${href}`
      }
      target="_blank"
      rel="noreferrer"
    >
      {entry.value}
    </a>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderContactInfo = function renderContactInfo(key: string, entry: any) {
  if (key !== 'children' && entry.constructor === Object) {
    let href;
    switch (key) {
      case 'email':
        href = `mailto:${entry.value}`;
        break;
      case 'phone':
        href = `tel:${entry.value}`;
        break;
      default:
        href = entry.value;
    }

    const iconElements: [IconPrefix, IconName] = entry.icon.split(' ') as never;

    return (
      <li key={key} data-testid={'contact/item'}>
        <FontAwesomeIcon
          icon={iconElements}
          className={'sidebar-contact-icons'}
          data-testid={'contact/item-icon'}
        />
        {renderContactAnchors(href, entry)}
      </li>
    );
  }
  return null;
};

const Contact: FC<ContactProps> = (props) => (
  <div
    className="contact-container container-block"
    data-testid={'contact/container'}
  >
    <ul className="list-unstyled contact-list">
      {Object.entries(props).map(([key, entry]) =>
        renderContactInfo(key, entry)
      )}
    </ul>
  </div>
);

export default Contact;

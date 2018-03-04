// @flow
import React from 'react';
import PropTypes from 'prop-types';

type Props = {
  email ?: Object,
  phone ?: Object,
  website ?: Object,
  linkedin ?: Object,
  github ?: Object,
  npm ?: Object
}

const renderContactInfo = function renderContactInfo(key : string, entry : any) {
  if(key !== 'children' && entry.constructor === Object) {
    let href;
    switch (key) {
      case 'email':
        href = `mailto: ${entry.value}`;
        break;
      case 'phone':
        href = `tel:${entry.value}`;
        break;
      default:
        href = entry.value;
    }

    return (
      <li key={key}>
        <i className={entry.icon}/>
        <a href={`//${href}`} target="_blank"> {entry.value} </a>
      </li>
    );
  } else {
    return null;
  }
};

const Contact = (props : Props) => {
  return (
    <div className="contact-container container-block">
    <ul className="list-unstyled contact-list">
      {Object.entries(props).map(([key, entry]) => renderContactInfo(key, entry))}
    </ul>
  </div>
  );
};

export default Contact;

Contact.propTypes = {
  email: PropTypes.object,
  phone: PropTypes.object,
  website: PropTypes.object,
  linkedin: PropTypes.object,
  github: PropTypes.object,
  npm: PropTypes.object
};
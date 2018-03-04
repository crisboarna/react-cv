// @flow
/* eslint react/no-unused-prop-types: "off" */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

type Props = {
  email ?: Object,
  phone ?: Object,
  website ?: Object,
  linkedin ?: Object,
  github ?: Object,
  npm ?: Object,
  anchorVisible : number
}

const renderContactAnchors = function renderContactAnchors(visible, href, entry) {
  if (visible) {
    return (
      <a className="contactAnchor" href={`//${href}`} target="_blank">
        {entry.value}
      </a>
    );
  }
  return (
    entry.value
  );
};

const renderContactInfo = function renderContactInfo(key : string, entry : any, anchorVisible : number) {
  if (key !== 'children' && entry.constructor === Object) {
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
        <i className={entry.icon} />
        {renderContactAnchors(anchorVisible, href, entry)}
      </li>
    );
  }
  return null;
};

const Contact = (props : Props) => (
  <div className="contact-container container-block">
    {props.anchorVisible.toString()}
    <ul className="list-unstyled contact-list">
      {Object.entries(props).map(([key, entry]) => renderContactInfo(key, entry, props.anchorVisible))}
    </ul>
  </div>
);

const mapStateToProps = state => ({
  anchorVisible: state.anchorVisibility.anchorVisible,
});

export default connect(
  mapStateToProps,
  null,
)(Contact);

Contact.propTypes = {
  email: PropTypes.shape,
  phone: PropTypes.shape,
  website: PropTypes.shape,
  linkedin: PropTypes.shape,
  github: PropTypes.shape,
  npm: PropTypes.shape,
  anchorVisible: PropTypes.number,
};

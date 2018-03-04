// @flow
/* eslint react/no-unused-prop-types: "off" */
import React from 'react';
import PropTypes from 'prop-types';
import Name from './Name';
import Contact from './Contact';
import Education from './Education';
import Languages from './Language';
import Interests from './Interests';
import Certifications from './Certifications';
import Skills from './Skills';

type Props = {
  name ?: Object,
  contact ?: Object,
  education ?: Object,
  languages ?: Object,
  interests ?: Object,
  certifications ?: Object,
  skills ?: Object
}

const componentMap = {
  name: Name,
  contact: Contact,
  education: Education,
  languages: Languages,
  interests: Interests,
  certifications: Certifications,
  skills: Skills,
};

const renderSidebarCategory = function renderSidebarCategory(key : string, value : any) {
  if (key !== 'children') {
    const Component = componentMap[key];
    return (
      <div key={key}><Component {...value} /></div>
    );
  }
  return null;
};

const Sidebar = (props : Props) => (
  <div className="sidebar-wrapper">
    {Object.entries(props).map(([key, value]) => renderSidebarCategory(key, value))}
  </div>
);

export default Sidebar;

Sidebar.propTypes = {
  name: PropTypes.shape,
  contact: PropTypes.shape,
  education: PropTypes.shape,
  languages: PropTypes.shape,
  interests: PropTypes.shape,
  certifications: PropTypes.shape,
  skills: PropTypes.shape,
};

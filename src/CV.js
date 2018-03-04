// @flow
import React from 'react';
import PropTypes from 'prop-types';
import Section from './components/Section';
import Sidebar from './components/sidebar';
import Category from './components/Category';

type Props = {
  sidebar ?: Object,
  profile ?: Object,
  projects ?: Object
};

const renderExperience = function renderExperience(props : Object) {
  if (props.experience) {
    return (<Category {...props.experience} />);
  } else {
    return null;
  }
};

const renderProjects = function renderProjects(props : Object) {
  if (props.projects) {
    return (<Category {...props.projects} />);
  } else {
    return null;
  }
};

const renderProfile = function renderProfile(props : Object) {
  if (props.profile) {
    const {title, description, icon} = props.profile;
    return (
      <Section className="summary-section" title={title || 'Profile'} icon={icon || 'user'}>
        <p>{description}</p>
      </Section>
    );
  } else {
    return null;
  }
};

const CV = (props : Props) => {
  return (
      <div className="wrapper a4page" id={'overallPage'}>
        <Sidebar {...props.sidebar}/>
        <div className="main-wrapper">
          {renderProfile(props)}
          {renderExperience(props)}
          <div className={'pageSpacing'}></div>
          {renderProjects(props)}
        </div>
      </div>
  );
};

export default CV;

CV.propTypes = {
  sidebar: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  experience: PropTypes.object.isRequired,
  projects: PropTypes.object.isRequired,
};

import React, { FC } from 'react';
import Section from './section';
import Sidebar from '../sidebar';
import Category from './category';
import { CVProps } from './index';
import './cv.css';

const renderExperience = function renderExperience(props: CVProps) {
  if (props.experience) {
    return <Category {...props.experience} />;
  }
  return null;
};

const renderProjects = function renderProjects(props: CVProps) {
  if (props.projects) {
    return <Category {...props.projects} />;
  }
  return null;
};

const renderProfile = function renderProfile(props: CVProps) {
  if (props.profile) {
    const { title, description, icon } = props.profile;
    return (
      <Section
        data-testid={'cv/profile'}
        title={title || 'Profile'}
        icon={icon || 'user'}
      >
        <p data-testid={'cv/profile-description'}>{description}</p>
      </Section>
    );
  }
  return null;
};

const CV: FC<CVProps> = (props) => (
  <div className="wrapper a4page" id="overallPage" data-testid={'cv/root'}>
    <Sidebar {...props.sidebar} />
    <div className="main-wrapper">
      {renderProfile(props)}
      {renderExperience(props)}
      {renderProjects(props)}
    </div>
  </div>
);

export default CV;

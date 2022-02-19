import React, { FC } from "react";
import Section from "./common/Section";
import Sidebar from "./sidebar/index";
import Category from "./common/Category";

type CVProps = {
  readonly sidebar?: Record<string, any>;
  readonly profile?: Record<string, any>;
  readonly projects?: Record<string, any>;
  readonly experience?: Record<string, any>;
};

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
        data-testid={"cv/profile"}
        className="summary-section"
        title={title || "Profile"}
        icon={icon || "user"}
      >
        <p data-testid={"cv/profile-description"}>{description}</p>
      </Section>
    );
  }
  return null;
};

const CV: FC<CVProps> = (props) => (
  <div className="wrapper a4page" id="overallPage" data-testid={"cv/root"}>
    <Sidebar {...props.sidebar} />
    <div className="main-wrapper">
      {renderProfile(props)}
      {renderExperience(props)}
      {/*<div className="pageSpacing" />*/}
      {renderProjects(props)}
    </div>
  </div>
);

export default CV;

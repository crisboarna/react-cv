import React, { FC } from 'react';
import Name from './name';
import Contact from './contact';
import Education from './education';
import Languages from './language';
import Interests from './interests';
import Certifications from './certifications';
import Skills from './skills';
import { SidebarProps } from './index';
import './sidebar.css';

const componentMap: Record<string, FC<any>> = {
  name: Name,
  contact: Contact,
  education: Education,
  languages: Languages,
  interests: Interests,
  certifications: Certifications,
  skills: Skills,
};

const renderSidebarCategory = function renderSidebarCategory(
  key: string,
  value: any
) {
  if (key !== 'children') {
    const Component = componentMap[key];
    return (
      <div key={key}>
        <Component {...value} />
      </div>
    );
  }
  return null;
};

const Sidebar: FC<SidebarProps> = (props) => (
  <div className="sidebar-wrapper" data-testid={'sidebar/container'}>
    {Object.entries(props).map(([key, value]) =>
      renderSidebarCategory(key, value)
    )}
  </div>
);

export default Sidebar;

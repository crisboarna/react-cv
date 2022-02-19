import React, { FC } from "react";
import Name from "./Name";
import Contact from "./Contact";
import Education from "./Education";
import Languages from "./Language";
import Interests from "./Interests";
import Certifications from "./Certifications";
import Skills from "./Skills";

export type SidebarProps = {
  readonly name?: Record<string, string>;
  readonly contact?: Record<string, string>;
  readonly education?: Record<string, string>;
  readonly languages?: Record<string, string>;
  readonly interests?: Record<string, string>;
  readonly certifications?: Record<string, string>;
  readonly skills?: Record<string, string>;
};

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
  if (key !== "children") {
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
  <div className="sidebar-wrapper" data-testid={"sidebar/container"}>
    {Object.entries(props).map(([key, value]) =>
      renderSidebarCategory(key, value)
    )}
  </div>
);

export default Sidebar;

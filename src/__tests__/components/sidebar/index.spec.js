import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Sidebar from '../../../components/sidebar/index';
import Certifications from "../../../components/sidebar/Certifications";
import Contact from "../../../components/sidebar/Contact";
import Education from "../../../components/sidebar/Education";
import Interests from "../../../components/sidebar/Interests";
import Language from "../../../components/sidebar/Language";
import Name from "../../../components/sidebar/Name";
import Skills from "../../../components/sidebar/Skills";

describe('Sidebar', () => {
  let component;
  const TEST_PROPS = {};

  beforeAll(() => {
    configure({ adapter: new Adapter() });
  });

  it('should render without props', () => {
    component = shallow(<Sidebar/>);
    expect(component.exists()).toEqual(true);
    expect(component.find(Certifications).length).toEqual(0);
    expect(component.find(Contact).length).toEqual(0);
    expect(component.find(Education).length).toEqual(0);
    expect(component.find(Interests).length).toEqual(0);
    expect(component.find(Language).length).toEqual(0);
    expect(component.find(Name).length).toEqual(0);
    expect(component.find(Skills).length).toEqual(0);
  });

  it('should render no sidebar given children', () => {
    component = shallow(<Sidebar>TEST</Sidebar>);
    expect(component.exists()).toEqual(true);
    expect(component.find(Certifications).length).toEqual(0);
    expect(component.find(Contact).length).toEqual(0);
    expect(component.find(Education).length).toEqual(0);
    expect(component.find(Interests).length).toEqual(0);
    expect(component.find(Language).length).toEqual(0);
    expect(component.find(Name).length).toEqual(0);
    expect(component.find(Skills).length).toEqual(0);
  });

  it('should render with certifications', () => {
    component = shallow(<Sidebar certifications={TEST_PROPS}/>);
    expect(component.exists()).toEqual(true);
    expect(component.find(Certifications).length).toEqual(1);
    expect(component.find(Contact).length).toEqual(0);
    expect(component.find(Education).length).toEqual(0);
    expect(component.find(Interests).length).toEqual(0);
    expect(component.find(Language).length).toEqual(0);
    expect(component.find(Name).length).toEqual(0);
    expect(component.find(Skills).length).toEqual(0);
  });

  it('should render with contact', () => {
    component = shallow(<Sidebar contact={TEST_PROPS}/>);
    expect(component.exists()).toEqual(true);
    expect(component.find(Certifications).length).toEqual(0);
    expect(component.find(Contact).length).toEqual(1);
    expect(component.find(Education).length).toEqual(0);
    expect(component.find(Interests).length).toEqual(0);
    expect(component.find(Language).length).toEqual(0);
    expect(component.find(Name).length).toEqual(0);
    expect(component.find(Skills).length).toEqual(0);
  });

  it('should render with education', () => {
    component = shallow(<Sidebar education={TEST_PROPS}/>);
    expect(component.exists()).toEqual(true);
    expect(component.find(Certifications).length).toEqual(0);
    expect(component.find(Contact).length).toEqual(0);
    expect(component.find(Education).length).toEqual(1);
    expect(component.find(Interests).length).toEqual(0);
    expect(component.find(Language).length).toEqual(0);
    expect(component.find(Name).length).toEqual(0);
    expect(component.find(Skills).length).toEqual(0);
  });

  it('should render with interests', () => {
    component = shallow(<Sidebar interests={TEST_PROPS}/>);
    expect(component.exists()).toEqual(true);
    expect(component.find(Certifications).length).toEqual(0);
    expect(component.find(Contact).length).toEqual(0);
    expect(component.find(Education).length).toEqual(0);
    expect(component.find(Interests).length).toEqual(1);
    expect(component.find(Language).length).toEqual(0);
    expect(component.find(Name).length).toEqual(0);
    expect(component.find(Skills).length).toEqual(0);
  });

  it('should render with languages', () => {
    component = shallow(<Sidebar languages={TEST_PROPS}/>);
    expect(component.exists()).toEqual(true);
    expect(component.find(Certifications).length).toEqual(0);
    expect(component.find(Contact).length).toEqual(0);
    expect(component.find(Education).length).toEqual(0);
    expect(component.find(Interests).length).toEqual(0);
    expect(component.find(Language).length).toEqual(1);
    expect(component.find(Name).length).toEqual(0);
    expect(component.find(Skills).length).toEqual(0);
  });

  it('should render with languages', () => {
    component = shallow(<Sidebar name={TEST_PROPS}/>);
    expect(component.exists()).toEqual(true);
    expect(component.find(Certifications).length).toEqual(0);
    expect(component.find(Contact).length).toEqual(0);
    expect(component.find(Education).length).toEqual(0);
    expect(component.find(Interests).length).toEqual(0);
    expect(component.find(Language).length).toEqual(0);
    expect(component.find(Name).length).toEqual(1);
    expect(component.find(Skills).length).toEqual(0);
  });

  it('should render with skills', () => {
    component = shallow(<Sidebar skills={TEST_PROPS}/>);
    expect(component.exists()).toEqual(true);
    expect(component.find(Certifications).length).toEqual(0);
    expect(component.find(Contact).length).toEqual(0);
    expect(component.find(Education).length).toEqual(0);
    expect(component.find(Interests).length).toEqual(0);
    expect(component.find(Language).length).toEqual(0);
    expect(component.find(Name).length).toEqual(0);
    expect(component.find(Skills).length).toEqual(1);
  });

  it('should render with all', () => {
    component = shallow(<Sidebar certifications={TEST_PROPS} contact={TEST_PROPS} education={TEST_PROPS} interests={TEST_PROPS} languages={TEST_PROPS} name={TEST_PROPS} skills={TEST_PROPS}/>);
    expect(component.exists()).toEqual(true);
    expect(component.find(Certifications).length).toEqual(1);
    expect(component.find(Contact).length).toEqual(1);
    expect(component.find(Education).length).toEqual(1);
    expect(component.find(Interests).length).toEqual(1);
    expect(component.find(Language).length).toEqual(1);
    expect(component.find(Name).length).toEqual(1);
    expect(component.find(Skills).length).toEqual(1);
  });
});
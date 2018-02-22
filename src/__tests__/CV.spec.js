import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CV from '../CV';
import Sidebar from "../components/sidebar";
import Category from "../components/Category";
import Section from "../components/Section";


describe('CV', () => {
  let component;
  const TEST_ICON = 'TEST_ICON';
  const TEST_TITLE = 'TEST_TITLE';
  const TEST_DESCRIPTION = 'TEST_DESCRIPTION';
  const experienceProps = { title: TEST_TITLE };
  const emptyProps = {};

  beforeAll(() => {
    configure({ adapter: new Adapter() });
  });

  describe('rendering', () => {
    it('should render without crashing', () => {
      component = shallow(<CV></CV>);
      expect(component.exists()).toEqual(true);
      expect(component.find(Sidebar).length).toEqual(1);
      expect(component.find(Category).length).toEqual(0);
    });

    it('should render given empty props', () => {
      component = shallow(<CV profile={emptyProps} experience={emptyProps} projects={emptyProps} sidebar={emptyProps}></CV>);
      expect(component.exists()).toEqual(true);
      expect(component.find(Sidebar).length).toEqual(1);
      expect(component.find(Category).length).toEqual(2);
      expect(component.find(Section).length).toEqual(1);
    });

    it('should render experience category', () => {
      component = shallow(<CV experience={experienceProps}></CV>);
      expect(component.find(Category).length).toEqual(1);
    });

    describe('profile', () => {
      const allProfileProps = { title: TEST_TITLE, icon: TEST_ICON, description: TEST_DESCRIPTION };

      it('should render default profile', () => {
        component = shallow(<CV profile={emptyProps}/>);
        expect(component.find(Section).length).toEqual(1);
        expect(component.find(Section).prop('title')).toEqual('Profile');
        expect(component.find(Section).prop('icon')).toEqual('user');
        expect(component.contains(TEST_DESCRIPTION)).toEqual(false);
      });

      it('should render with provided title', () => {
        const titleProps = { title: TEST_TITLE};
        component = shallow(<CV profile={titleProps}/>);
        expect(component.find(Section).length).toEqual(1);
        expect(component.find(Section).prop('title')).toEqual(TEST_TITLE);
        expect(component.find(Section).prop('icon')).toEqual('user');
        expect(component.contains(TEST_DESCRIPTION)).toEqual(false);
      });

      it('should render with provided title, icon', () => {
        const titleProps = { title: TEST_TITLE, icon: TEST_ICON};
        component = shallow(<CV profile={titleProps}/>);
        expect(component.find(Section).length).toEqual(1);
        expect(component.find(Section).prop('title')).toEqual(TEST_TITLE);
        expect(component.find(Section).prop('icon')).toEqual(TEST_ICON);
        expect(component.contains(TEST_DESCRIPTION)).toEqual(false);
      });

      it('should render full profile', () => {
        component = shallow(<CV profile={allProfileProps}></CV>);
        expect(component.find(Category).length).toEqual(0);
        expect(component.find(Section).length).toEqual(1);
        expect(component.find(Section).prop('title')).toEqual(TEST_TITLE);
        expect(component.find(Section).prop('icon')).toEqual(TEST_ICON);
        expect(component.contains(TEST_DESCRIPTION)).toEqual(true);
      });
    });
  });
});

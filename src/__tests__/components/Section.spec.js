import React from 'react';
import {configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Section from '../../components/Section';

describe('Section', () => {
  let component;
  const TEST_CLASS = 'TEST_CLASS';
  const TEST_ICON = 'TEST_ICON';
  const TEST_DESCRIPTION = 'TEST_DESCRIPTION';
  const TEST_CHILDREN = 'TEST_CHILDREN';

  beforeAll(() => {
    configure({adapter: new Adapter()});
  });

  describe('rendering', () => {
    it('should render basic empty section', () => {
      component = shallow(<Section />);
      expect(component.exists()).toEqual(true);
      expect(component.find('.section-title').length).toEqual(1);
      expect(component.props().length).toEqual(undefined);
    });

    it('should render with className', () => {
      component = shallow(<Section className={TEST_CLASS}/>);
      expect(component.find('.section-title').length).toEqual(1);
      expect(component.find(`.${TEST_CLASS}`).length).toEqual(1);
      expect(component.find(`.${TEST_ICON}`).length).toEqual(0);
    });

    it('should render with className, icon', () => {
      component = shallow(<Section className={TEST_CLASS} icon={TEST_ICON}/>);
      expect(component.find('.section-title').length).toEqual(1);
      expect(component.find(`.${TEST_CLASS}`).length).toEqual(1);
      expect(component.find(`.fa-${TEST_ICON}`).length).toEqual(1);
    });

    it('should render with className, icon, title', () => {
      component = shallow(<Section className={TEST_CLASS} icon={TEST_ICON} title={TEST_DESCRIPTION}/>);
      expect(component.find('.section-title').length).toEqual(1);
      expect(component.find(`.${TEST_CLASS}`).length).toEqual(1);
      expect(component.find(`.fa-${TEST_ICON}`).length).toEqual(1);
      expect(component.contains(TEST_DESCRIPTION)).toEqual(true);
    });

    it('should render with className, icon, title, children', () => {
      component = shallow(<Section className={TEST_CLASS} icon={TEST_ICON} title={TEST_DESCRIPTION}>TEST_CHILDREN</Section>);
      expect(component.find('.section-title').length).toEqual(1);
      expect(component.find(`.${TEST_CLASS}`).length).toEqual(1);
      expect(component.find(`.fa-${TEST_ICON}`).length).toEqual(1);
      expect(component.contains(TEST_DESCRIPTION)).toEqual(true);
      expect(component.contains(TEST_CHILDREN)).toEqual(true);
    });
  });
});
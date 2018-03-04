import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Skills from '../../../components/sidebar/Skills';

describe('Skills', () => {
  let component;
  const TEST_TITLE = 'TEST_TILE';
  const TEST_SKILL_1 = 'TEST_SKILL_1';
  const TEST_SKILL_2 = 'TEST_SKILL_2';
  const TEST_SKILLS = [TEST_SKILL_1, TEST_SKILL_2];
  const TEST_LIST = { TEST_SKILLS };

  beforeAll(() => {
    configure({ adapter: new Adapter() });
  });

  it('should render without props', () => {
    component = shallow(<Skills />);
    expect(component.exists()).toEqual(true);
    expect(component.find('.lang-desc').length).toEqual(0);
  });

  it('should render with title', () => {
    component = shallow(<Skills title={TEST_TITLE} />);
    expect(component.exists()).toEqual(true);
    expect(component.contains(TEST_TITLE)).toEqual(true);
    expect(component.find('.lang-desc').length).toEqual(0);
  });

  it('should render with title and certifications', () => {
    component = shallow(<Skills list={TEST_LIST} title={TEST_TITLE} />);
    expect(component.exists()).toEqual(true);
    expect(component.contains(TEST_TITLE)).toEqual(true);
    expect(component.contains(`${TEST_SKILL_1}, ${TEST_SKILL_2}`)).toEqual(true);
    expect(component.find('.lang-desc').length).toEqual(1);
  });
});

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Language from '../../../components/sidebar/Language';

describe('Language', () => {
  let component;
  const TEST_TITLE = 'TEST_TILE';
  const TEST_LANGUAGE_NAME = 'TEST_LANGUAGE_NAME';
  const TEST_LANGUAGE_LEVEL = 'TEST_LANGUAGE_LEVEL';
  const TEST_INTEREST = { name: TEST_LANGUAGE_NAME, level: TEST_LANGUAGE_LEVEL };
  const TEST_LIST = [TEST_INTEREST];

  beforeAll(() => {
    configure({ adapter: new Adapter() });
  });

  it('should render without props', () => {
    component = shallow(<Language />);
    expect(component.exists()).toEqual(true);
    expect(component.find('.lang-desc').length).toEqual(0);
  });

  it('should render with title', () => {
    component = shallow(<Language title={TEST_TITLE} />);
    expect(component.exists()).toEqual(true);
    expect(component.contains(TEST_TITLE)).toEqual(true);
    expect(component.find('.lang-desc').length).toEqual(0);
  });

  it('should render with title and certifications', () => {
    component = shallow(<Language list={TEST_LIST} title={TEST_TITLE} />);
    expect(component.exists()).toEqual(true);
    expect(component.contains(TEST_TITLE)).toEqual(true);
    expect(component.contains(TEST_LANGUAGE_NAME)).toEqual(true);
    expect(component.contains(TEST_LANGUAGE_LEVEL)).toEqual(true);
    expect(component.find('.lang-desc').length).toEqual(1);
  });
});

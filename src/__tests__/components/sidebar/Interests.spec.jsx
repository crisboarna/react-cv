import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Interests from '../../../components/sidebar/Interests';

describe('Interests', () => {
  let component;
  const TEST_TITLE = 'TEST_TILE';
  const TEST_INTEREST_NAME = 'TEST_INTEREST_NAME';
  const TEST_INTEREST_DESC = 'TEST_INTEREST_DESC';
  const TEST_INTEREST = { name: TEST_INTEREST_NAME, description: TEST_INTEREST_DESC };
  const TEST_LIST = [TEST_INTEREST];

  beforeAll(() => {
    configure({ adapter: new Adapter() });
  });

  it('should render without props', () => {
    component = shallow(<Interests />);
    expect(component.exists()).toEqual(true);
    expect(component.find('.lang-desc').length).toEqual(0);
  });

  it('should render with title', () => {
    component = shallow(<Interests title={TEST_TITLE} />);
    expect(component.exists()).toEqual(true);
    expect(component.contains(TEST_TITLE)).toEqual(true);
    expect(component.find('.lang-desc').length).toEqual(0);
  });

  it('should render with title and certifications', () => {
    component = shallow(<Interests list={TEST_LIST} title={TEST_TITLE} />);
    expect(component.exists()).toEqual(true);
    expect(component.contains(TEST_TITLE)).toEqual(true);
    expect(component.contains(`· ${TEST_INTEREST_NAME}: `)).toEqual(true);
    expect(component.contains(TEST_INTEREST_DESC)).toEqual(true);
    expect(component.find('.lang-desc').length).toEqual(1);
  });
});

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Name from '../../../components/sidebar/Name';

describe('Name', () => {
  let component;
  const TEST_TITLE = 'TEST_TILE';
  const TEST_NAME = 'TEST_NAME';

  beforeAll(() => {
    configure({ adapter: new Adapter() });
  });

  it('should render without props', () => {
    component = shallow(<Name/>);
    expect(component.exists()).toEqual(true);
    expect(component.contains(TEST_TITLE)).toEqual(false);
    expect(component.contains(TEST_NAME)).toEqual(false);
  });

  it('should render with title', () => {
    component = shallow(<Name title={TEST_TITLE}/>);
    expect(component.exists()).toEqual(true);
    expect(component.contains(TEST_TITLE)).toEqual(true);
    expect(component.contains(TEST_NAME)).toEqual(false);
  });

  it('should render with title, name', () => {
    component = shallow(<Name title={TEST_TITLE} name={TEST_NAME}/>);
    expect(component.exists()).toEqual(true);
    expect(component.contains(TEST_TITLE)).toEqual(true);
    expect(component.contains(TEST_NAME)).toEqual(true);
  });
});
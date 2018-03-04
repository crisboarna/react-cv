import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Education from '../../../components/sidebar/Education';

describe('Education', () => {
  let component;
  const TEST_TITLE = 'TEST_TILE';
  const TEST_SCHOOL = 'TEST_SCHOOL';
  const TEST_DEGREE = 'TEST_DEGREE';
  const TEST_DATE = 'TEST_DATE';
  const TEST_COURSES = 'TEST_COURSES';
  const TEST_LIST = [{
    school: TEST_SCHOOL, degree: TEST_DEGREE, date: TEST_DATE, courses: TEST_COURSES,
  }];

  beforeAll(() => {
    configure({ adapter: new Adapter() });
  });

  it('should render without props', () => {
    component = shallow(<Education />);
    expect(component.exists()).toEqual(true);
    expect(component.find('.item').length).toEqual(0);
  });

  it('should render with title', () => {
    component = shallow(<Education title={TEST_TITLE} />);
    expect(component.exists()).toEqual(true);
    expect(component.contains(TEST_TITLE)).toEqual(true);
    expect(component.find('.item').length).toEqual(0);
  });

  it('should render with title and education', () => {
    component = shallow(<Education list={TEST_LIST} title={TEST_TITLE} />);
    expect(component.exists()).toEqual(true);
    expect(component.contains(TEST_TITLE)).toEqual(true);
    expect(component.contains(TEST_SCHOOL)).toEqual(true);
    expect(component.contains(TEST_DEGREE)).toEqual(true);
    expect(component.contains(TEST_COURSES)).toEqual(true);
    expect(component.find('.item').length).toEqual(1);
  });
});

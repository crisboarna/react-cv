import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Certifications from '../../../components/sidebar/Certifications';

describe('Certifications', () => {
  let component;
  const TEST_TITLE = 'TEST_TILE';
  const TEST_CERT_NAME = 'TEST_CERT_NAME';
  const TEST_CERT_DESC = 'TEST_CERT_DESC';
  const TEST_CERT = { name: TEST_CERT_NAME, description: TEST_CERT_DESC };
  const TEST_LIST = [TEST_CERT];

  beforeAll(() => {
    configure({ adapter: new Adapter() });
  });

  it('should render without props', () => {
    component = shallow(<Certifications />);
    expect(component.exists()).toEqual(true);
    expect(component.find('.time').length).toEqual(0);
  });

  it('should render with title', () => {
    component = shallow(<Certifications title={TEST_TITLE} />);
    expect(component.exists()).toEqual(true);
    expect(component.contains(TEST_TITLE)).toEqual(true);
    expect(component.find('.time').length).toEqual(0);
  });

  it('should render with title and certifications', () => {
    component = shallow(<Certifications list={TEST_LIST} title={TEST_TITLE} />);
    expect(component.exists()).toEqual(true);
    expect(component.contains(TEST_TITLE)).toEqual(true);
    expect(component.contains(TEST_CERT_NAME)).toEqual(true);
    expect(component.contains(TEST_CERT_DESC)).toEqual(true);
    expect(component.find('.time').length).toEqual(1);
  });
});

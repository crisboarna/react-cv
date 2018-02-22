import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Contact from '../../../components/sidebar/Contact';

describe('Contact', () => {
  let component;
  const TEST_ICON = 'TEST_ICON';
  const TEST_EMAIL = {value: 'TEST_EMAIL', icon: TEST_ICON };
  const TEST_PHONE = {value: 'TEST_PHONE', icon: TEST_ICON };
  const TEST_CONTACT = {value: 'TEST_CONTACT', icon: TEST_ICON} ;

  beforeAll(() => {
    configure({ adapter: new Adapter() });
  });

  it('should render without props', () => {
    component = shallow(<Contact/>);
    expect(component.exists()).toEqual(true);
    expect(component.find('.item').length).toEqual(0);
  });

  it('should render without props or children', () => {
    component = shallow(<Contact>TEST</Contact>);
    expect(component.exists()).toEqual(true);
    expect(component.contains('TEST')).toEqual(false);
    expect(component.find('.item').length).toEqual(0);
  });

  it('should render with title', () => {
    component = shallow(<Contact email={TEST_EMAIL} phone={TEST_PHONE} website={TEST_CONTACT}/>);
    expect(component.exists()).toEqual(true);
    expect(component.find(`.${TEST_ICON}`));
    expect(component.contains(`<a href={\`//${`mailto: ${TEST_EMAIL}`}\`} target="_blank"> ${TEST_EMAIL} </a>`));
    expect(component.contains(`<a href={\`//${`tel:${TEST_PHONE}`}\`} target="_blank"> ${TEST_PHONE} </a>`));
  });
});
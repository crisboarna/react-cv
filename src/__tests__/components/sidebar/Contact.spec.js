import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import Contact from '../../../components/sidebar/Contact';

describe('Contact', () => {
  let component;
  const TEST_ICON = 'TEST_ICON';
  const TEST_EMAIL = {value: 'TEST_EMAIL', icon: TEST_ICON };
  const TEST_PHONE = {value: 'TEST_PHONE', icon: TEST_ICON };
  const TEST_CONTACT = {value: 'TEST_CONTACT', icon: TEST_ICON} ;
  let store;
  const mockStore = configureStore();

  beforeAll(() => {
    configure({ adapter: new Adapter() });
  });

  beforeEach(()=>{
    store = mockStore({anchorVisibility:{anchorVisible:true}});
  });

  it('should render without props', () => {
    component = shallow(<Contact store={store}/>).dive();
    expect(component.exists()).toEqual(true);
    expect(component.find('.item').length).toEqual(0);
    expect(component.find('.contactAnchor').length).toEqual(1);
  });

  it('should render without props or children', () => {
    component = shallow(<Contact store={store}>TEST</Contact>).dive();
    expect(component.exists()).toEqual(true);
    expect(component.contains('TEST')).toEqual(false);
    expect(component.find('.item').length).toEqual(0);
    expect(component.find('.contactAnchor').length).toEqual(1);
  });

  it('should render with title', () => {
    component = shallow(<Contact store={store} email={TEST_EMAIL} phone={TEST_PHONE} website={TEST_CONTACT}/>).dive();
    expect(component.exists()).toEqual(true);
    expect(component.find(`.${TEST_ICON}`));
    expect(component.contains(`<a href={\`//${`mailto: ${TEST_EMAIL}`}\`} target="_blank"> ${TEST_EMAIL} </a>`));
    expect(component.contains(`<a href={\`//${`tel:${TEST_PHONE}`}\`} target="_blank"> ${TEST_PHONE} </a>`));
    expect(component.find('.contactAnchor').length).toEqual(4);
  });

  it('should not render anchors', () => {
    store = mockStore({anchorVisibility:{anchorVisible:false}});
    component = shallow(<Contact store={store} email={TEST_EMAIL} phone={TEST_PHONE} website={TEST_CONTACT}/>).dive();
    expect(component.exists()).toEqual(true);
    expect(component.find(`.${TEST_ICON}`));
    expect(component.contains(`<a href={\`//${`mailto: ${TEST_EMAIL}`}\`} target="_blank"> ${TEST_EMAIL} </a>`));
    expect(component.contains(`<a href={\`//${`tel:${TEST_PHONE}`}\`} target="_blank"> ${TEST_PHONE} </a>`));
    expect(component.find('.contactAnchor').length).toEqual(0);
  });
});
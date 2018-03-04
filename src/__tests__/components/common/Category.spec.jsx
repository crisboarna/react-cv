import React from 'react';
import { configure, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import Category from '../../../components/common/Category.jsx';
import Section from '../../../components/common/Section';

describe('Category', () => {
  let component;
  const TEST_TITLE = 'TEST_TITLE';
  const TEST_ICON = 'TEST_ICON';
  const TEST_DATE = 'TEST_DATE';
  const TEST_SUBTITLE = 'TEST_SUBTITLE';
  const TEST_SUBTITLE_LINK = 'TEST_SUBTITLE_LINK';
  const TEST_SUBTITLE_DETAIL = 'TEST_SUBTITLE_DETAIL';
  const TEST_DESCRIPTION1 = 'TEST_DESCRIPTION1';
  const TEST_DESCRIPTION2 = 'TEST_DESCRIPTION2';
  const TEST_DESCRIPTION = [TEST_DESCRIPTION1, TEST_DESCRIPTION2];
  const TEST_TAG1 = 'TEST_TAG1';
  const TEST_TAG2 = 'TEST_TAG2';
  const TEST_TAGS = [TEST_TAG1, TEST_TAG2];
  const TEST_LIST = [{
    title: TEST_TITLE, date: TEST_DATE, subtitle: TEST_SUBTITLE, subtitleLink: TEST_SUBTITLE_LINK, subtitleDetail: TEST_SUBTITLE_DETAIL,
  }];
  let store;
  const mockStore = configureStore();

  beforeAll(() => {
    configure({ adapter: new Adapter() });
  });

  beforeEach(() => {
    store = mockStore({ anchorVisibility: { anchorVisible: true } });
  });

  it('should render without crashing', () => {
    component = shallow(<Category store={store} />).dive();
    expect(component.exists()).toEqual(true);
    expect(component.find(Section).prop('title')).toEqual('Category');
    expect(component.find(Section).prop('icon')).toEqual('briefcase');
    expect(component.find('.item').length).toEqual(0);
    expect(component.find('.headerAnchor').length).toEqual(0);
  });

  it('should render with given title, default icon', () => {
    component = shallow(<Category store={store} title={TEST_TITLE} />).dive();
    expect(component.find(Section).prop('title')).toEqual(TEST_TITLE);
    expect(component.find(Section).prop('icon')).toEqual('briefcase');
    expect(component.find('.item').length).toEqual(0);
    expect(component.find('.headerAnchor').length).toEqual(0);
  });

  it('should render with given title and icon', () => {
    component = shallow(<Category store={store} title={TEST_TITLE} icon={TEST_ICON} />).dive();
    expect(component.find(Section).prop('title')).toEqual(TEST_TITLE);
    expect(component.find(Section).prop('icon')).toEqual(TEST_ICON);
    expect(component.find('.item').length).toEqual(0);
    expect(component.find('.headerAnchor').length).toEqual(0);
  });

  it('should render with given title, icon, empty list', () => {
    component = shallow(<Category store={store} title={TEST_TITLE} icon={TEST_ICON} list={[]} />).dive();
    expect(component.find(Section).prop('title')).toEqual(TEST_TITLE);
    expect(component.find(Section).prop('icon')).toEqual(TEST_ICON);
    expect(component.find('.item').length).toEqual(0);
    expect(component.find('.headerAnchor').length).toEqual(0);
  });

  it('should render without anchor', () => {
    component = shallow(<Category store={store} title={TEST_TITLE} icon={TEST_ICON} list={[]} />).dive();
    expect(component.find(Section).prop('title')).toEqual(TEST_TITLE);
    expect(component.find(Section).prop('icon')).toEqual(TEST_ICON);
    expect(component.find('.item').length).toEqual(0);
    expect(component.find('.headerAnchor').length).toEqual(0);
  });

  it('should render with given title, icon, list with no description, tags', () => {
    component = shallow(<Category store={store} title={TEST_TITLE} icon={TEST_ICON} list={TEST_LIST} />).dive();
    expect(component.find(Section).prop('title')).toEqual(TEST_TITLE);
    expect(component.find(Section).prop('icon')).toEqual(TEST_ICON);
    expect(component.find('.item').length).toEqual(1);
    expect(component.find('.header').length).toEqual(1);
    expect(component.contains(TEST_SUBTITLE)).toEqual(true);
    expect(component.find('.headerAnchor').length).toEqual(1);
    expect(component.contains(TEST_DATE)).toEqual(true);
    expect(component.find('.headerAnchor').length).toEqual(1);
  });

  it('should render with given icon, list with no subtitle, description, tags', () => {
    const TEST_LIST_PRIVATE = [{
      title: TEST_TITLE, date: TEST_DATE, subtitleLink: TEST_SUBTITLE_LINK, subtitleDetail: TEST_SUBTITLE_DETAIL,
    }];
    component = shallow(<Category store={store} title={TEST_TITLE} icon={TEST_ICON} list={TEST_LIST_PRIVATE} />).dive();
    expect(component.find(Section).prop('title')).toEqual(TEST_TITLE);
    expect(component.find(Section).prop('icon')).toEqual(TEST_ICON);
    expect(component.find('.item').length).toEqual(1);
    expect(component.find('.header').length).toEqual(0);
    expect(component.contains(TEST_SUBTITLE)).toEqual(false);
    expect(component.contains(TEST_DATE)).toEqual(true);
    expect(component.find('.headerAnchor').length).toEqual(0);
  });

  it('should render with given icon, list, description and no tags', () => {
    const TEST_LIST_PRIVATE = [{
      title: TEST_TITLE, date: TEST_DATE, subtitleLink: TEST_SUBTITLE_LINK, subtitleDetail: TEST_SUBTITLE_DETAIL, description: TEST_DESCRIPTION,
    }];
    component = shallow(<Category store={store} title={TEST_TITLE} icon={TEST_ICON} list={TEST_LIST_PRIVATE} />).dive();
    expect(component.find(Section).prop('title')).toEqual(TEST_TITLE);
    expect(component.find(Section).prop('icon')).toEqual(TEST_ICON);
    expect(component.find('.item').length).toEqual(1);
    expect(component.find('.header').length).toEqual(0);
    expect(component.find('.keywords').length).toEqual(0);
    expect(component.contains(TEST_SUBTITLE)).toEqual(false);
    expect(component.contains(TEST_DATE)).toEqual(true);
    expect(component.contains(`· ${TEST_DESCRIPTION1}`)).toEqual(true);
    expect(component.contains(`· ${TEST_DESCRIPTION2}`)).toEqual(true);
    expect(component.find('.headerAnchor').length).toEqual(0);
  });

  it('should render with given icon, list, description, tags', () => {
    const TEST_LIST_PRIVATE = [{
      title: TEST_TITLE, date: TEST_DATE, subtitleLink: TEST_SUBTITLE_LINK, subtitleDetail: TEST_SUBTITLE_DETAIL, description: TEST_DESCRIPTION, tags: TEST_TAGS,
    }];
    component = shallow(<Category store={store} title={TEST_TITLE} icon={TEST_ICON} list={TEST_LIST_PRIVATE} />).dive();
    expect(component.find(Section).prop('title')).toEqual(TEST_TITLE);
    expect(component.find(Section).prop('icon')).toEqual(TEST_ICON);
    expect(component.find('.item').length).toEqual(1);
    expect(component.find('.header').length).toEqual(1);
    expect(component.find('.keywords').length).toEqual(1);
    expect(component.contains(TEST_SUBTITLE)).toEqual(false);
    expect(component.contains(TEST_DATE)).toEqual(true);
    expect(component.contains(`· ${TEST_DESCRIPTION1}`)).toEqual(true);
    expect(component.contains(`· ${TEST_DESCRIPTION2}`)).toEqual(true);
    expect(component.contains(TEST_TAG1)).toEqual(true);
    expect(component.contains(TEST_TAG2)).toEqual(true);
    expect(component.find('.headerAnchor').length).toEqual(1);
  });

  it('should not render anchor', () => {
    store = mockStore({ anchorVisibility: { anchorVisible: false } });
    component = shallow(<Category store={store} title={TEST_TITLE} icon={TEST_ICON} list={TEST_LIST} />).dive();
    expect(component.find(Section).prop('title')).toEqual(TEST_TITLE);
    expect(component.find(Section).prop('icon')).toEqual(TEST_ICON);
    expect(component.find('.item').length).toEqual(1);
    expect(component.find('.header').length).toEqual(1);
    expect(component.contains(TEST_SUBTITLE)).toEqual(true);
    expect(component.find('.headerAnchor').length).toEqual(0);
    expect(component.contains(TEST_DATE)).toEqual(true);
  });
});

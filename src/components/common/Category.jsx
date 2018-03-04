// @flow
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Section from './Section';

type Props = {
  title ?: string,
  icon ?: string,
  list ?: Array<Object>,
  anchorVisible : boolean
};

const renderTags = function renderTags(tags : Array<string>) {
  if (tags) {
    return (
      <ul className="keywords">
        {tags.map(tag => <li key={tag}>{tag}</li>)}
      </ul>
    );
  }
  return null;
};

const renderHeaderAnchors = function renderHeaderAnchors(title : string, link : string, anchorVisible : boolean) {
  if (anchorVisible) {
    return <a href={link} className="headerAnchor" target="_blank">{title}</a>;
  }
  return title;
};

const renderHeaderSection = function renderHeaderSection(title : string, link : string, description : string, tags : Array<string>, anchorVisible : boolean) {
  if (title || tags) {
    return (
      <div className="header">
        {renderTags(tags)}
        {renderHeaderAnchors(title, link, anchorVisible)}
        {description}
      </div>
    );
  }
  return null;
};

const renderCategory = function renderCategory(item : Object, i : number, anchorVisible : boolean) {
  return (
    <div className="item" key={`exp_item_${i}`}>
      <div className="meta">
        <div className="upper-row">
          <h3 className="job-title">{item.title}</h3>
          <div className="time">{item.date}</div>
        </div>
        {renderHeaderSection(item.subtitle, item.subtitleLink, item.subtitleDetail, item.tags, anchorVisible)}
      </div>
      <div className="details">
        { item.description && item.description.constructor === Array ?
          item.description.map(entry => (<p key={`${entry.substr(0, 10)}`}>{`· ${entry}`}</p>))
          : null
        }
      </div>
    </div>
  );
};

const Category = (props : Props) => {
  const {
    title, list, icon, anchorVisible,
  } = props;
  return (
    <Section className="category-section" icon={icon || 'briefcase'} title={title || 'Category'}>
      {list && list.constructor === Array ? list.map((item, i) => renderCategory(item, i, anchorVisible)) : null}
    </Section>
  );
};

const mapStateToProps = state => ({
  anchorVisible: state.anchorVisibility.anchorVisible,
});

export default connect(
  mapStateToProps,
  null,
)(Category);

Category.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  anchorVisible: PropTypes.boolean,
};


import React from 'react';
import PropTypes from 'prop-types';
import Section from './Section';

type Props = {
  title ?: string,
  icon ?: string,
  list ?: Array<Object>
};

const renderTags = function renderTags(tags : Array<string>) {
  if(tags) {
    return (
      <ul className={'keywords'}>
        {tags.map(tag => <li key={tag}>{tag}</li>)}
      </ul>
    );
  } else {
    console.log('no tags');
    return null;
  }
};

const renderHeaderSection = function renderHeaderSection(title : string, link : string, description : string, tags : Array<string>) {
  if (title || tags) {
    return (
      <div className="header">
        {renderTags(tags)}
        <a href={link} target="_blank">{title}</a>
        {description}
      </div>
    );
  } else {
    return null;
  }
};

const renderCategory = function renderCategory(item : Object, i : number) {
  return (
    <div className="item" key={`exp_item_${i}`}>
      <div className="meta">
        <div className="upper-row">
          <h3 className="job-title">{item.title}</h3>
          <div className="time">{item.date}</div>
        </div>
        {renderHeaderSection(item.subtitle, item.subtitleLink, item.subtitleDetail, item.tags)}
      </div>
      <div className="details">
        { item.description && item.description.constructor === Array ?
          item.description.map((entry, i) => {return (<p key={`${item.subtitleDetail}_${i}`}>{`· ${entry}`}</p>)})
          : null
        }
      </div>
    </div>
  );
};

const Category = (props : Props) => {
  const { title, list, icon } = props;
  return (
    <Section className="category-section" icon={icon || 'briefcase'} title={title || 'Category'}>
      {list && list.constructor === Array ? list.map((item, i) => renderCategory(item, i)): null}
    </Section>
  );
};

export default Category;

Category.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};


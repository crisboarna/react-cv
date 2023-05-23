import React from 'react';
import Section from '../section';
import { CategoryProps, ExperienceItem } from './index';
import './category.css';

const renderTags = function renderTags(tags: string[]) {
  if (tags) {
    return (
      <ul className="keywords">
        {tags.map((tag) => (
          <li key={tag} data-testid={'category/tag'}>
            {tag}
          </li>
        ))}
      </ul>
    );
  }
  return null;
};

const renderHeaderAnchors = function renderHeaderAnchors(
  title: string,
  link?: string
) {
  return (
    <a
      href={link}
      className="headerAnchor"
      target="_blank"
      rel="noreferrer"
      data-testid={'category/header-anchor'}
    >
      {title}
    </a>
  );
};

const renderHeaderSection = function renderHeaderSection(
  title: string,
  tags: Array<string>,
  link?: string,
  description?: string
) {
  if (title || tags) {
    return (
      <div className="header" data-testid={'category/header'}>
        {renderTags(tags)}
        {renderHeaderAnchors(title, link)}
        {description}
      </div>
    );
  }
  return null;
};

const renderCategory = function renderCategory(
  item: ExperienceItem,
  i: number
) {
  return (
    <div data-testid={'category/item'} className={`item ${item.subtitle?.includes('Cahootsy') ? 'item-gap' : ''}`} key={`exp_item_${i}`}>
      {/*// puppeteer does not take into account padding by itself when on next page*/}
      <div className="meta">
        <div className="upper-row">
          <h3 className="job-title">{item.title}</h3>
          <div className="time">{item.date}</div>
        </div>
        {renderHeaderSection(
          item.subtitle,
          item.tags,
          item.subtitleLink,
          item.subtitleDetail
        )}
      </div>
      <div className="details">
        {item.description && item.description.constructor === Array
          ? item.description.map((entry) => (
              <p key={`${entry.substr(0, 10)}`}>{`· ${entry}`}</p>
            ))
          : null}
      </div>
    </div>
  );
};

const Category = (props: CategoryProps) => {
  const { title, list, icon } = props;
  return (
    <Section
      data-testid={'category/section'}
      className="category-section"
      icon={icon || 'suitcase'}
      title={title || 'Category'}
    >
      {list && list.constructor === Array
        ? list.map((item, i) => renderCategory(item, i))
        : null}
    </Section>
  );
};

export default Category;

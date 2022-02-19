import React from "react";
import Section from "./Section";

export type CategoryProps = {
  readonly title?: string;
  readonly icon?: string;
  readonly list?: Array<Record<string, any>>;
};

const renderTags = function renderTags(tags: string[]) {
  if (tags) {
    return (
      <ul className="keywords">
        {tags.map((tag) => (
          <li key={tag} data-testid={"category/tag"}>
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
  link: string
) {
  return (
    <a
      href={link}
      className="headerAnchor"
      target="_blank"
      rel="noreferrer"
      data-testid={"category/header-anchor"}
    >
      {title}
    </a>
  );
};

const renderHeaderSection = function renderHeaderSection(
  title: string,
  link: string,
  description: string,
  tags: Array<string>
) {
  if (title || tags) {
    return (
      <div className="header" data-testid={"category/header"}>
        {renderTags(tags)}
        {renderHeaderAnchors(title, link)}
        {description}
      </div>
    );
  }
  return null;
};

const renderCategory = function renderCategory(
  item: Record<string, any>,
  i: number
) {
  return (
    <div
      data-testid={"category/item"}
      className={
        item.subtitleDetail?.includes("Futures E-Trading Technology")
          ? "item-next-page"
          : "item"
      }
      key={`exp_item_${i}`}
    >
      <div className="meta">
        <div className="upper-row">
          <h3 className="job-title">{item.title}</h3>
          <div className="time">{item.date}</div>
        </div>
        {renderHeaderSection(
          item.subtitle,
          item.subtitleLink,
          item.subtitleDetail,
          item.tags
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
      data-testid={"category/section"}
      className="category-section"
      icon={icon}
      title={title || "Category"}
    >
      {list && list.constructor === Array
        ? list.map((item, i) => renderCategory(item, i))
        : null}
    </Section>
  );
};

export default Category;

import React, { FC } from "react";

export type ContactProps = {
  readonly email?: Record<string, string>;
  readonly phone?: Record<string, string>;
  readonly website?: Record<string, string>;
  readonly linkedin?: Record<string, string>;
  readonly github?: Record<string, string>;
  readonly npm?: Record<string, string>;
};

const renderContactAnchors = function renderContactAnchors(
  href: string,
  entry: any
) {
  return (
    <a
      data-testid={"contact/item-icon-anchor"}
      className="contactAnchor"
      href={
        ["mailto", "tel"].some((entry) => href.includes(entry))
          ? href
          : `//${href}`
      }
      target="_blank"
      rel="noreferrer"
    >
      {entry.value}
    </a>
  );
};

const renderContactInfo = function renderContactInfo(key: string, entry: any) {
  if (key !== "children" && entry.constructor === Object) {
    let href;
    switch (key) {
      case "email":
        href = `mailto:${entry.value}`;
        break;
      case "phone":
        href = `tel:${entry.value}`;
        break;
      default:
        href = entry.value;
    }

    return (
      <li key={key} data-testid={"contact/item"}>
        <i className={entry.icon} data-testid={"contact/item-icon"} />
        {renderContactAnchors(href, entry)}
      </li>
    );
  }
  return null;
};

const Contact: FC<ContactProps> = (props) => (
  <div
    className="contact-container container-block"
    data-testid={"contact/container"}
  >
    <ul className="list-unstyled contact-list">
      {Object.entries(props).map(([key, entry]) =>
        renderContactInfo(key, entry)
      )}
    </ul>
  </div>
);

export default Contact;

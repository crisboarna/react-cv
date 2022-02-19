import React, { FC } from "react";

export type CertificationProps = {
  readonly title?: string;
  readonly list?: Array<Record<string, string>>;
};

const renderCertification = function renderCertification(
  item: Record<string, string>
) {
  return (
    <li key={item.name} data-testid={"certifications/item"}>
      <i
        className={`${item.icon} certification-icon`}
        data-testid={"certifications/item-icon"}
      />
      {item.name}
      <div className="time" data-testid={"certifications/item-description"}>
        · {item.description}
      </div>
    </li>
  );
};

const Certifications: FC<CertificationProps> = ({ list, title }) => (
  <div
    className="certification-container container-block"
    data-testid={"certifications/container"}
  >
    <h2 className="container-block-title" data-testid={"certifications/title"}>
      <i className="fas fa-book" data-testid={"certifications/icon"} /> {title}
    </h2>
    <ul className="list-unstyled interests-list">
      {list && list.constructor === Array
        ? list.map((item) => renderCertification(item))
        : null}
    </ul>
  </div>
);

export default Certifications;

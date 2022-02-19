import React, { FC } from "react";

export type EducationProps = {
  title: string;
  list: Array<Record<string, string>>;
};

const renderEducation = function renderEducation(
  item: Record<string, string>,
  i: number
) {
  return (
    <div className="item" key={`education_item_${i}`}>
      <h4 className="degree" data-testid={"education/item-school"}>
        <li className={`${item.icon} icon`} />
        {item.school}
      </h4>
      <h5 className="meta" data-testid={"education/item-degree"}>
        {item.degree}
      </h5>
      <div className="time" data-testid={"education/item-date"}>
        {item.date}
      </div>
      <div className={"courses"} data-testid={"education/item-courses"}>
        <span>· Courses:</span> <span className={"time"}>{item.courses}</span>
      </div>
    </div>
  );
};

const Education: FC<EducationProps> = ({ title, list }) => (
  <div
    className="education-container container-block"
    data-testid={"education/container"}
  >
    <h2 className="container-block-title">
      <i className="fas fa-graduation-cap" data-testid={"education/icon"} />{" "}
      {title}
    </h2>
    {list && list.constructor === Array
      ? list.map((item, i) => renderEducation(item, i))
      : null}
  </div>
);

export default Education;

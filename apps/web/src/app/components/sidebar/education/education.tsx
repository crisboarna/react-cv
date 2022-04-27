import React, { FC } from 'react';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EducationItem, EducationProps } from './index';
import './education.css';

const renderEducation = function renderEducation(
  item: EducationItem,
  i: number
) {
  const iconElements: [IconPrefix, IconName] = item.icon.split(' ') as never;

  return (
    <div className="item" key={`education_item_${i}`}>
      <h4 className="degree" data-testid={'education/item-school'}>
        <FontAwesomeIcon icon={iconElements} className={'icon'} />
        {item.school}
      </h4>
      <h5 className="meta" data-testid={'education/item-degree'}>
        {item.degree}
      </h5>
      <div className="time" data-testid={'education/item-date'}>
        {item.date}
      </div>
      <div className={'courses'} data-testid={'education/item-courses'}>
        <span>· Courses:</span>{' '}
        <span className={'time'}>{item.courses.join(', ')}</span>
      </div>
    </div>
  );
};

const Education: FC<EducationProps> = ({ title, list }) => (
  <div
    className="education-container container-block"
    data-testid={'education/container'}
  >
    {
      /*// puppeteer does not take into account padding by itself when on next page*/
      Array.from(Array(13)).map(() => (
        <br />
      ))
    }
    <h2 className="container-block-title">
      <FontAwesomeIcon
        icon={['fas', 'graduation-cap']}
        className={'icon'}
        data-testid={'education/icon'}
      />{' '}
      {title}
    </h2>
    {list && list.constructor === Array
      ? list.map((item, i) => renderEducation(item, i))
      : null}
  </div>
);

export default Education;

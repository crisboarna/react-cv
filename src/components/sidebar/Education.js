import React from 'react';
import PropTypes from 'prop-types';

type Props = {
  title : string,
  list : Array<Object>
};

const renderEducation = function renderEducation(item : string, i : number) {
  return (
    <div className="item" key={`education_item_${i}`}>
      <h4 className="degree">{item.school}</h4>
      <h5 className="meta">{item.degree}</h5>
      <div className="time">{item.date}</div>
      <div><span className="time">· Courses:</span> {item.courses}</div>
    </div>
  );
};

const Education = ({title, list} : Props) => {
  return (
    <div className="education-container container-block">
      <h2 className="container-block-title">
        <i className='fas fa-graduation-cap' />
        {' '}
        {title}
      </h2>
      {list && list.constructor === Array ? list.map((item, i) => renderEducation(item, i)) : null }
    </div>
  );
};

export default Education;

Education.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  title: PropTypes.string.isRequired
};


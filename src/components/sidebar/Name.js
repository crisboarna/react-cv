// @flow
import React from 'react';
import PropTypes from 'prop-types';

type Props = {
  name ?: string,
  title ?: string
};

const Name = ({name, title} : Props) => {
    return (
      <div className="name-container">
        <h1 className="name" style={{ fontSize: 25 }}>{ name }</h1>
        <h3 className="tagline"> { title } </h3>
      </div>
    );
};

export default Name;

Name.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};


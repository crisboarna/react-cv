// @flow
import React from 'react';
import PropTypes from 'prop-types';

const Name = ({name, title} : Props) => {
    return (
      <div className="name-container">
        <h1 className="name" style={{ fontSize: 25 }}>{ name }</h1>
        <h3 className="tagline"> { title } </h3>
      </div>
    );
};

export default Name;

type Props = {
  name ?: string,
  title ?: string
};

Name.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};


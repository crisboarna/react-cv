// @flow
import React from 'react';
import PropTypes from 'prop-types';

type Props = {
  id ?: string,
  className ?: string,
  icon ?: string,
  title ?: string,
  children ?: Object
};

const Section = (props : Props) => {
  return (
    <section className={`section ${props.className || ''}`} id={props.id}>
      <header><h2 className="section-title">
        <i className={`fa fa-${props.icon || 'user'}`} />
        { props.title }
      </h2>
      </header>
      { props.children }
    </section>
  );
};

export default Section;

Section.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.string,
  children: PropTypes.node,
  id: PropTypes.string
};

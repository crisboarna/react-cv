import React, { FC, PropsWithChildren } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SectionProps } from './index';
import './section.css';

const Section: FC<PropsWithChildren<SectionProps>> = ({
  className,
  id,
  title,
  icon,
  children,
}) => (
  <section className={`section ${className || ''}`} id={id}>
    <header>
      <h2 className="section-title" data-testid={'section/header-title'}>
        <FontAwesomeIcon
          icon={['fas', icon as never]}
          className={'section-icon'}
          data-testid={'section/header-icon'}
        />
        {title}
      </h2>
    </header>
    {children}
  </section>
);

export default Section;

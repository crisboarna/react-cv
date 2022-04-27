import React, { FC } from 'react';
import { NameProps } from './index';
import './name.css';

const Name: FC<NameProps> = ({ name, title }) => (
  <div className="name-container" data-testid={'name/container'}>
    <h1 className="name" style={{ fontSize: 25 }} data-testid={'name/h1'}>
      {name}
    </h1>
    <h3 className="tagline" data-testid={'name/title'}>
      {/*{title}*/}
    </h3>
  </div>
);

export default Name;

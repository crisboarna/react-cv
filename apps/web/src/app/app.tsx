import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faArchive,
  faBook,
  faBuildingColumns,
  faCode,
  faEnvelope,
  faGlobe,
  faGraduationCap,
  faPhone,
  faRss,
  faSuitcase,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {
  faAws,
  faBitcoin,
  faDocker,
  faGithub,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import CV from './components/cv';
import Buttons from './components/buttons';
import data from '../content';

library.add(
  //fab
  faAws,
  faBitcoin,
  faDocker,
  faGithub,
  faLinkedin,
  //fas
  faArchive,
  faBook,
  faBuildingColumns,
  faCode,
  faEnvelope,
  faGlobe,
  faGraduationCap,
  faPhone,
  faRss,
  faSuitcase,
  faUser
);

export const App = () => (
  <div id={'body-wrapper'} className={'body-wrapper'}>
    <Buttons />
    <CV {...data} />
  </div>
);

export default App;

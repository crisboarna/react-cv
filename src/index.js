import React from 'react';
import ReactDOM from 'react-dom';
import CV from './CV';
import Data from './content';
import Export from './components/util/Export';

ReactDOM.render(<Export><CV {...Data}/></Export>, global.document.getElementById('root'));
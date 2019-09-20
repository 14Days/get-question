import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {TypeProvider} from './utils/context';

ReactDOM.render(<TypeProvider>
  <App/>
</TypeProvider>, document.getElementById('root'));

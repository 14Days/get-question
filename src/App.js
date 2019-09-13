import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {TypeProvider} from './utils/context';
import Index from './Views/index'

function App() {
  return (
    <TypeProvider>
      <Router>
        <Route exact path='/' component={Index}/>
      </Router>
    </TypeProvider>
  );
}

export default App;

import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Index from './Views/index'

function App() {
  return (
    <Router>
      <Route exact path='/' component={Index}/>
    </Router>
  );
}

export default App;

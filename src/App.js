import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {TypeProvider} from './utils/context';
import PrivateRoute from "./components/privateRoute";
import Index from './Views/index'
import Questions from './Views/questions'

function App() {
  return (
    <TypeProvider>
      <Router>
        <Route exact path='/' component={Index}/>
        <PrivateRoute path='/questions' component={Questions}/>
      </Router>
    </TypeProvider>
  );
}

export default App;

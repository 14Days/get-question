import React, {useContext} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Snackbar from "@material-ui/core/Snackbar";
import {UserContext} from './utils/context';
import PrivateRoute from "./components/PrivateRoute";
import Index from './views/index'
import Questions from './views/questions'

function App() {
  const {errorMessage, setErrorMessage} = useContext(UserContext);

  const handleClose = () => {
    setErrorMessage('');
  };

  return (
    <>
      <Router>
        <Route exact path='/' component={Index}/>
        <PrivateRoute path='/questions' component={Questions}/>
      </Router>
      <Snackbar
        open={errorMessage !== ''}
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        autoHideDuration={2500}
        onClose={handleClose}
      >
        <SnackbarContent
          open={errorMessage !== ''}
          onClose={handleClose}
          message={errorMessage}
          style={{backgroundColor: 'red'}}
        />
      </Snackbar>
    </>
  );
}

export default App;

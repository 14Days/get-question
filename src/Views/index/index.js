import React, {useState, useContext} from 'react';
import {withRouter} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import {UserContext} from '../../utils/context';
import request from '../../utils/request'

import style from './index.module.scss';

const Index = (props) => {
  const {setUser} = useContext(UserContext);

  const [info, setInfo] = useState({
    username: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  const submit = async () => {
    try {
      await request.post('/log/in', {
        username: info.username,
        password: info.password
      });
      setUser(info.username)
    } catch (e) {
      setErrorMessage(e.message)
    }
  };

  const handleClose = () => {
    setErrorMessage('');
  };

  return (
    <div className={style.mainContainer}>
      <div className={style.loginArea}>
        <TextField
          id="standard-dense"
          label="用户名"
          margin="normal"
          onChange={(e) => setInfo({...info, username: e.target.value})}
        />
        <TextField
          id="standard-password-input"
          label="密码"
          type="password"
          autoComplete="current-password"
          margin="normal"
          onChange={(e) => setInfo({...info, password: e.target.value})}
        />
        <Button variant="contained" color="primary" onClick={submit}>
          登陆
        </Button>
      </div>
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
    </div>
  );
};

export default withRouter(Index);

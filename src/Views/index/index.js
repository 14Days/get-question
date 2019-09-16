import React, {useState, useContext} from 'react';
import {withRouter} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import {TypeContext} from '../../utils/context';
import {USER} from '../../utils/userDetail'

import style from './index.module.scss';

const Index = (props) => {
  const {setUserType} = useContext(TypeContext);

  const [info, setInfo] = useState({
    username: '',
    password: ''
  });

  const [isError, setIsError] = useState(false);

  const submit = () => {
    for (let i = 0; i < USER.length; ++i) {
      if (USER[i].username === info.username && info.password === '123') {
        setUserType({
          name: USER[i].username,
          type: USER[i].type
        });
        props.history.replace('/questions');
        return
      }
    }
    setIsError(true);
  };

  const handleClose = () => {
    setIsError(false);
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
        open={isError}
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        autoHideDuration={2500}
        onClose={handleClose}
      >
        <SnackbarContent
          open={isError}
          onClose={handleClose}
          message="请输入正确的用户名、密码"
          style={{backgroundColor: 'red'}}
        />
      </Snackbar>
    </div>
  );
};

export default withRouter(Index);

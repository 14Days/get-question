import React, {useState, useContext} from "react";
import {withRouter} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import request from '../utils/request';
import {UserContext} from '../utils/context';

import style from './Header.module.scss'
import TextField from "@material-ui/core/TextField";
import confirm from "../utils/confirm";

function Header(props) {
  const {setUser, setErrorMessage} = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState({
    old: '',
    one: '',
    two: ''
  });

  const handleLogout = async () => {
    try {
      await request.get('/log/out');
      setUser('');
      props.history.replace('/')
    } catch (e) {
      setErrorMessage(e.message)
    }
  };

  const commitPassword = async () => {
    if (!confirm(password.two)) {
      setErrorMessage('密码必须为6-10位且包含大小写与数字');
      return
    }
    if (password.one !== password.two) {
      setErrorMessage('两次密码不一致')
    } else {
      try {
        await request.post('/secret', {
          old_password: password.old,
          new_password: password.one
        });
        setUser('');
        props.history.replace('/');
      } catch (e) {
        setErrorMessage(e.message)
      }
    }
  };

  return (
    <>
      <div style={{height: '70px'}}>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" style={{flexGrow: 1}}>中小学数学考试系统</Typography>
            <Button color="inherit" onClick={() => setOpen(true)}>修改密码</Button>
            <Button color="inherit" onClick={handleLogout}>退出登陆</Button>
          </Toolbar>
        </AppBar>
      </div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={() => setOpen(false)}
        className={style.modal}
      >
        <Paper className={style.container}>
          <TextField
            id="standard-dense"
            label="旧密码"
            type="password"
            margin="normal"
            onChange={(e) => setPassword({...password, old: e.target.value})}
          />
          <TextField
            id="standard-password-input"
            label="新密码"
            type="password"
            autoComplete="current-password"
            margin="normal"
            onChange={(e) => setPassword({...password, one: e.target.value})}
          />
          <TextField
            id="standard-password-input-two"
            label="确认密码"
            type="password"
            autoComplete="current-password"
            margin="normal"
            onChange={(e) => setPassword({...password, two: e.target.value})}
          />
          <Button variant="contained" color="primary" style={{marginTop: '10px'}} onClick={commitPassword}>
            提交
          </Button>
        </Paper>
      </Modal>
    </>
  )
}

export default withRouter(Header);
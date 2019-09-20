import React, {useContext, useState} from 'react';
import {withRouter, Link} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {UserContext} from "../../utils/context";
import request from "../../utils/request";

function Login(props) {
  const {setUser, setErrorMessage} = useContext(UserContext);

  const [info, setInfo] = useState({
    username: '',
    password: ''
  });

  const submit = async () => {
    try {
      await request.post('/log/in', {
        username: info.username,
        password: info.password
      });
      setUser(info.username);
      props.history.push('/questions')
    } catch (e) {
      setErrorMessage(e.message)
    }
  };

  return (
    <>
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
      <Link to={`${props.match.url}register`}>
        <Button>注册</Button>
      </Link>
    </>
  )
}

export default withRouter(Login);
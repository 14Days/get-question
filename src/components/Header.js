import React, {useContext} from "react";
import {withRouter} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import request from '../utils/request';
import {UserContext} from '../utils/context';

function Header(props) {
  const {setUser, setErrorMessage} = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await request.get('/log/out');
      setUser('');
      props.history.replace('/')
    } catch (e) {
      setErrorMessage(e.message)
    }
  };

  return (
    <div style={{height: '70px'}}>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" style={{flexGrow: 1}}>中小学数学考试系统</Typography>
          <Button color="inherit">修改密码</Button>
          <Button color="inherit" onClick={handleLogout}>退出登陆</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default withRouter(Header);
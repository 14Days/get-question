import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import style from './index.module.scss';

const Index = () => {
  return (
    <>
      <div className={style.mainContainer}>
        <div className={style.loginArea}>
          <TextField
            id="standard-dense"
            label="用户名"
            margin="normal"
          />
          <TextField
            id="standard-password-input"
            label="密码"
            type="password"
            autoComplete="current-password"
            margin="normal"
          />
          <Button variant="contained" color="primary">
            登陆
          </Button>
        </div>
      </div>
    </>
  );
};

export default Index;

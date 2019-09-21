import React from 'react';
import {Route} from 'react-router-dom';
import Login from './Login'
import Register from './Register';

import style from './index.module.scss';

const Index = ({match}) => {
  return (
    <div className={style.mainContainer}>
      <div className={style.loginArea}>
        <Route exact path={match.path} component={Login}/>
        <Route exact path={`${match.path}register`} component={Register}/>
      </div>
    </div>
  );
};

export default Index;

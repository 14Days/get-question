import React, {useContext, useCallback} from "react";
import {withRouter} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import {TypeContext} from '../../utils/context'

function Questions(props) {
  const {userType, setUserType} = useContext(TypeContext);


  const createType = useCallback(() => {
    let temp = null;
    switch (userType) {
      case 1:
        temp = '小学';
        break;
      case 2:
        temp = '初中';
        break;
      case 3:
        temp = '高中';
        break;
      default:
        temp = '';
    }
    return temp;
  }, [userType]);

  const handleLogout = () => {
    setUserType(1);
    props.history.replace('/')
  };

  return (
    <>
      <div style={{height: '80px'}}>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" style={{flexGrow: 1}}>准备生成{createType()}数学题目</Typography>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </Toolbar>
        </AppBar>
      </div>
      <Container maxWidth={'md'}>
        会尽快开工胡健
      </Container>
    </>
  )
}

export default withRouter(Questions);
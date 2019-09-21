import React, {useEffect, useRef, useState, useContext} from 'react';
import {withRouter} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {UserContext} from '../../utils/context';
import request from '../../utils/request';

function useTimer() {
  const [buttonText, setButtonText] = useState(61);
  const {setErrorMessage} = useContext(UserContext);
  const time = useRef(0);
  const timeText = useRef(buttonText);

  useEffect(() => {
    return () => clearInterval(time.current)
  }, []);

  useEffect(() => {
    timeText.current = buttonText;
  }, [buttonText]);

  const sendCode = async (phone) => {
    if (/0?(13|14|15|17|18|19)[0-9]{9}/.test(phone)) {
      try {
        await request.get('/registered/sendCode', {
          phone
        });
        setButtonText(timeText.current - 1);
        time.current = setInterval(() => {
          if (timeText.current === 0) {
            clearInterval(time.current);
            setButtonText(61)
          } else {
            setButtonText(timeText.current - 1);
          }
        }, 1000);
      } catch (e) {
        setErrorMessage(e.message)
      }
    } else {
      setErrorMessage('电话号码错误')
    }
  };

  return {sendCode, buttonText}
}

function Register(props) {
  const {setErrorMessage} = useContext(UserContext);
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const {sendCode, buttonText} = useTimer();
  const [password, setPassword] = useState({
    one: '',
    two: ''
  });

  const confirmCode = async (code) => {
    try {
      await request.get('/registered/confirmCode', {
        code
      });
      setStep(2);
    } catch (e) {
      setErrorMessage(e.message)
    }
  };

  const commitPassword = async () => {
    if (password.one !== password.two) {
      setErrorMessage('两次密码不一致')
    } else {
      try {
        await request.get('/registered/setPassword', {
          password: password.two
        });
        props.history.replace('/')
      } catch (e) {
        setErrorMessage(e.message)
      }
    }
  };

  const stepOne = (
    <>
      <TextField
        id="phone-input"
        value={phone}
        label="大陆手机"
        margin="normal"
        onChange={(e) => setPhone(e.target.value)}
      />
      <TextField
        id="code-input"
        value={code}
        label="验证码"
        autoComplete="current-password"
        margin="normal"
        onChange={(e) => setCode(e.target.value)}
      />
      <div>
        <Button
          variant="contained"
          color="primary"
          style={{margin: '10px'}}
          onClick={() => sendCode(phone)}
          disabled={buttonText !== 61}
        >
          {buttonText === 61 ? '发送验证码' : `重新发送(${buttonText})`}
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{margin: '10px'}}
          onClick={() => confirmCode(code)}
        >
          验证
        </Button>
      </div>
    </>
  );

  const stepTwo = (
    <>
      <TextField
        id="password-one"
        value={password.one}
        label="密码"
        margin="normal"
        type="password"
        onChange={(e) => setPassword({...password, one: e.target.value})}
      />
      <TextField
        id="password-two"
        value={password.two}
        label="确认密码"
        autoComplete="current-password"
        margin="normal"
        type="password"
        onChange={(e) => setPassword({...password, two: e.target.value})}
      />
      <div>
        <Button
          variant="contained"
          color="primary"
          style={{margin: '10px'}}
          onClick={commitPassword}
        >
          提交
        </Button>
      </div>
    </>
  );

  return (
    step === 1 ? stepOne : stepTwo
  )
}

export default withRouter(Register);
import React, {useEffect, useRef, useState, useContext} from 'react';
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
    return clearInterval(time.current)
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

function Register() {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const {sendCode, buttonText} = useTimer();

  return (
    <>
      <TextField
        id="standard-dense"
        label="大陆手机"
        margin="normal"
        onChange={(e) => setPhone(e.target.value)}
      />
      <TextField
        id="standard-password-input"
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
          disabled={buttonText !== 61}>
          {buttonText === 61 ? '发送验证码' : `重新发送(${buttonText})`}
        </Button>
        <Button variant="contained" color="primary" style={{margin: '10px'}}>
          验证
        </Button>
      </div>
    </>
  )
}

export default Register;
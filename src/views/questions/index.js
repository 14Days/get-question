import React, {useState, useContext} from 'react';
import Container from '@material-ui/core/Container';
import {Paper} from '@material-ui/core';
import {UserContext} from '../../utils/context';
import Header from '../../components/Header';
import Options from './options';
import Main from './main'
import request from '../../utils/request';

import style from './index.module.scss'

function Questions() {
  let temp = null;
  const {setErrorMessage} = useContext(UserContext);
  const [step, setStep] = useState(1);
  const [questionParams, setQuestionParams] = useState({
    num: 10,
    type: 0
  });

  const [rows, setRows] = useState([]);
  const [index, setIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState([]);

  const handleExercise = async () => {
    try {
      const res = await request.get('/questions', questionParams);
      setRows(res.data);
      setStep(2);
      setUserAnswer(Array(res.data.length).fill(0))
    } catch (e) {
      setErrorMessage(e.message)
    }
  };

  const makeChoose = (index) => {
    return (e) => {
      setUserAnswer(() => {
        const tempAnswer = JSON.parse(JSON.stringify(userAnswer));
        tempAnswer[index] = parseInt(e.target.value);
        return tempAnswer;
      })
    };
  };

  const changeIndex = (index) => {
    return (val) => {
      if (index + val < 0) {
        setIndex(0);
      } else if (index + val >= userAnswer.length) {
        setIndex(userAnswer.length - 1);
      } else {
        setIndex(index + val)
      }
    }
  };

  switch (step) {
    case 1: {
      temp = <Options
        questionParams={questionParams}
        setQuestionParams={setQuestionParams}
        handleExercise={handleExercise}
      />;
      break;
    }
    case 2: {
      temp = <Main
        question={rows[index]}
        userAnswer={userAnswer[index]}
        makeChoose={makeChoose(index)}
        changeIndex={changeIndex(index)}
        text={index === userAnswer.length - 1}
      />;
      break;
    }
    default: {
      temp = null;
    }
  }

  return (
    <>
      <Header/>
      <Container maxWidth={'md'} className={style.optionContainer}>
        <Paper className={style.options}>
          {temp}
        </Paper>
      </Container>
    </>
  )
}

export default Questions;
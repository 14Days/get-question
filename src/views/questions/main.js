import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';

function Main(props) {
  const {question: {question, answer}, userAnswer, makeChoose, changeIndex, text} = props;
  return (
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend">{question}</FormLabel>
        <RadioGroup aria-label="gender" name="gender1" value={String(userAnswer)} onChange={makeChoose}>
          {answer.map((item, index) => {
            return <FormControlLabel value={String(index + 1)} control={<Radio/>} label={item}/>
          })}
        </RadioGroup>
        <div>
          <Button variant="contained" color="primary" style={{margin: '10px'}} onClick={() => changeIndex(-1)}>
            上一题
          </Button>
          {
            text ?
              <Button variant="contained" color="primary" style={{margin: '10px'}} onClick={() => changeIndex(1)}>
                提交
              </Button> :
              <Button variant="contained" color="primary" style={{margin: '10px'}} onClick={() => changeIndex(1)}>
                下一题
              </Button>
          }
        </div>
      </FormControl>
    </>
  )
}

export default Main;
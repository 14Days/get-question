import React from 'react';
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

function Options(props) {
  const {questionParams, setQuestionParams, handleExercise} = props;

  const handleSetNum = (e) => {
    let temp = parseInt(e.target.value);

    if (temp > 30) {
      setQuestionParams({...questionParams, num: 30});
    } else if (temp < 10) {
      setQuestionParams({...questionParams, num: 10});
    } else {
      setQuestionParams({...questionParams, num: temp});
    }
  };

  return (
    <>
      <div>
        <TextField
          id="standard-password-input"
          label="题目数量"
          type="number"
          autoComplete="current-password"
          margin="normal"
          value={questionParams.num}
          onChange={handleSetNum}
        />
        <FormControl style={{margin: '16px 0 8px 8px'}}>
          <InputLabel htmlFor="age-simple">Age</InputLabel>
          <Select
            value={questionParams.type}
            onChange={(e) => setQuestionParams({...questionParams, type: e.target.value})}
            inputProps={{
              name: 'type',
              id: 'age-simple',
            }}
          >
            <MenuItem value={0}>小学</MenuItem>
            <MenuItem value={1}>初中</MenuItem>
            <MenuItem value={2}>高中</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <Button variant="contained" color="primary" onClick={handleExercise}>
          生成题目
        </Button>
      </div>
    </>
  )
}

export default Options;
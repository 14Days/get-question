import React from 'react'
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

function Result(props) {
  const {grade, reset} = props;
  return (
    <>
      <div>
        <Typography variant="h2" component="h2">
          你的成绩为{grade}
        </Typography>
      </div>
      <div style={{marginTop: '5vh'}}>
        <Button variant="contained" color="primary" style={{margin: '10px'}} onClick={reset}>
          重新做题
        </Button>
      </div>
    </>
  )
}

export default Result;
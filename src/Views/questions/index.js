import React, {useContext, useState} from "react";
import {withRouter} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {UserContext} from '../../utils/context';
import TextField from "@material-ui/core/TextField";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import style from './index.module.scss'

function Questions(props) {
  const {user, setUser} = useContext(UserContext);

  const [nums, setNums] = useState(10);

  const [rows, setRows] = useState([]);

  const handleLogout = () => {
    setUser('');
    props.history.replace('/')
  };

  const handleSetNum = (e) => {
    let temp = parseInt(e.target.value);

    if (temp > 30) {
      setNums(30);
    } else if (temp < 10) {
      setNums(10)
    } else {
      setNums(temp);
    }
  };

  const handleExercise = async () => {
    setRows([]);
  };

  return (
    <>
      <div style={{height: '70px'}}>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" style={{flexGrow: 1}}>中小学数学考试系统</Typography>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </Toolbar>
        </AppBar>
      </div>
      <Container maxWidth={'md'} className={style.optionContainer}>
        <div>
          <TextField
            id="standard-password-input"
            label="题目数量"
            type="number"
            autoComplete="current-password"
            margin="normal"
            value={nums}
            onChange={handleSetNum}
          />
          <FormControl style={{margin: '16px 0 8px 8px'}}>
            <InputLabel htmlFor="age-simple">Age</InputLabel>
            <Select
              value={1}
              onChange={(e) => console.log(e)}
              inputProps={{
                name: 'type',
                id: 'age-simple',
              }}
            >
              <MenuItem value={1}>小学</MenuItem>
              <MenuItem value={2}>初中</MenuItem>
              <MenuItem value={3}>高中</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleExercise}>
            生成题目
          </Button>
        </div>
        <div className={style.tables}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>序号</TableCell>
                <TableCell align="right">题目</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={row}>
                  <TableCell component="th" scope="row">{index + 1}</TableCell>
                  <TableCell align="right">{row}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Container>
    </>
  )
}

export default withRouter(Questions);
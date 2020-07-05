import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: '0px 4px 1px 4px',
    minWidth: 60,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function BoardSizer({ boardSize, changeBoardSize }) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    boardWidth: boardSize
  });

  const handleChange = (event) => {
    setState(event.target.value);
    changeBoardSize(event.target.value);
  };

  return (
    <div style={{display:'inline-block'}}>
      <FormControl className={classes.formControl}>
        {/* <InputLabel htmlFor="age-native-simple">Board Size</InputLabel> */}
        <Select
          native
          value={state.boardWidth}
          onChange={handleChange}
          inputProps={{
            name: '',
            id: 'age-native-simple',
          }}
        >
          <option aria-label="None" defaultChecked="checked" value="Board Size" />
          <option value={2}>2x2</option>
          <option value={3}>3x3</option>
          <option value={4}>4x4</option>
          <option value={5}>5x5</option>
          <option value={6}>6x6</option>
          <option value={7}>7x7</option>
          <option value={8}>8x8</option>
          <option value={9}>9x9</option>
        </Select>
      </FormControl>

    </div>
  );
}

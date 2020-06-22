import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import RandomIcon from '@material-ui/icons/AllInclusive';
import ImageSearchIcon from '@material-ui/icons/ImageSearchTwoTone';
import LoginIcon from '@material-ui/icons/LockOpenTwoTone';
import { orange } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width:'100%',
    height:'50px',
    position: 'fixed',
    top:'0px',
    boxSizing: 'border-box',
    zIndex:2,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Puzlr
          </Typography>
          <ul className="nav-list">
                    <li className="nav-list-item">
                        {<Link className="nav-link" to="/puzzle/"><RandomIcon color="active"/></Link>}
                    </li>
                    <li className="nav-list-item">
                        {<Link className="nav-link" to="/search"><ImageSearchIcon color="active"/></Link>}
                    </li>
                    <li className="nav-list-item">
                        {<Link className="nav-link" to="/"><LoginIcon color="active" /></Link>}
                    </li>
                </ul>
        </Toolbar>
      </AppBar>
    </div>
  );
}


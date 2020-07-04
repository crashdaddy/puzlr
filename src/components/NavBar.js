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
import { useHistory } from "react-router";
import Talker from './Talker'
import FavoriteIcon from '@material-ui/icons/FavoriteTwoTone';
import Avatar from "./avatar/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    height: '50px',
    position: 'fixed',
    top: '0px',
    boxSizing: 'border-box',
    zIndex: 2,
    display: 'flex'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


export default function NavBar(props) {
  const classes = useStyles();
  const history = useHistory();
  const randomPuzzle = () => {
    props.clearPuzzle();

    history.push({
      pathname: "/puzzle"
    })
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" className={classes.title}>
           <Link to={'/help'} style={{textDecoration:'none',color:'white'}}>Puzlr</Link>
          </Typography>
          <Talker navTalk={props.navTalk} />
          <ul className="nav-list">
            
            <li className="nav-list-item">
              {<Link className="nav-link" onClick={() => randomPuzzle()}><RandomIcon style={{ color: "#ffffff" }} /></Link>}
            </li>
            {props.player ?
            <li className="nav-list-item">
              {<Link className="nav-link" to="/faves"><FavoriteIcon style={{ color: "#ffffff" }} /></Link>}
            </li>
            :
            ''
            }
            <li className="nav-list-item">
              {<Link className="nav-link" to="/search"><ImageSearchIcon style={{ color: "#ffffff" }} /></Link>}
            </li>
            <li className="nav-list-item">
              {props.player ? 
              <Link to={`/profile/${props.player.userName}`} ><Avatar name={props.player.userName} size={35}/></Link>
              :
              <Link className="nav-link" to="/login"><LoginIcon style={{ color: "#ffffff" }} /></Link>
              }
            </li>
          </ul>
        </Toolbar>
      </AppBar>
    </div>
  );
}


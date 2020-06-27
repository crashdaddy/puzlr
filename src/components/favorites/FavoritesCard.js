import React, {Component} from "react";
import '../../App.css';
import SocialLinks from '../SocialLinks';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/HighlightOffTwoTone';
import { red } from '@material-ui/core/colors';
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class FavoritesCard extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          visible: true
        };
      }

      delFave = (faveToDelete) => {
        this.setState({
            visible: false
        })

        this.props.delFave(faveToDelete);
      }

      selectPuzzle = (puzzleID) => {
        this.props.clearPuzzle();
        this.props.history.push({
          pathname: `puzzle/${puzzleID}`
        })
      }
      
    render() {
        return(
            <div>
            {this.state.visible ?
            <Paper key={this.props.idx} className="favoritesCard" elevation={3} >
            <img onClick={()=>this.selectPuzzle(`${this.props.fave.puzzleID}`)} src={`${this.props.fave.puzzleURL}&w=220&h=220`} id={this.props.fave.puzzleID} className="searchResultsImg" style={{height:'220px'}} alt="" />
            <Paper key={this.props.idx+Date.now()} >
            <div style={{padding:'5px'}}><i>Photo by: </i><br/>
            <img src={`${this.props.fave.smallPic}`} style={{width:'100px',height:'100px'}} /><br/>
            <strong>{this.props.fave.author}</strong></div>
            <SocialLinks twitter={this.props.fave.authorTwitter} instagram={this.props.fave.authorInsta} author={this.props.fave.authorUnsplash} style={{display:'inline'}} />
            {/* <p style={{ fontSize: 'x-small' }}>{puzzle.user.bio}</p> */}
          </Paper>
          <DeleteIcon style={{position:'absolute',bottom:'5px',right:'5px',color: red[500]}} onClick={()=>this.delFave(this.props.fave.puzzleID)} />
          </Paper>
          :
          ''
          }
          </div>
        )
    }
}

export default withRouter(FavoritesCard)
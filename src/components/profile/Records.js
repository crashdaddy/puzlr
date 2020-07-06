import React, {Component} from 'react';
import CheatModeOffIcon from '@material-ui/icons/GridOffTwoTone';
import CheatModeOnIcon from '@material-ui/icons/GridOnTwoTone';
import { Redirect } from "react-router";
import Paper from '@material-ui/core/Paper';
import money from '../img/moneyBag.png';
import Moves from '@material-ui/icons/OpenWith';
import TimerIcon from '@material-ui/icons/Timer';

class Records extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          userHistory: [],
          redirecting: false,
          redirectTo: ''
        };
      }

      componentDidMount = () => {
          this.getHistory(this.props.user.profileName);
          console.log("userName ",this.props.user.profileName)
      }

      getHistory = (userName) => {
        let getHistoryURL = "https://puzzlrapi.herokuapp.com/getAllRecordsByUser"

        let queryParams = {
          "username": userName
        }
        fetch(getHistoryURL, {
          method: 'post',
          body: JSON.stringify(queryParams),
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(response => response.json())
          .then(data => {
            if (data.code == "200") {
              console.log(data)
                if (data.record) {
                this.setState({
                    userHistory: data.record
                })
              }
            } else {
              console.log(`We've encountered a problem: ${data.code}  getting the history.`);
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          })
      }

      selectPuzzle = (puzzleID) => {
        this.props.clearPuzzle();
        this.setState({
            redirecting: true,
            redirectTo: puzzleID
        })
      }

    render() {
        if (this.state.redirecting === true) {
            return <Redirect to={`/puzzle/${this.state.redirectTo}`} />
          }
        return ( 
            <div className="historyDiv">
              <Paper className="historyPaper" elevation={3}>
                <h1>{this.props.userName}'s Records!</h1>
                {
               
                this.state.userHistory.length>0 ?
                <div>
                {this.state.userHistory.map(game => 
                    <div onClick={()=>this.selectPuzzle(game.puzzleURL)} style={{verticalAlign:'middle',fontSize:'large',fontWeight:'bold',marginTop:'20px'}}>
                        <img className="historyPicSm" src={`${game.imgpic}`} alt='' />
                        <TimerIcon  fontSize="small" color="primary" style={{verticalAlign:'middle',margin:'0 5px 4px 5px'}}/>
                        {game.gameTime} - 
                        <Moves fontSize="small" color="primary" style={{verticalAlign:'middle',margin:'0 2px 4px 5px'}} /> {game.moves} - 
                        {game.wasCheatModeUsed ?
                        <CheatModeOnIcon  fontSize="small" color="primary" style={{verticalAlign:'middle',margin:'0 5px 4px 5px'}}/>
                        :
                        <CheatModeOffIcon  fontSize="small" color="action" style={{verticalAlign:'middle',margin:'0 5px 4px 5px'}}/>    
                        }
                        - <img src={money} style={{margin:'0px 6px 8px 4px',width:'20px',verticalAlign:'middle'}} /><span style={{color:'green'}}>${game.score}</span> - {game.boardSize}x{game.boardSize} - {new Date(game.createdAt).toLocaleString()}
                    </div>
                )}
                </div>
                :
                <h1>This player has no solved puzls on record!</h1>
                }
                </Paper>
            </div>
        )
    }
}

export default Records
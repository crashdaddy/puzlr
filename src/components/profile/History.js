import React, {Component} from 'react';
import CheatModeOffIcon from '@material-ui/icons/GridOffTwoTone';
import CheatModeOnIcon from '@material-ui/icons/GridOnTwoTone';
import { Redirect } from "react-router";

class History extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          userHistory: [],
          redirecting: false,
          redirectTo: ''
        };
      }

      componentDidMount = () => {
          console.log(this.props.user.userId)
          this.getHistory(this.props.user.userId);
      }

      getHistory = (userID) => {
        let getHistoryURL = "https://puzzlrapi.herokuapp.com/getUserHistory"

        let queryParams = {
          "id": userID
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
              if (data.history) {
                this.setState({
                    userHistory: data.history
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
                <h1>{this.props.userName}'s History</h1>
                {
               
                this.state.userHistory.length>0 ?
                <div>
                {this.state.userHistory.map(game => 
                    <div onClick={()=>this.selectPuzzle(game.puzzleURL)} style={{verticalAlign:'middle',fontSize:'x-large',fontWeight:'bold',marginTop:'20px'}}>
                        <img src={game.puzzlePic} alt='' style={{marginRight:'10px',width:'50px',height:'50px',verticalAlign:'middle'}}/>
                        {game.gameTime} - {game.movesCount} 
                        {game.wasCheatModeUsed ?
                        <CheatModeOnIcon  fontSize="large" color="primary" style={{verticalAlign:'middle',margin:'0 10px'}}/>
                        :
                        <CheatModeOffIcon  fontSize="large" color="action" style={{verticalAlign:'middle',margin:'0 10px'}}/>    
                        }
                        - ${game.gameScore} - {game.board}x{game.board} - {new Date(game.savedAt).toLocaleString()}
                    </div>
                )}
                </div>
                :
                <h1>This player has no solved puzls on record!</h1>
                }
            </div>
        )
    }
}

export default History
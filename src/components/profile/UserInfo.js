import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import money from '../img/moneyBag.png';
import BoardPref from './BoardPref';

class UserInfo extends Component {

    updateUser = (boardPref) => {

        let updateUserURL = 'https://puzzlrapi.herokuapp.com/updateUser';
        let queryParams = {
            "id": this.props.player.id,
            "boardPref": boardPref
        }

        fetch(updateUserURL, {
            method: 'post',
            body: JSON.stringify(queryParams),
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(response => response.json())
            .then(data => {
              if (data.code == "200") {
                this.props.sendMessage("Your preferences have been saved!")
                let player = this.props.player;
                player.boardPref = boardPref;
                this.props.addUser(player);
              } else {
                this.props.sendMessage(`We've encountered a problem: ${data.code} saving your preferences.`);
              }
            })
            .catch((error) => {
              console.error('Error:', error);
            })

    }

    render(){
        console.log("board pref: ", this.props.user.userBoardPref)
        return(
                <Paper className="profileInfo" elevation={3} >
                 <img className="profilePicLarge" alt='' src={`https://robohash.org/${this.props.user.profileName}.png`} />
         
                 <h1>{this.props.user.profileName}</h1> 
                 {this.props.user.userScore ?
                 <div>
                {this.props.player && this.props.player.userName === this.props.user.profileName ? 
                 <span>Set Board Preference <BoardPref boardSize={this.props.user.userBoardPref} updateUser = {this.updateUser} /><br/></span>             
                 :
                 ''
                }
                 <span>Joined: {this.props.user.userCreated.toLocaleString()}</span><br/>
                <span>Puzls unpuzld: {this.props.user.userGamesPlayed}</span><br/>
                <span><img src={money} style={{width:'30px',verticalAlign:'middle'}} /> <span style={{color:'green',verticalAlign:'middle'}}>${this.props.user.userScore.toLocaleString()}</span></span>
                </div>
                :
                "You sure you've got the right name?"
                 }
                </Paper>
        )
    }
}

export default UserInfo
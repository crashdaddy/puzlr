import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';

class UserInfo extends Component {

    render(){
        return(
                <Paper className="profileInfo" elevation={3} >
                 <img className="profilePicLarge" alt='' src={`https://robohash.org/${this.props.user.profileName}.png`} />
         
                 <h1>{this.props.user.profileName}'s profile</h1> 
                 <div>   
                 <span>Created at: {this.props.user.userCreated.toLocaleString()}</span><br/>
                <span>Puzls solved: {this.props.user.userGamesPlayed}</span><br/>
                <span>Score: ${this.props.user.userScore}</span>
                </div>
                </Paper>
        )
    }
}

export default UserInfo
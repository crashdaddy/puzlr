import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';

class UserInfo extends Component {

    render(){
        return(
                <Paper className="profileInfo" elevation={3} >
                 <img className="profilePicLarge" alt='' src={`https://robohash.org/${this.props.user.profileName}.png`} />
         
                 <h1>{this.props.user.profileName}</h1> 
                 <div>   
                 <span>Joined: {this.props.user.userCreated.toLocaleString()}</span><br/>
                <span>Puzls unpuzld: {this.props.user.userGamesPlayed}</span><br/>
                <span>Score: <span style={{color:'green'}}>${this.props.user.userScore}</span></span>
                </div>
                </Paper>
        )
    }
}

export default UserInfo
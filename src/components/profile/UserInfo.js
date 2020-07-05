import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import money from '../img/moneyBag.png';

class UserInfo extends Component {

    render(){
        return(
                <Paper className="profileInfo" elevation={3} >
                 <img className="profilePicLarge" alt='' src={`https://robohash.org/${this.props.user.profileName}.png`} />
         
                 <h1>{this.props.user.profileName}</h1> 
                 {this.props.user.userScore ?
                 <div>                
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
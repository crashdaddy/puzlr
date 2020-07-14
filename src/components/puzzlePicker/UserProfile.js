import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';

class UserProfile extends Component {


    render() {
        
        return (
            <div className="puzzlePickerResultsLayout">
                {this.props.user && this.props.user.map((userprofile, idx) =>
                    <Paper key={idx} className="puzzlePickerDiv" elevation={3} >
                        <Link to={`/profile/${userprofile.user_name}`} ><img className="profilePicLarge" alt='' src={`https://robohash.org/${userprofile.user_name}.png`} /></Link>
                        <div style={{ width: '90%', fontSize: 'small', fontWeight: 'bold', margin: '2px auto', padding: '5px' }}>{userprofile.user_name}</div>

                    </Paper>)}
                    <span style={{fontSize:'80px'}}>himom</span>
            </div>
        )
    }
}

export default UserProfile
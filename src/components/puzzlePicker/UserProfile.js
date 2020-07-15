import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import money from '../img/moneyBag.png';
import WonStar from '@material-ui/icons/StarBorderTwoTone';
import StarIcon from '@material-ui/icons/Star';

class UserProfile extends Component {


    render() {

        return (
            <div style={{width:'100%',marginTop:'50px',backgroundColor:'white'}}>
                {this.props.user.length>0 ?
                    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                        {this.props.user.map((userprofile, idx) =>
                        <Link to={`/profile/${userprofile.user_name}`} >
                            <Paper key={idx} className="profileSearchResults" elevation={3} >
                                <div>
                                <img className="profilePicLarge" alt='' src={`https://robohash.org/${userprofile.user_name}.png`} style={{width:'50px',height:'50px',borderRadius:'50%',border:'1px solid black'}}/>
                                <div style={{ width: '90%', fontSize: 'small', fontWeight: 'bold', margin: '2px auto', padding: '5px' }}>{userprofile.user_name}</div>
                                </div>
                                <div>
                                    <img src={money} style={{verticalAlign:'middle',width:'32px',marginBottom:'10px'}} /><span style={{fontWeight:'bold',color:'green'}}> ${userprofile.totalScore ? userprofile.totalScore.toLocaleString() : 0} </span>
                                </div>
                                <div>
                                <WonStar  style={{fontSize:"32px" ,color: "#D4AF37" }} /> <span style={{color:'#3f51b5',fontWeight:'bold'}}>{userprofile.gamesPlayed.toLocaleString()}</span> 
                                </div>
                                <div>
                                <StarIcon style={{fontSize:"32px", color: "#D4AF37" }} /> <span style={{color:'#3f51b5',fontWeight:'bold'}}>{userprofile.recordsWon.toLocaleString()}</span> 
                                </div>
                            </Paper>
                            </Link>
                            )
                        }
                    </div>
                    :
                    <div style={{ fontSize: '80px' }}>{this.props.message}</div>
                }
            </div>
        )
    }
}

export default UserProfile
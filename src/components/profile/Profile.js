import React, {Component} from 'react';
import UserInfo from './UserInfo';
import History from './History';


class Profile extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          userId: '',
          profileName: this.props.match.params.user,
          userGamesPlayed: 0,
          userScore: 0,
          userBoardPref: 4,
          userCreated: null
        };
      }

      componentDidMount = () => {
        this.getUser();
      }

      getUser = () => {
        let getUserURL = "https://puzzlrapi.herokuapp.com/getUser"

        let queryParams = {
          "userName": this.state.profileName
        }
        fetch(getUserURL, {
          method: 'post',
          body: JSON.stringify(queryParams),
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(response => response.json())
          .then(data => {
            if (data.code == "200") {
              if (data.data[0]) {
                this.setState({
                  userId: data.data[0].id,
                  userScore: data.data[0].score,
                  userBoardPref: data.data[0].boardpref,
                  userCreated: new Date(data.data[0].createdAt).toLocaleString(),
                  userGamesPlayed: data.data[0].gamesPlayed
                })
              }
            } else {
              this.props.sendMessage(`We've encountered a problem: ${data.code}  getting the profile.`);
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          })
      }

    render(){
        return(
            <div>
              {this.state.userCreated ? 
              <div  style={{width:'100%',marginTop:'60px',display:'flex',flexDirection:'row',justifyContent:'center'}}>
              <UserInfo user={this.state} />
              <History clearPuzzle={()=>this.props.clearPuzzle()} userName={this.state.profileName} user={this.state} />
              </div>
                 :
                 'not found'
                }
            </div>
        )
    }
}

export default Profile
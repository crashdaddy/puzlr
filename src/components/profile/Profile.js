import React, {Component} from 'react';


class Profile extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
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
              console.log(data.data[0])
              if (data.data[0]) {
                this.setState({
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
            <div style={{marginTop:'100px'}}>
                
                <img src={`https://robohash.org/${this.state.profileName}.png`} />
         
                 <h1>{this.state.profileName}'s profile</h1> 
                 {this.state.userCreated ?
                 <div>   
                 <span>Created at: {this.state.userCreated.toLocaleString()}</span><br/>
                 <span>Puzls solved: {this.state.userGamesPlayed}</span>
                 </div>
                 :
                 'not found'
                }
            </div>
        )
    }
}

export default Profile
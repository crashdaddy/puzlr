import React, {Component} from 'react';
import UserInfo from './UserInfo';
import History from './History';
import Records from './Records';


class Profile extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          userId: '',
          profileName: this.props.match.params.user,
          userGamesPlayed: 0,
          userScore: 0,
          userBoardPref: 4,
          userRecordsWon: 0,
          userCreated: null,
          showHistory: true
        };
      }

      read_cookie(name) {
        var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
        result && (result = JSON.parse(result[1]));
        return result;
      }

      bake_cookie(name, value) {
        var cookie = [name, '=', JSON.stringify(value), '; domain=.', window.location.host.toString(), '; path=/;'].join('');
        document.cookie = cookie;
      }

      componentDidMount = () => {
        let player={};
        if (this.read_cookie("player")) {
        player = this.read_cookie("player");
        this.props.addUser(player);
        }

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
                  userScore: data.data[0].totalScore,
                  userBoardPref: data.data[0].boardPref,
                  userCreated: new Date(data.data[0].createdAt).toLocaleString(),
                  userGamesPlayed: data.data[0].gamesPlayed,
                  userRecordsWon: data.data[0].recordsWon
                })
              }
            } else {
              this.props.sendMessage(`We've encountered a problem: ${data.code}  getting the profile.`);
              console.log("error data ", data)
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          })
      }

      changeView = () => {
        this.setState({
          showHistory: !this.state.showHistory
        })
      }

      logOut = () => {
        document.cookie = "player= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
        this.props.sendMessage("You're logged off. Come back soon!");
        console.log(this.read_cookie("player"))
        this.props.logOff();
        
        this.bake_cookie("player", null);
        document.cookie.split(";").forEach((c) => {
          document.cookie = c
            .replace(/^ +/, "")
            .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
        
      }

    render(){
        return(
            <div>
              {this.state.userCreated ? 
              <div  style={{width:'100%',marginTop:'60px',display:'flex',flexDirection:'row',justifyContent:'center'}}>
              <UserInfo logOff={this.logOut} changeView={this.changeView} addUser={this.props.addUser} sendMessage={this.props.sendMessage} user={this.state} player={this.props.player} />
              {this.state.showHistory ? 
              <History clearPuzzle={()=>this.props.clearPuzzle()} userName={this.state.profileName} user={this.state} />
              :
              <Records clearPuzzle={()=>this.props.clearPuzzle()} userName={this.state.profileName} user={this.state} />
              }
              </div>
                 :
                 'not found'
                }
            </div>
        )
    }
}

export default Profile
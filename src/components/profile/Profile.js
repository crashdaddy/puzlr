import React, {Component} from 'react';


class Profile extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          profileName: this.props.match.params.user
        };
      }

    render(){
        let avatars = ["set1","set2"];
        return(
            <div style={{marginTop:'100px'}}>
                {avatars.map(set => 
                
                <img src={`https://robohash.org/${this.props.player.userName}.png?set=${set}`} />
                                
                )}
                 <h1>{this.state.profileName}'s profile</h1>   
            </div>
        )
    }
}

export default Profile
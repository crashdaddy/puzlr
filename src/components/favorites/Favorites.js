import React, {Component} from "react";
import '../../App.css';
import SocialLinks from '../SocialLinks';

class Favorites extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          favorites: []
        };
      }

    componentDidMount=()=> {
        this.fetchFaves()
    }

    fetchFaves = () => {
        let getFavesUrl = "https://puzzlrapi.herokuapp.com/getFaves";

        let player = {"id": this.props.player.id};

        fetch(getFavesUrl, {
            method: 'post',
            body: JSON.stringify(player),
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(response => response.json())
            .then(data => {
              if (data.code == "200") {
                this.setState({
                    favorites: data.faves
                })
                this.props.sendMessage("Your favorite puzzles!")
              } else {
                this.props.sendMessage(`We've encountered a problem: ${data.code}  Please try again.`);
              }
            })
            .catch((error) => {
              console.error('Error:', error);
            })

    }


    render() {
        return(
            <div className="favoritesContainer">
                {this.state.favorites.map(fave => 
                    <div style={{width:'100%',display:'block'}}><img src={fave.puzzleURL} style={{width:'100px',height:'100px'}}/> 
                    <img src={fave.smallPic} style={{width:'100px',height:'100px'}} alt='' /> {fave.author} 
                    <SocialLinks twitter={fave.authorTwitter} instagram={fave.authorInsta} author={fave.authorUnsplash} style={{display:'inline'}} />
                    </div>
                )}
            </div>
        )
    }
}

export default Favorites;
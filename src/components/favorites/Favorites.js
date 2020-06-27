import React, {Component} from "react";
import '../../App.css';
import SocialLinks from '../SocialLinks';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/HighlightOffTwoTone';
import { red } from '@material-ui/core/colors';
import FavoritesCard from './FavoritesCard';

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

    delFave = (picUrl) => {
      let delFaveURL = "https://puzzlrapi.herokuapp.com/delFave";
      console.log(picUrl, this.props.player.id)
      let delBody = {
        "id": this.props.player.id,
        "puzzleID": picUrl
      }
  
      fetch(delFaveURL, {
        method: 'post',
        body: JSON.stringify(delBody),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.code == "200") {
            this.props.sendMessage("Removed from Favorites");
  
          } else this.props.sendMessage("something went wrong: ", data.code);
        })
        .catch((error) => {
          console.error('Error:', error);
        })
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
            <div className="puzzlePickerResultsLayout" style={{marginTop:'52px'}}>
                <span style={{backgroundColor:'#ffffff70', width:'100%',fontSize: 'x-large',zIndex:'2', fontWeight: 'bold',marginBottom:'20px',position:'fixed' }}>Photos by <a href="https://unsplash.com/?utm_source=puzlr&utm_medium=referral">Unsplash</a></span>
                <div style={{display:'contents'}}>
                {this.state.favorites.length> 0 ?

                this.state.favorites.map((fave,idx) => 
                <FavoritesCard fave={fave} idx={idx} delFave={this.delFave} />)
                  :
                <div className="noDataDiv">You don't have any favorites!</div>
              }
              </div>     
            </div>
        )
    }
}

export default Favorites;
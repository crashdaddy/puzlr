import React, {Component} from 'react';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import { Link } from 'react-router-dom'

class RightPanel extends Component {

    render() {
        return(
            <div className="sidePanel">
            <div style={{fontSize:'large',fontWeight:'bold'}}>Photo Provided by:</div>
            <img className="referencePic" src={this.props.authorObject.profile_image.large} alt=''  />
            <div style={{fontSize:'24px',fontWeight:'bold'}}><a href = {`${this.props.authorObject.links.html}`} target="blank" >{this.props.authorObject.username}</a></div>
            <div style={{fontSize:"small",maxWidth:'300px'}}>{this.props.authorObject.bio}</div>
            <div className="contactIcons">
             <Link to={`/search/user:${this.props.authorObject.username}`} >
                 <svg viewbox="0 0 24 24" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z" fill="#3f51b5" fill-rule="nonzero" />
                 </svg>
             </Link>
             <a href={`https://www.twitter.com/${this.props.authorObject.twitter_username}`} target="blank"><TwitterIcon color="primary" fontSize="large" style={{marginLeft:'4px'}} /></a>
             <a href={`https://www.instagram.com/${this.props.authorObject.instagram_username}`} target="blank"><InstagramIcon color="primary" fontSize="large" style={{marginLeft:'4px'}}/></a>
            </div>
            </div>
        )
    }
}



export default RightPanel
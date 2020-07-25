import React from 'react';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import '../App.css';
 
export default function SocialLinks(props) {

    return(
        <div className="contactIcons">
        <a href={`https://unsplash.com/@${props.author}`} target="blank" >
            <svg viewBox="0 0 32 32" style={{ margin: "5px" }} width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z" fill="#3f51b5" fillRule="nonzero" />
            </svg>
        </a>
        {props.twitter ?
        <a href={`https://www.twitter.com/${props.twitter}`} target="blank"><TwitterIcon color="primary" fontSize="large" style={{ marginLeft: '4px' }} /></a>
        :
        ''
        }
        {props.instagram ?
        <a href={`https://www.instagram.com/${props.instagram}`} target="blank"><InstagramIcon color="primary" fontSize="large" style={{ marginLeft: '4px' }} /></a>
        :
        ''
        }
    </div>
    )

}

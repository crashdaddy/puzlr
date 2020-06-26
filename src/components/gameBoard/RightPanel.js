import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import SocialLinks from '../SocialLinks';

class RightPanel extends Component {

    render() {
        return (
            <div className="sidePanel">
                <div style={{ fontSize: 'large', fontWeight: 'bold' }}>Photo Provided by:<br />
                    <img className="referencePic" src={this.props.authorObject.profile_image.large} alt='' />
                    <div style={{ fontSize: '24px', fontWeight: 'bold' }}><Link to={`/search/user:${this.props.authorObject.username}`} >{this.props.authorObject.username}</Link></div>
                </div>
                <div style={{ fontSize: "small", maxWidth: '300px' }}>{this.props.authorObject.bio}</div>
                <SocialLinks author={this.props.authorObject.links.html} instagram={this.props.authorObject.instagram_username} twitter={this.props.authorObject.twitter_username} target="blank" />
            </div>
        )
    }
}



export default RightPanel
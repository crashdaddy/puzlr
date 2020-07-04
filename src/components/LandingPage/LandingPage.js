import React from 'react';
import logoPic from './img/Puzzlr-logo.png';
import bigPic from './img/grid.png';
import pic1 from './img/pic1Grid.png';
import pic2 from './img/pic2Grid.png';
import pic3 from './img/pic3Grid.png';
import pic4 from './img/pic4Grid.png';
import pic5 from './img/pic5Grid.png';
import pic6 from './img/pic6Grid.png';
import './landingCSS.css';
import Paper from '@material-ui/core/Paper';

export default function LandingPage() {

    return(
        <div className="landingPageDiv">
            <div className="logoBanner"><img src={logoPic} style={{maxWidth:'30%'}} alt='' /></div>
            <div className="horizontalFlex">
                <Paper style = {{width:'25%',padding:'20px',borderRadius:'15px'}} elevation={3}>
                    <img src={pic3} alt = '' style={{maxWidth:'80%',marginTop:'20px'}} /><br/>
                    Challenge Yourself
                </Paper>
                <Paper style = {{width:'25%',padding:'20px',borderRadius:'15px'}} elevation={3} >
                    <img src={pic2} alt = '' style={{maxWidth:'80%',marginTop:'20px'}} /><br/>
                    Compete with your friends
                </Paper>
                <Paper style = {{width:'25%',padding:'20px',borderRadius:'15px'}} elevation={3} >
                    <img src={pic1} alt = '' style={{maxWidth:'80%',marginTop:'20px'}} /><br/>
                    Relax and unwind
                </Paper>
            </div>
            <div className="bannerDiv">
                Over <span style={{color:'blue'}} >2,000,000+</span> new puzls! 
            </div>
            <div className="bigPicDiv">
                <img src={bigPic} className="bigPic" alt='' />
            </div>
            <div className="bannerDiv" style={{fontSize:'60px'}}>
                Wide spectrum of difficulty settings!
            </div>
            <div className="horizontalFlex">
                <Paper style = {{width:'25%',padding:'20px',borderRadius:'15px'}} elevation={3}>
                    <img src={pic4} alt = '' style={{maxWidth:'80%',marginTop:'20px'}} /><br/>
                    Timely Puzls
                </Paper>
                <Paper style = {{width:'25%',padding:'20px',borderRadius:'15px'}} elevation={3} >
                    <img src={pic5} alt = '' style={{maxWidth:'80%',marginTop:'20px'}} /><br/>
                    Beautiful Puzls
                </Paper>
                <Paper style = {{width:'25%',padding:'20px',borderRadius:'15px'}} elevation={3} >
                    <img src={pic6} alt = '' style={{maxWidth:'80%',marginTop:'20px'}} /><br/>
                    Difficult Puzls
                </Paper>
            </div>
            <div style={{marginTop:'100px',fontSize:'30px',fontStyle:'italic'}}>
                Photos provided by: <a href="https://unsplash.com/?utm_source=puzlr&utm_medium=referral">Unsplash</a>
            </div>
            <div className="bottomBanner" >
                Happy Puzlng!
            </div>
        </div>
    )
}
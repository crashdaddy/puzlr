import React from 'react';
import logoPic from './img/Puzzlr-logo.png';
import bigPic from './img/grid.png';
import pic1 from './img/pic1.png';
import pic2 from './img/pic2.png';
import pic3 from './img/pic3.png';
import './landingCSS.css';
import Paper from '@material-ui/core/Paper';

export default function LandingPage() {

    return(
        <div className="landingPageDiv">
            <div><img src={logoPic} style={{maxWidth:'30%'}} alt='' /></div>
            <div className="horizontalFlex">
                <Paper style = {{width:'30%',height:'300px',padding:'20px'}} elevation={3}>Over 2,000,000+ new Puzls!<br/>
                    <img src={pic1} alt = '' style={{maxWidth:'80%',marginTop:'20px'}} />
                </Paper>
                <Paper style = {{width:'30%',height:'300px',padding:'20px'}} elevation={3} >Compete with your friends!<br/>
                    <img src={pic2} alt = '' style={{maxWidth:'80%',marginTop:'20px'}} />
                </Paper>
                <Paper style = {{width:'30%',height:'300px',padding:'20px'}} elevation={3} >Relax and unwind<br/>
                    <img src={pic3} alt = '' style={{maxWidth:'80%',marginTop:'20px'}} />
                </Paper>
            </div>
            <div className="bannerDiv">
                Over 2,000,000+ new puzls! 
            </div>
            <div className="bigPicDiv">
                <img src={bigPic} style={{width:'80%'}} alt='' />
            </div>
            <div style={{marginTop:'100px',fontSize:'30px',fontStyle:'italic'}}>
                Photos provided by: <a href="https://unsplash.com/?utm_source=puzlr&utm_medium=referral">Unsplash</a>
            </div>
            <div style={{marginTop:'100px',marginBottom:'100px',fontSize:'80px',fontWeight:'bold'}} >
                Happy Puzlng!
            </div>
        </div>
    )
}
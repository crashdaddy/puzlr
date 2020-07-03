import React from 'react';
import {Link} from 'react-router-dom';


// this function takes a string and uses
// a hash to assign a color to that string
// in this case, we're using it to assign
// the backgroundColor to each user's Avatar
// based on their user name
function generateHslColor(username, s, l) {
    var hash = 0;
    for (var i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    var h = hash % 360;
    return 'hsl('+h+', '+s+'%, '+l+'%)';
  }

export default function Avatar(props) {

    const bgColor = generateHslColor(props.name,100,75)

    const avatarStyle = {
        width:`${props.size}px`,
        height:`${props.size}px`,
        verticalAlign:'middle',
        borderRadius:'50%',
        backgroundColor:bgColor
    }

    return(
        <div style={{display:'inline'}}>
           <Link to={`/profile/${props.name}`} ><img src={`https://robohash.org/${props.name}.png`} style={avatarStyle} alt='' /></Link>
            
        </div>
    )

}
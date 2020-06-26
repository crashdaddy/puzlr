import React, { Component } from 'react';

class Talker extends Component {


    render() {  
        return (
            <div style={{textAlign:'center',color:'lightyellow'}}>
                    {this.props.navTalk ?
                        <div>{this.props.navTalk} </div>
                        :
                        <div></div>
                    }
             
            </div>
        )
    }
}

export default Talker;
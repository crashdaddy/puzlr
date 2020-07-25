import React, { Component } from 'react';
import BoardSizer from './BoardSizer';
import CheatModeOffIcon from '@material-ui/icons/GridOffTwoTone';
import CheatModeOnIcon from '@material-ui/icons/GridOnTwoTone';
import FavoriteIcon from '@material-ui/icons/FavoriteTwoTone';
import Avatar from '../avatar/Avatar';
import StartOverIcon from '@material-ui/icons/Cached';
import Moves from '@material-ui/icons/OpenWith';
import money from '../img/moneyBag.png';
import TimerIcon from '@material-ui/icons/Timer';
import ClipboardIcon from '@material-ui/icons/Assignment';

class LeftPanel extends Component {

     copyTextToClipboard= (text) => {
        var textArea = document.createElement("textarea");
      
        //
        // *** This styling is an extra step which is likely not required. ***
        //
        // Why is it here? To ensure:
        // 1. the element is able to have focus and selection.
        // 2. if element was to flash render it has minimal visual impact.
        // 3. less flakyness with selection and copying which **might** occur if
        //    the textarea element is not visible.
        //
        // The likelihood is the element won't even render, not even a
        // flash, so some of these are just precautions. However in
        // Internet Explorer the element is visible whilst the popup
        // box asking the user for permission for the web page to
        // copy to the clipboard.
        //
      
        // Place in top-left corner of screen regardless of scroll position.
        textArea.style.position = 'fixed';
        textArea.style.top = 0;
        textArea.style.left = 0;
      
        // Ensure it has a small width and height. Setting to 1px / 1em
        // doesn't work as this gives a negative w/h on some browsers.
        textArea.style.width = '2em';
        textArea.style.height = '2em';
      
        // We don't need padding, reducing the size if it does flash render.
        textArea.style.padding = 0;
      
        // Clean up any borders.
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
      
        // Avoid flash of white box if rendered for any reason.
        textArea.style.background = 'transparent';
      
      
        textArea.value = text;
      
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
      
        try {
          var successful = document.execCommand('copy');
        //   var msg = successful ? 'successful' : 'unsuccessful';
          this.props.sendMessage(`Puzzle ${text} copied to clipboard`);
        } catch (err) {
            this.props.sendMessage(`Couldn't copy`);
        }
      
        document.body.removeChild(textArea);
      }
    
    copyPuzzleId = () => {
        let selectText=this.props.puzzleID;
       this.copyTextToClipboard(selectText)
    }


    render() {
        return (
            <div className="sidePanel">
                {this.props.player ?
                    <div>Hi, {this.props.player.userName}!</div>
                    :
                    <div>You are not <a href="/login">logged in</a></div>
                }
               <img className="referencePic" src={this.props.referenceImage} alt='' />
                <div style={{display:'inline-flex',flexDirection:'row',justifyContent:'space-around'}}>
                    <ClipboardIcon onClick={()=>this.copyPuzzleId()} fontSize="large" color="action" />
                    <StartOverIcon onClick={this.props.createBoard} fontSize="large" color="action" />
                    <TimerIcon onClick={this.props.toggleTime} fontSize="large" color="action"/>
                    {this.props.cheatMode ?
                        <CheatModeOnIcon onClick={this.props.toggleCheat} fontSize="large" color="primary" />
                        :
                        <CheatModeOffIcon onClick={this.props.toggleCheat} fontSize="large" color="action" />
                    }

                    {this.props.favorite ?
                        <FavoriteIcon onClick={this.props.toggleFavorite} fontSize="large" color="secondary" />
                        :
                        <FavoriteIcon onClick={this.props.toggleFavorite} fontSize="large" color="disabled" />

                    }
                    <BoardSizer boardSize={this.props.boardSize} changeBoardSize={this.props.changeBoardSize} />
                </div>
                
                {this.props.gameOver ? <div style={{ fontSize: 'x-large' }}>You win in {this.props.moves} moves!<br/>
                <img src={money} style={{margin:'0px 6px 8px 4px',width:'20px',verticalAlign:'middle'}} /><span style={{color:'green',fontWeight:'bold'}}> ${this.props.score}</span><br/>
                <div className="timer">{this.props.gameTime}</div>
                </div>
                    :
                    <div style={{ fontSize: 'x-large' }}>
                        <Moves fontSize="xx-large" color="primary" style={{verticalAlign:'middle',margin:'0 2px 4px 5px'}} /> <span style={{fontSize:'xx-large',verticalAlign:'middle'}}>{this.props.moves}</span> <br/>
                        <div className="timer">{this.props.gameTime}</div>
                    </div>
                }
                {this.props.currentRecord ? 
                <div><u>Current Record:</u> <br/> <div style={{fontWeight:'bold'}}><Avatar name={this.props.currentRecordHolder} size={30}/> {this.props.currentRecordHolder}:  <Moves fontSize="small" color="primary" style={{verticalAlign:'middle',margin:'0 2px 4px 5px'}} />{this.props.currentRecord}</div></div>
                :
                <div>No current record for this board!</div>
                }
            </div>
        )
    }
}

export default LeftPanel;
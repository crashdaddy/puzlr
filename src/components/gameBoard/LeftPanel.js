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

class LeftPanel extends Component {


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
import React, { Component } from 'react';
import BoardSizer from './BoardSizer';
import CheatModeOffIcon from '@material-ui/icons/GridOffTwoTone';
import CheatModeOnIcon from '@material-ui/icons/GridOnTwoTone';
import FavoriteIcon from '@material-ui/icons/FavoriteTwoTone';
import Avatar from '../avatar/Avatar';
import StartOverIcon from '@material-ui/icons/Cached';
import Moves from '@material-ui/icons/OpenWith';
import money from '../img/moneyBag.png';

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
                <div>
                    <StartOverIcon onClick={this.props.createBoard} fontSize="large" color="action" />
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
                </div>
                <BoardSizer boardSize={this.props.boardSize} changeBoardSize={this.props.changeBoardSize} />
                {this.props.gameOver ? <div style={{ fontSize: 'x-large' }}>You win in {this.props.moves} moves!<br/>
                <img src={money} style={{margin:'0px 6px 8px 4px',width:'20px',verticalAlign:'middle'}} /><span style={{color:'green',fontWeight:'bold'}}> ${this.props.score}</span>
                </div>
                    :
                    <div style={{ fontSize: 'x-large' }}>
                        <Moves fontSize="small" color="primary" style={{verticalAlign:'middle',margin:'0 2px 4px 5px'}} />  {this.props.moves}<br/>
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
import React, { Component } from 'react';
import BoardSizer from './BoardSizer';
import CheatModeOffIcon from '@material-ui/icons/GridOffTwoTone';
import CheatModeOnIcon from '@material-ui/icons/GridOnTwoTone';
import FavoriteIcon from '@material-ui/icons/FavoriteTwoTone';

class LeftPanel extends Component {


    render() {

        return (
            <div className="sidePanel">
                Hi, {this.props.player.playerName}
                <img className="referencePic" src={this.props.referenceImage} alt='' />
                <div>
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
                <BoardSizer changeBoardSize={this.props.changeBoardSize} />
                {this.props.gameOver ? <div style={{ fontSize: 'x-large' }}>You win in {this.props.moves} moves!</div>
                    :
                    <div style={{ fontSize: 'x-large' }}>Moves: {this.props.moves}</div>
                }
            </div>
        )
    }
}

export default LeftPanel;
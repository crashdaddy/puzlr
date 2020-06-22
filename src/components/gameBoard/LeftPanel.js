import React, {Component} from 'react';
import BoardSizer from './BoardSizer';
import CheatModeIcon from '@material-ui/icons/AccessibleTwoTone';

class LeftPanel extends Component {
    

    render() {
        let cheatStyle = 'action'
        if (this.props.cheatMode) {
            cheatStyle = 'primary'
        }
        return(
        <div className="sidePanel">
        <img className="referencePic" src={this.props.referenceImage} alt='' />
        <div><CheatModeIcon onClick={this.props.toggleCheat} color={cheatStyle}/></div>
        <BoardSizer changeBoardSize={this.props.changeBoardSize} />
        {this.props.gameOver ? <div style={{fontSize:'x-large'}}>You win in {this.props.moves} moves!</div> 
    :
    <div style={{fontSize:'x-large'}}>Moves: {this.props.moves}</div>
    }
    </div>
    )
    }
}

export default LeftPanel;
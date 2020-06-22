import React, {Component} from 'react';
import BoardSizer from './BoardSizer';

class LeftPanel extends Component {

    render() {
        return(
        <div className="sidePanel">
        <img className="referencePic" src={this.props.referenceImage} alt='' />
        <div><button onClick={this.props.resetBoard} >Solve</button></div>
        <BoardSizer changeBoardSize={this.props.changeBoardSize} />
        {this.props.gameOver ? <div style={{fontSize:'x-large'}}>You Win!</div> 
    :
    <div style={{fontSize:'x-large'}}>Moves: {this.props.moves}</div>
    }
    </div>
    )
    }
}

export default LeftPanel;
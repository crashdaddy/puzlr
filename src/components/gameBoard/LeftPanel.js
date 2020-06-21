import React, {Component} from 'react';
import BoardSizer from './BoardSizer';

class LeftPanel extends Component {

    render() {
        return(
            <div className="sidePanel">
        <img className="referencePic" src={this.props.referenceImage} alt='' />
        <div><button onClick={this.props.resetBoard} >Solve</button></div>
        <BoardSizer changeBoardSize={this.changeBoardSize} /></div>

        )
    }
}

export default LeftPanel;
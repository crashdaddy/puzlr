import React, { Component } from 'react';
import Tile from './Tile';

class GameBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board: [],
      firstClick: false,
      selectedTile: '',
      clickedRow: '',
      clickedCol: ''
    };
  }


  checkFirstClick = (id) => {

    if (this.state.firstClick) {
      let rowCol = id.split('-');
      if (rowCol[0] < this.state.clickedRow) {
        this.props.colUp(this.props.board, id)
        this.props.countMove();
      };
      if (rowCol[0] > this.state.clickedRow) {
        this.props.colDown(this.props.board, id);
        this.props.countMove();
      };
      if (rowCol[1] > this.state.clickedCol) {
        this.props.rowRight(this.props.board, id);
        this.props.countMove();
      };
      if (rowCol[1] < this.state.clickedCol) {
        this.props.rowLeft(this.props.board, id);
        this.props.countMove();
      };
      this.clearAll();

    } else {
      let rowCol = id.split('-');
      this.setState({
        firstClick: true,
        clickedRow: rowCol[0],
        clickedCol: rowCol[1]
      })
    }

  }

  clearAll = () => {
    let stateBoard = this.props.board;

    stateBoard.forEach(tile => {
      tile.selected = false;
    })
    this.setState({
      firstClick: false,
      selectedTile: '',
      clickedRow: '',
      clickedCol: ''
    })
  }

  clearSelected = (clickedTile, id) => {
    if (!this.props.gameOver) {
      let stateBoard = this.props.board;
      if (!this.props.clockRunning){
      this.props.timer();
      }
      stateBoard.forEach(tile => {
        if (tile.tile === clickedTile) {
          tile.selected = !tile.selected
          this.setState({
            selectedTile: id
          })
        } else
          tile.selected = false;
      })
      this.setState({
        board: stateBoard
      })
      this.checkFirstClick(id);
    }
  }

  render() {

    return (
      <div>
        {this.props.board.map((tile, idx) => <Tile className="tile" gameOver={this.props.gameOver} cheatMode={this.props.cheatMode} id={this.props.indexBoard[idx]} key={idx} tile={tile} bgImg={this.props.bgImg} clearSelected={() => this.clearSelected(tile.tile, this.props.indexBoard[idx])} />)}
      </div>
    )
  }
}

export default GameBoard;
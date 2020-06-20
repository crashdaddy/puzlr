import React, {Component} from 'react';
import Tile from './Tile';
import {moveDown,moveLeft,moveRight,moveUp} from './Moves';


class GameBoard extends Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      board: [],
      backgroundPos: [],
      firstClick: false,
      clickedRow: '',
      clickedCol: ''
     };
  }

    clearClicks = () => {
      this.setState({
        firstClick: false,
        clickedRow:'',
        clickedCol: ''
      })
    }

    checkFirstClick = (clickedTile,id) => {

      if (this.state.firstClick) {
         let rowCol=id.split('-');
         if (rowCol[0]<this.state.clickedRow) {moveUp(id,this.props.width)};
         if (rowCol[0]>this.state.clickedRow) {moveDown(id,this.props.width)};
         if (rowCol[1]>this.state.clickedCol) {moveRight(id,this.props.width)};
         if (rowCol[1]<this.state.clickedCol) {moveLeft(id,this.props.width)};
         this.clearClicks()
      } else {
        let rowCol=id.split('-');
        this.setState({
          firstClick: true,
          clickedRow: rowCol[0],
          clickedCol: rowCol[1]
        })
        console.log("First click!",rowCol[0]+'-'+rowCol[1]);
      }
    }

    clearSelected = (clickedTile,id) => {
      let stateBoard = this.props.board;
      
      stateBoard.forEach(tile => {
        if (tile.tile===clickedTile) {tile.selected=!tile.selected} else
        tile.selected=false;
      })
      this.setState({
        board: stateBoard
      })
      this.checkFirstClick(clickedTile,id);
    }

   render() {
    
      return(
        <div>
          {this.props.board.map((tile,idx) => <Tile id={this.props.indexBoard[idx]} key={idx} tile={tile.tile} size={tile.size} bgImg={this.props.bgImg} pos={tile.pos} numberPosition={tile.numberPosition} selected={tile.selected} clearSelected={()=>this.clearSelected(tile.tile,this.props.indexBoard[idx])} />)}
        </div>
      )
    }
  }

  export default GameBoard;
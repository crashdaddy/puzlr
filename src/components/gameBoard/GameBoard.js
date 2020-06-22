import React, {Component} from 'react';
import Tile from './Tile';
import {moveDown,moveLeft,moveRight,moveUp,checkWin} from './Moves';


class GameBoard extends Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      board: [],
      backgroundPos: this.props.solvedBoard,
      firstClick: false,
      selectedTile: '',
      clickedRow: '',
      clickedCol: ''
     };
  }

    
    checkFirstClick = (id) => {

      if (this.state.firstClick) {
         let rowCol=id.split('-');
         if (rowCol[0]<this.state.clickedRow) {moveUp(id,this.props.width);
           this.props.countMove();};
         if (rowCol[0]>this.state.clickedRow) {moveDown(id,this.props.width);
          this.props.countMove();};
         if (rowCol[1]>this.state.clickedCol) {moveRight(id,this.props.width);
          this.props.countMove();};
         if (rowCol[1]<this.state.clickedCol) {moveLeft(id,this.props.width);
          this.props.countMove();};
         this.clearAll();
         
      } else {
        let rowCol=id.split('-');
        this.setState({
          firstClick: true,
          clickedRow: rowCol[0],
          clickedCol: rowCol[1]
        })
      }
      if (checkWin( this.props.width, this.props.cheatMode,this.props.solvedBoard)){
        console.log("you win")
        this.props.gameOver();
      }   
    }

    clearAll = () => {
      let stateBoard = this.props.board;

      stateBoard.forEach(tile => {
        tile.selected=false;
      })
      this.setState({
        firstClick: false,
        selectedTile: '',
        clickedRow:'',
        clickedCol: ''
      })
    }

    clearSelected = (clickedTile,id) => {
      let stateBoard = this.props.board;
      
      stateBoard.forEach(tile => {
        if (tile.tile===clickedTile) {tile.selected=!tile.selected
          this.setState({
            selectedTile: id
          })
        } else
        tile.selected=false;
      })
      this.setState({
        board: stateBoard
      })
      this.checkFirstClick(id);
    }
 
   render() {
     
      return(
        <div>
          {this.props.board.map((tile,idx) => <Tile className="tile" id={this.props.indexBoard[idx]} key={idx} tile={tile.tile} size={tile.size} bgImg={this.props.bgImg} pos={tile.pos} numberPosition={tile.numberPosition} selected={tile.selected} clearSelected={()=>this.clearSelected(tile.tile,this.props.indexBoard[idx])} />)}
        </div>
      )
    }
  }

  export default GameBoard;
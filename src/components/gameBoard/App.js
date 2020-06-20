import React, {Component} from 'react';
import BoardSizer from './BoardSizer';
import GameBoard from './GameBoard';
import '../../App.css';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';

function Footer() {

  return (
    <div className="footer">
      <span style={{marginRight:'6px'}}>(c) 2020 -- crazyhappyfuntime.com</span>
      </div>
  )
}


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

 class App extends Component {
  constructor(props) {
    super(props);
console.log(this.props.location.state)
    this.state = { 
      board: [],
      backgroundPos: [],
      indexBoard: [],
      picSize: 600,
      boardWidth: 4,
      boardHeight: 4,
      solve: false,
      imgPic: this.props.location.state.puzzle.urls.raw+`&w=600&h=600`
     };
  }

componentDidMount =() => {

  this.fetchImg();
  this.createBoard();
}

changeBoardSize =(newSize) => {
  this.setState({
    boardWidth: newSize,
    boardHeight: newSize
  },
  this.createBoard);
}

fetchImg = () => {
    let tempImg = new Image();
    tempImg.src= this.state.imgPic;   //'https://source.unsplash.com/random/600x600';
  }

  createBoard = () => {
    console.log(this.state.imgPic);
    let board = [];
    let idxBoard = [];
    let boardWidth = this.state.boardWidth;
    let boardHeight = this.state.boardHeight;
    
    let tileWidth = Math.floor((this.state.picSize)/boardWidth);
    let tileHeight= Math.floor((this.state.picSize)/boardHeight);

    let counter= 0;
    // Outer loop to create parent
    for (let i = 0; i < boardWidth; i++) {
      for (let j=0;j<boardHeight;j++) {
          //  board.push(`<div id='${i}-${j}' style="border:1px solid black;background:url(${imgSrc}) no-repeat;background-position:-${j*tileWidth}px -${i*tileHeight}px;width:${tileWidth}px;height:${tileHeight}px;float:left;">${i}-${j}</div>`)

            board.push({"tile":`${i}-${j}`,"pos": `-${j*tileWidth}px -${i*tileHeight}px`, "numberPosition": counter, "size": tileWidth, "selected": false });
            idxBoard.push(`${i}-${j}`);
            counter++;
      }
    }
    let solvedBoard = [];
    board.forEach(newTile => solvedBoard.push(newTile));
    let shuffledBoard = shuffle(board);
    this.setState({
      board: shuffledBoard,
      backgroundPos: solvedBoard,
      indexBoard: idxBoard
    })
 //   return board;
}

resetBoard = () => {
  let solvedBoard = this.state.backgroundPos
    this.setState({
      board: solvedBoard
    })
}
  

  render() {
    let boardDim = this.state.picSize;
  return (
    <div className="App">
      <div className="sidePanel">
        <img className="referencePic" src={this.props.location.state.puzzle.urls.small} alt='' />
        <div><button onClick={this.resetBoard} >Solve</button></div>
        <BoardSizer changeBoardSize={this.changeBoardSize} /></div>
      <div className="gameBoard" style={{width:`${boardDim}px`,height:`${boardDim}px`}}>
      <GameBoard indexBoard={this.state.indexBoard} board={this.state.board} picSize={this.state.picSize} width={this.state.boardWidth} height={this.state.boardHeight} bgImg={this.state.imgPic} solve={this.state.solve}/>   
      </div>
      <div className="sidePanel">
        <div style={{fontSize:'large',fontWeight:'bold'}}>Photo Provided by:</div>
        <img className="referencePic" src={this.props.location.state.puzzle.user.profile_image.large} alt=''  />
        <div style={{fontSize:'24px',fontWeight:'bold'}}><a href = {`${this.props.location.state.puzzle.user.links.html}`} target="blank" >{this.props.location.state.puzzle.user.username}</a></div>
        <div style={{fontSize:"small",maxWidth:'300px'}}>{this.props.location.state.puzzle.user.bio}</div>
        <div className="contactIcons">
         <a href={`https://www.twitter.com/${this.props.location.state.puzzle.user.twitter_username}`} target="blank"><TwitterIcon color="primary" fontSize="large" style={{marginLeft:'4px'}} /></a>
         <a href={`https://www.instagram.com/${this.props.location.state.puzzle.user.instagram_username}`} target="blank"><InstagramIcon color="primary" fontSize="large" style={{marginLeft:'4px'}}/></a>
        </div>
      </div>
      <Footer />
    </div>
  );
  }
}

export default App;

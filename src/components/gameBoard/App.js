import React, { Component } from 'react';
import GameBoard from './GameBoard';
import RightPanel from './RightPanel';
import LeftPanel from '../../containers/LeftPanel';
import '../../App.css';
import NoData from '../NoData/NoData';
import { checkWin } from './Moves';


function Footer() {

  return (
    <div className="footer">
      <span style={{ marginRight: '6px' }}>(c) 2020 -- crazyhappyfuntime.com</span>
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

    this.state = {
      gameOver: false,
      cheatMode: false,
      moves: 0,
      board: [],
      backgroundPos: [],
      indexBoard: [],
      picSize: 600,
      boardWidth: 4,
      boardHeight: 4,
      imgPic: '',
      authorObject: '',
      favorite: false,
      puzzleId: ''
    };
  }

  componentDidMount = () => {
    this.fetchImg();
    this.createBoard();
}

  // add/remove favorites API
  addFave = () => {
    let addFaveUrl = "https://puzzlrapi.herokuapp.com/addToFaves";

    let newFave = {
      "id": this.props.player.playerId,
      "puzzleUrl": this.state.imgPic,
      "puzzleID": this.state.puzzleId,
      "author": this.state.authorObject.user.username,
      "smallPic": this.state.authorObject.urls.small,
      "authorTwitter": this.state.authorObject.user.twitter_username,
      "authorInsta": this.state.authorObject.user.instagram_username,
      "authorUnsplash": this.state.authorObject.user.links.html
    }

    fetch(addFaveUrl, {
      method: 'post',
      body: JSON.stringify(newFave),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.code == "200") {
          console.log("favorited!")
        } else console.log(`We've encountered a problem: ${data.code}  Please try again.`);
      })
      .catch((error) => {
        console.error('Error:', error);
      })
  }

  delFave = (picUrl) => {
    let delFaveURL = "https://puzzlrapi.herokuapp.com/delFave";

    let delBody = {
      "id": this.props.player.playerID,
      "puzzleID": this.state.puzzleId
    }

    fetch(delFaveURL, {
      method: 'post',
      body: JSON.stringify(delBody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.code == "200") {
          console.log("Removed from Favorites");

        } else console.log("something went wrong: ", data.code);
      })
      .catch((error) => {
        console.error('Error:', error);
      })
  }


  toggleFavorite = () => {
    if (this.state.favorite === false) {
      this.addFave();
    } else {
      this.delFave();
    }
    this.setState({
      favorite: !this.state.favorite
    })
  }

  countMove = () => {
    let moves = this.state.moves + 1;
    this.setState({
      moves: moves
    })
  }

  toggleCheat = () => {
    this.setState({
      cheatMode: !this.state.cheatMode
    }, () => {
      if (checkWin(this.state.boardWidth, this.state.cheatMode, this.state.backgroundPos)) {
        this.setState({
          gameOver: true
        })
      }
    })
  }

  gameOver = () => {
    this.setState({
      gameOver: true
    })
  }

  changeBoardSize = (newSize) => {
    this.setState({
      boardWidth: newSize,
      boardHeight: newSize
    },
      this.createBoard);
  }

  fetchImg = () => {
    let tempImg = new Image();
    let imgUrl = this.state.imgPic
    if (!this.props.puzzle) {
      let photoID = this.props.match.params.id;

      let photoUrl = `https://api.unsplash.com/photos/${photoID}?client_id=kCP52qFRNioBLCNR3E73lsph9nowM6RXl9e8x_PCwaY&w=600&h=600`
      if (!photoID) {
        photoUrl = `https://api.unsplash.com/photos/random?client_id=kCP52qFRNioBLCNR3E73lsph9nowM6RXl9e8x_PCwaY&w=600&h=600`
      }
      fetch(photoUrl)
        .then(res => res.json())
        .then((data) => {
          this.props.addPuzzle(data)
          this.setState({
            puzzleId: data.id,
            imgPic: data.urls.raw,
            authorObject: data
          })
          imgUrl = data.urls.raw;
        })
    } else {
      this.setState({
        puzzleId: this.props.puzzle.id,
        authorObject: this.props.puzzle,
        imgPic: this.props.puzzle.urls.raw + `&w=600&h=600`,
      })
    }
    tempImg.src = imgUrl;   //'https://source.unsplash.com/random/600x600';
  }

  createBoard = () => {
    let board = [];
    let idxBoard = [];
    let boardWidth = this.state.boardWidth;
    let boardHeight = this.state.boardHeight;

    let tileWidth = Math.floor((this.state.picSize) / boardWidth);
    let tileHeight = Math.floor((this.state.picSize) / boardHeight);

    let counter = 0;
    // Outer loop to create parent
    for (let i = 0; i < boardWidth; i++) {
      for (let j = 0; j < boardHeight; j++) {
        //  board.push(`<div id='${i}-${j}' style="border:1px solid black;background:url(${imgSrc}) no-repeat;background-position:-${j*tileWidth}px -${i*tileHeight}px;width:${tileWidth}px;height:${tileHeight}px;float:left;">${i}-${j}</div>`)

        board.push({ "tile": `${i}-${j}`, "pos": `-${j * tileWidth}px -${i * tileHeight}px`, "numberPosition": counter, "size": tileWidth, "selected": false });
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



  render() {
    let boardDim = this.state.picSize;
    return (
      <div>
        {this.state.authorObject ?
          <div className="App">
            <LeftPanel favorite={this.state.favorite} toggleFavorite={this.toggleFavorite} moves={this.state.moves} cheatMode={this.state.cheatMode} toggleCheat={this.toggleCheat} referenceImage={this.state.authorObject.urls.small} gameOver={this.state.gameOver} changeBoardSize={this.changeBoardSize} />
            <div className="gameBoard" style={{ width: `${boardDim}px`, height: `${boardDim}px` }}>
              <GameBoard countMove={this.countMove} gameOver={this.gameOver} indexBoard={this.state.indexBoard} solvedBoard={this.state.backgroundPos} board={this.state.board} picSize={this.state.picSize} width={this.state.boardWidth} height={this.state.boardHeight} bgImg={this.state.imgPic} cheatMode={this.state.cheatMode}  />
            </div>
            <RightPanel authorObject={this.state.authorObject.user} />
          </div>
          :
          <NoData />
        }
        <Footer />

      </div>
    );
  }
}

export default App;

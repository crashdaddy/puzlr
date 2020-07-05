import React, { Component } from 'react';
import GameBoard from './GameBoard';
import RightPanel from './RightPanel';
import LeftPanel from '../../containers/LeftPanel';
import '../../App.css';
import NoData from '../NoData/NoData';


function Footer() {

  return (
    <div className="footer">
      <span style={{ marginRight: '6px' }}>(c) 2020 -- crazyhappyfuntime.com</span>
    </div>
  )
}

// generate a random number in the required range (min-max)
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// set variables for the timer
let seconds = 0, minutes = 0, hours = 0, t;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameOver: false,
      cheatMode: false,
      clockRunning: false,
      gameTime: '00:00:00',
      wasCheatModeUsed: false,
      score: 0,
      moves: 0,
      board: [],
      indexBoard: [],
      picSize: 600,
      boardWidth: 4,
      boardHeight: 4,
      imgPic: '',
      authorObject: '',
      favorite: false,
      puzzleId: '',
      currentRecord: null,
      currentRecordHolder: null
    };
  }

  read_cookie(name) {
    var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
    result && (result = JSON.parse(result[1]));
    return result;
  }

  componentDidMount = () => {
    this.clearTimer();
    this.props.sendMessage("You got this!")
    this.fetchImg();

    if (this.props.player) {
      this.setState({
        boardWidth: this.props.player.boardPref,
        boardHeight: this.props.player.boardPref
      }, () => this.createBoard())
    } else if (this.read_cookie("player")) {
      let player = this.read_cookie("player")
      this.props.addUser(player);
      this.setState({
        boardWidth: player.boardPref,
        boardHeight: player.boardPref
      }, () => this.createBoard())
    } else this.createBoard();
  }

  add = () => {
    if (!this.state.gameOver) {
      seconds++;
      if (seconds >= 100) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
          minutes = 0;
          hours++;
        }
      }
      this.setState({ gameTime: (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds) });
      this.timer();
    }
  }

  stopTime = () => {
    this.setState({ clockRunning: false });
    clearTimeout(t);
  }

  timer = () => {
    this.setState({ clockRunning: true });
    t = setTimeout(this.add, 10);
  }

  clearTimer = () => {
    seconds = 0;
    minutes = 0;
    hours = 0;
    this.setState({ gameTime: "00:00:00" });
  }

  toggleTime = () => {
    if (this.state.clockRunning) {
      this.stopTime()
    } else { this.timer() }
  }

  checkFavorite = (puzzleID) => {
    let checkFaveURL = "https://puzzlrapi.herokuapp.com/checkFavorite";

    let queryParams = {
      "id": this.props.player.id,
      "puzzleID": puzzleID
    }

    fetch(checkFaveURL, {
      method: 'post',
      body: JSON.stringify(queryParams),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.fave) {
          this.setState({
            favorite: true
          })
        }
      })
  }

  addToHistory = () => {
    if (this.props.player) {
      this.props.sendMessage("Good Job!");

      let addToHistoryUrl = "https://puzzlrapi.herokuapp.com/addToHistory";
      console.log("adding to history with score: ", this.state.score)
      let queryParams = {
        "userId": this.props.player.id,
        "gameScore": this.state.score,
        "wasCheatModeUsed": this.state.wasCheatModeUsed,
        "movesCount": this.state.moves,
        "gameTime": this.state.gameTime,
        "board": this.state.boardWidth,
        "puzzleURL": this.state.puzzleId,
        "puzzlePic": this.state.authorObject.urls.small
      }
      fetch(addToHistoryUrl, {
        method: 'post',
        body: JSON.stringify(queryParams),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.code == "200") {
            this.props.sendMessage("Your record has been saved!")
          } else {
            this.props.sendMessage(`We've encountered a problem: ${data.code}  adding your score.`);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        })
    } else this.props.sendMessage("You can't save your score if you're not logged in!")
  }

  getRecord = (puzzleID, boardSize) => {
    let recordUrl = "https://puzzlrapi.herokuapp.com/getRecord"

    let queryParams = {
      "puzzleID": puzzleID,
      "boardSize": boardSize
    }
    fetch(recordUrl, {
      method: 'post',
      body: JSON.stringify(queryParams),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.code == "200") {
          if (data.record) {
            this.setState({
              currentRecord: data.record[0].moves,
              currentRecordHolder: data.record[0].username
            })
          }
        } else {
          this.props.sendMessage(`We've encountered a problem: ${data.code}  getting the high score.`);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      })

  }

  updateRecord = () => {
    this.props.sendMessage("You have the new record!");

    let setRecordUrl = "https://puzzlrapi.herokuapp.com/updateRecord";

    let queryParams = {
      "puzzleID": this.state.puzzleId,
      "boardSize": this.state.boardWidth,
      "playerName": this.props.player.userName,
      "moves": this.state.moves
    }
    fetch(setRecordUrl, {
      method: 'post',
      body: JSON.stringify(queryParams),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.code == "200") {
          this.props.sendMessage("Your record has been saved!")
        } else {
          this.props.sendMessage(`We've encountered a problem: ${data.code}  getting the high score.`);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      })
  }

  newRecord = () => {

    this.props.sendMessage("You have the new record!");

    let setRecordUrl = "https://puzzlrapi.herokuapp.com/newRecord";

    let queryParams = {
      "puzzleID": this.state.puzzleId,
      "boardSize": this.state.boardWidth,
      "playerName": this.props.player.userName,
      "moves": this.state.moves
    }
    fetch(setRecordUrl, {
      method: 'post',
      body: JSON.stringify(queryParams),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.code == "200") {
          this.props.sendMessage("Your record has been saved!")
        } else {
          this.props.sendMessage(`We've encountered a problem: ${data.code}  getting the high score.`);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      })
  }

  checkRecord = () => {
    if (this.props.player) {
      if (this.state.moves < this.state.currentRecord) {
        this.setState({
          currentRecord: this.state.moves,
          currentRecordHolder: this.props.player.userName
        }, this.updateRecord())
      } else if (this.state.currentRecord === null) {
        this.setState({
          currentRecord: this.state.moves,
          currentRecordHolder: this.props.player.userName
        }, this.newRecord())
      }
    } else this.props.sendMessage("Oh no! You're not logged in!")
  }

  triggerDownload = (downloadLocation) => {

    let triggerURL = `https://puzzlrapi.herokuapp.com/triggerDownload`

    let queryParams = {
      "downloadURL": downloadLocation
    }

    fetch(triggerURL, {
      method: 'post',
      body: JSON.stringify(queryParams),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("Download Triggered:", data);
      })
  }

  // add/remove favorites API
  addFave = () => {
    let addFaveUrl = "https://puzzlrapi.herokuapp.com/addToFaves";

    let newFave = {
      "id": this.props.player.id,
      "puzzleUrl": this.state.imgPic,
      "puzzleID": this.state.puzzleId,
      "author": this.state.authorObject.user.username,
      "smallPic": this.state.authorObject.user.profile_image.large,
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
          this.props.sendMessage("Added to your Favorites")
        } else {
          this.props.sendMessage(`We've encountered a problem: ${data.code}  Please try again.`);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      })
  }

  delFave = (picUrl) => {
    let delFaveURL = "https://puzzlrapi.herokuapp.com/delFave";

    let delBody = {
      "id": this.props.player.id,
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
          this.props.sendMessage("Removed from Favorites");

        } else this.props.sendMessage("something went wrong: ", data.code);
      })
      .catch((error) => {
        console.error('Error:', error);
      })
  }

  toggleFavorite = () => {
    if (this.props.player) {
      if (this.state.favorite === false) {
        this.addFave();
      } else {
        this.delFave();
      }
      this.setState({
        favorite: !this.state.favorite
      })
    }
    else {
      this.props.sendMessage("You're not logged in")
    }
  }

  countMove = () => {
    let moves = this.state.moves + 1;
    this.setState({
      moves: moves
    }, () => {
      if (this.winner(this.state.board)) {
        this.gameOver();
        this.checkRecord();
      }
    })
  }

  toggleCheat = () => {
    this.props.sendMessage(`Cheatmode set to ${!this.state.cheatMode}`)
    this.setState({
      cheatMode: !this.state.cheatMode,
      wasCheatModeUsed: true
    }, () => {
      if (this.winner(this.state.board)) {
        this.gameOver();
      }
    })
  }

  gameOver = () => {

    this.stopTime()

    // get the scale for the scores
    // it's dependent on board size
    let scoreMultiplier = 1;
    let boardWidth = this.state.boardWidth;
    if (boardWidth == 2) scoreMultiplier = 10;
    if (boardWidth == 3) scoreMultiplier = 25;
    if (boardWidth == 4 || boardWidth == 5) scoreMultiplier = 100;
    if (boardWidth == 6 || boardWidth == 7) scoreMultiplier = 200;
    if (boardWidth == 8 || boardWidth == 9) scoreMultiplier = 300;

    // calculate the score
    let gameScore = (boardWidth * scoreMultiplier) - this.state.moves;
    if (gameScore < 0) gameScore = 0;
    this.setState({
      gameOver: true,
      score: gameScore
    }, () => this.addToHistory())
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
    let photoID = ''
    if (!this.props.puzzle) {
      photoID = this.props.match.params.id;
      let queryParams = {
        "photoID": photoID
      }

      let photoUrl = `https://puzzlrapi.herokuapp.com/getSingleImage`
      if (!photoID || photoID === '') {
        photoUrl = `https://puzzlrapi.herokuapp.com/getRandomImage`
      }
      fetch(photoUrl, {
        method: 'post',
        body: JSON.stringify(queryParams),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then((data) => {
          photoID = data.id;
          this.props.addPuzzle(data)
          this.setState({
            puzzleId: data.id,
            imgPic: data.urls.raw,
            authorObject: data
          });
          this.triggerDownload(data.links.download_location);
          this.getRecord(data.id, this.state.boardWidth);
          imgUrl = data.urls.raw;
        })
    } else {
      photoID = this.props.puzzle.id;
      this.setState({
        puzzleId: this.props.puzzle.id,
        authorObject: this.props.puzzle,
        imgPic: this.props.puzzle.urls.raw + `&w=600&h=600`,
      })
      this.triggerDownload(this.props.puzzle.links.download_location);
      this.getRecord(this.props.puzzle.id, this.state.boardWidth);
    }
    if (this.props.player) {
      this.checkFavorite(photoID);
    }
    tempImg.src = imgUrl;
  }

  colUp = (newboard, tileID) => {
    let coords = tileID.split('-');
    let col = coords[1]
    let board = [...newboard];
    let temp = board.find(item => item.tile === `0-${col}`);
    let tempPos = temp.pos;
    for (let row = 0; row < this.state.boardHeight - 1; row++) {
      let currentIndex = board.find(item => item.tile === `${row}-${col}`)
      let nextIndex = board.find(item => item.tile === `${row + 1}-${col}`);
      currentIndex.pos = nextIndex.pos
    }

    let lastIndex = board.find(item => item.tile === `${this.state.boardHeight - 1}-${col}`);
    lastIndex.pos = tempPos

    this.setState({
      board: board
    })

  }

  colDown = (newboard, tileID) => {
    let coords = tileID.split('-');
    let col = coords[1]
    let board = [...newboard];

    let tempIndex = board.find(item => item.tile === `${this.state.boardHeight - 1}-${col}`);
    let tempPos = tempIndex.pos
    for (let row = this.state.boardHeight - 1; row > 0; row--) {
      let currentIndex = board.find(item => item.tile === `${row}-${col}`)
      let prevIndex = board.find(item => item.tile === `${row - 1}-${col}`);
      currentIndex.pos = prevIndex.pos
    }

    let lastIndex = board.find(item => item.tile === `${0}-${col}`);
    lastIndex.pos = tempPos

    this.setState({
      board: board
    })

  }

  rowLeft = (newboard, tileID) => {
    let coords = tileID.split('-');
    let row = coords[0]
    let board = [...newboard];

    let tempIndex = board.find(item => item.tile === `${row}-${0}`);
    let tempPos = tempIndex.pos
    for (let col = 0; col < this.state.boardWidth - 1; col++) {
      let currentIndex = board.find(item => item.tile === `${row}-${col}`)
      let prevIndex = board.find(item => item.tile === `${row}-${col + 1}`);
      currentIndex.pos = prevIndex.pos
    }

    let lastIndex = board.find(item => item.tile === `${row}-${this.state.boardWidth - 1}`);
    lastIndex.pos = tempPos

    this.setState({
      board: board
    })
  }


  rowRight = (newboard, tileID) => {
    let coords = tileID.split('-');
    let row = coords[0]
    let board = [...newboard];

    let tempIndex = board.find(item => item.tile === `${row}-${this.state.boardWidth - 1}`);
    let tempPos = tempIndex.pos
    for (let col = this.state.boardWidth - 1; col > 0; col--) {
      let currentIndex = board.find(item => item.tile === `${row}-${col}`)
      let prevIndex = board.find(item => item.tile === `${row}-${col - 1}`);
      currentIndex.pos = prevIndex.pos
    }

    let lastIndex = board.find(item => item.tile === `${row}-${0}`);
    lastIndex.pos = tempPos

    this.setState({
      board: board
    })
  }

  // this function performs a random set of permutations on the
  // gameboard to shuffle the picture around

  shuffleBoard = (board) => {

    // we're going to perform 30 random moves
    for (let i = 0; i < 30; i++) {
      // first pick a tile to start from
      let randomX = getRandomInt(0, this.state.boardWidth - 1);
      let randomY = getRandomInt(0, this.state.boardHeight - 1);
      // construct its ID
      let randomCell = `${randomX}-${randomY}`;

      // pick a random direction
      let randomDirection = getRandomInt(0, 3);
      // perform the move
      switch (randomDirection) {
        case 0:
          this.rowLeft(board, randomCell);
          break;
        case 1:
          this.rowRight(board, randomCell);
          break;
        case 2:
          this.colUp(board, randomCell);
          break;
        case 3:
          this.colDown(board, randomCell);
          break; default:
      }
    }

    // if it somehow ends up solved after all that scrambling, mess it all up again!
    if (this.winner(board)) {
      this.shuffleBoard(board);
    }
  }

  winner = (board) => {
    let youWin = true
    board.forEach(tile => {
      if (tile.pos !== tile.shouldBe) {
        youWin = false
      }
    })

    return youWin
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
        board.push({ "tile": `${i}-${j}`, "pos": `-${j * tileWidth}px -${i * tileHeight}px`, shouldBe: `-${j * tileWidth}px -${i * tileHeight}px`, "numberPosition": counter, "size": tileWidth, "selected": false });
        idxBoard.push(`${i}-${j}`);
        counter++;
      }
    }

    this.shuffleBoard(board);
    this.setState({
      moves: 0,
      gameOver: false,
      board: board,
      indexBoard: idxBoard
    })

    this.getRecord(this.state.puzzleId, boardWidth)
  }



  render() {
    let boardDim = this.state.picSize;
    return (
      <div>
        {this.state.authorObject ?
          <div className="App">
            <LeftPanel toggleTime={this.toggleTime} gameTime={this.state.gameTime} createBoard={this.createBoard} boardSize={this.state.boardWidth} currentRecord={this.state.currentRecord} currentRecordHolder={this.state.currentRecordHolder} favorite={this.state.favorite} toggleFavorite={this.toggleFavorite} moves={this.state.moves} cheatMode={this.state.cheatMode} toggleCheat={this.toggleCheat} referenceImage={this.state.authorObject.urls.small} score={this.state.score} gameOver={this.state.gameOver} changeBoardSize={this.changeBoardSize} />
            <div className="gameBoard" style={{ width: `${boardDim}px`, height: `${boardDim}px` }}>
              <GameBoard timer={this.timer} gameOver={this.state.gameOver} rowRight={this.rowRight} rowLeft={this.rowLeft} colUp={this.colUp} colDown={this.colDown} countMove={this.countMove} indexBoard={this.state.indexBoard} board={this.state.board} picSize={this.state.picSize} width={this.state.boardWidth} height={this.state.boardHeight} bgImg={this.state.imgPic} cheatMode={this.state.cheatMode} />
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

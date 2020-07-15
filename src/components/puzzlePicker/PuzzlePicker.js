import React, { Component } from 'react';
import SearchForm from './SearchForm';
import PopularSearches from './PopularSearches';
import UserProfile from './UserProfile'
import Paper from '@material-ui/core/Paper';
import NoData from '../NoData/NoData';

class PuzzlePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stateMessage: 'Loading',
      profileQuery: false,
      userProfile: [],
      puzzlePix: [],
      query: '',
      pageNumber: 1,
      imgPic: '',
      APIUrl: ''
    };
  }


  infiniteScroll = () => {
    // End of the document reached?
    if (window.innerHeight + document.documentElement.scrollTop
      === document.documentElement.offsetHeight) {

      let newPage = this.state.pageNumber;
      newPage++;
      this.setState({
        pageNumber: newPage
      });
      this.fetchImg(this.state.APIUrl, newPage);
    }
  }

  // keeps track of what the user's typing in the search box
  handleChange = (event) => {
    this.setState({ query: event.target.value });
  }

  // when they click the "popular searches" chips
  filterSearch = (searchTerm) => {
    this.setState({
      query: '',
      profileQuery: false
    })
    this.querySearch(searchTerm);
  }

  //selected a puzzle, clicked it, and ready to solve!
  puzzlePick = (ev) => {
    let selectedPuzzle = this.state.puzzlePix.find(puzzle => puzzle.id === ev.target.id)
    this.props.addPuzzle(selectedPuzzle)
    this.props.history.push(`/puzzle/${selectedPuzzle.id}`);
  }

  // when user types something into the search bar
  handleSearch = (event) => {
    // don't reload the page
    event.preventDefault();
    let searchTerm = this.state.query;
    this.querySearch(searchTerm)
  }

  querySearch = (query) => {
    
    let userquery = ''
    let searchType="images";
    let APIendpoint = `https://puzzlrapi.herokuapp.com/getQueryPix?query=${query}`;

    if (query.includes('user:')) {
      userquery = query.substr(5).trim();
      APIendpoint =  `https://puzzlrapi.herokuapp.com/getPixByUser?user=${userquery}`;   
    } else if (query === '') {
      APIendpoint =  `https://puzzlrapi.herokuapp.com/getRandomPix?query=`;  
    } else if (query.includes('player:')){
      searchType="player";
      this.setState({
        profileQuery: true
      })
      userquery = query.substr(7).trim();
      APIendpoint =  `https://puzzlrapi.herokuapp.com/getUsersLike?user=${userquery}`;  
    }
    // clear out existing articles
    this.setState({
      query: query,
      puzzlePix: [],
      APIUrl: APIendpoint,
      pageNumber: 1
    });
    // load new articles
    if (searchType==="player") {
      this.searchUserProfiles(userquery);
    }else{ this.fetchImg(APIendpoint, 1);}
  }

  searchUserProfiles = (lookingFor) => {
    let delFaveURL = "https://puzzlrapi.herokuapp.com/getUsersLike";
      
    let delBody = {
      "userName": lookingFor      
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
          console.log(data)
          this.setState({
            userProfile: data.data
          })
        } else this.props.sendMessage("something went wrong: ", data.code);
      })
      .catch((error) => {
        console.error('Error:', error);
      })
  }

  componentDidMount = () => {
    this.props.addPuzzle(null);
    const { match: { params } } = this.props;
    let query = '';
    if (params.query) {
      this.setState({
        query: params.query
      })
      query = params.query
    }
    this.querySearch(query)
    window.addEventListener('scroll', this.infiniteScroll);
    this.props.sendMessage("Pick a winner!")
  }


  fetchImg = (searchURL, page) => {
    // this.setState({
    //   stateMessage: 'Loading...'
    // })
    this.props.sendMessage("looking for it")
    let imgUrl = searchURL + `&page=${page}`;
    fetch(imgUrl)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("HTTP status " + response.status);
        }
        return response.json();
      })
      .then(data => {
        let newData = data;

        if (data.results) { newData = data.results } else {
          this.props.sendMessage("Can't find it")
          this.setState({
            stateMessage: "That search brought no results"
          })
        }
        this.props.sendMessage("let's find a good one");
        this.setState({
          puzzlePix: [...this.state.puzzlePix, ...newData]
        })
      })
      .catch(error => {
        this.setState({
          puzzlePix: null
        })
        this.setState({
          stateMessage: "some kind of funny business going on"
        })
      })
  }

  render() {
    let puzzleList = this.state.puzzlePix;
    return (
      <div>

        {puzzleList ?
          <div className="puzzlePickerWrapper">
            <div className="searchHeader">
              <SearchForm handleSubmit={this.handleSearch} handleChange={this.handleChange} query={this.state.query} />
              <PopularSearches filterSearch={this.filterSearch} />
            </div>
            {this.state.profileQuery ?     
            <UserProfile message={this.state.stateMessage} user={this.state.userProfile} />
            :
            <div className="puzzlePickerResultsLayout">
              {puzzleList.map((puzzle, idx) => <Paper key={idx} className="puzzlePickerDiv" elevation={3} >
                <img src={`${puzzle.urls.small}&w=150`} id={puzzle.id} className="searchResultsImg" alt="" onClick={this.puzzlePick} />
                <div style={{ width: '90%', fontSize: 'small', fontWeight: 'bold', margin: '2px auto',padding:'5px' }}>{puzzle.alt_description}</div>
                <div style={{padding:'5px'}}><i>Photo by: <a href={`${puzzle.user.links.html}?utm_source=puzzlr&utm_medium=referral`} target="blank"><strong>{puzzle.user.username}</strong></a> on <a href="https://unsplash.com/?utm_source=puzzlr&utm_medium=referral">Unsplash</a></i></div>
                {/* <p style={{ fontSize: 'x-small' }}>{puzzle.user.bio}</p> */}
              </Paper>)}
            </div>
                 
            }
          </div>
          :
          <NoData />
        }
      </div>
    )
  }
}

export default PuzzlePicker;
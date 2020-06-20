import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchForm from './SearchForm';
import PopularSearches from './PopularSearches';
import Paper from '@material-ui/core/Paper';
import NoData from '../NoData/NoData';

class PuzzlePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      puzzlePix: [],
      query: '',
      pageNumber: 1,
      imgPic: '',
      APIUrl: 'https://api.unsplash.com/photos/random?count=30&orientation=squarish&client_id=kCP52qFRNioBLCNR3E73lsph9nowM6RXl9e8x_PCwaY'
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
    this.querySearch(searchTerm);
  }

  // when user types something into the search bar
  handleSearch = (event) => {
    // don't reload the page
    event.preventDefault();
    let searchTerm = this.state.query;
    this.querySearch(searchTerm)
  }

  querySearch = (query) => {
    let APIendpoint = `https://api.unsplash.com/search/photos?query=${query}&per_page=30&orientation=squarish&client_id=kCP52qFRNioBLCNR3E73lsph9nowM6RXl9e8x_PCwaY`;
        // clear out existing articles
    this.setState({
      query: query,
      puzzlePix: [],
      APIUrl: APIendpoint,
      pageNumber: 1
    });
    // load new articles
    this.fetchImg(APIendpoint,1);
  }

  componentDidMount = () => {
    this.fetchImg(this.state.APIUrl,this.state.pageNumber);
    window.addEventListener('scroll', this.infiniteScroll);
  }
 

  fetchImg = (searchURL,page) => {
    let imgUrl = searchURL + `&page=${page}`;
    fetch(imgUrl)
      .then(res => res.json())
      .then(data => {
        let newData = data;
        if (data.results) {newData=data.results}
        this.setState({
          puzzlePix: [...this.state.puzzlePix, ...newData]
        })
      })
  }

  render() {
    let puzzleList = this.state.puzzlePix;
    return (
      <div>
      {puzzleList ? 
      <div className="puzzlePickerWrapper">
       <SearchForm handleSubmit={this.handleSearch} handleChange={this.handleChange} query={this.props.query} />
        <PopularSearches filterSearch={this.filterSearch} />
        <div style={{display:'inline-flex',width:'96%',margin:'20px auto',flexWrap: 'wrap'}}>
        {puzzleList.map((puzzle,idx) => <Paper key={idx} className="puzzlePickerDiv" >
          <Link to={{ pathname: `/puzzle/${puzzle.id}`, state: { puzzle} }} ><img src={`${puzzle.urls.full}&w=150`} className="searchResultsImg" alt="" /></Link>
          <div style={{width:'90%',fontSize:'small',fontWeight:'bold',margin:'2px auto'}}>{puzzle.alt_description}</div>
          <i>Photo by: <a href={`${puzzle.user.links.html}?utm_source=puzzlr&utm_medium=referral`} target="blank"><strong>{puzzle.user.username}</strong></a> on <a href="https://unsplash.com/?utm_source=puzzlr&utm_medium=referral">Unsplash</a></i>
          <p style={{ fontSize: 'x-small' }}>{puzzle.user.bio}</p>
        </Paper>)}
        </div>
      </div>
      :
      <NoData /> 
      }
      </div>
    )
  }
}

export default PuzzlePicker;
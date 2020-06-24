import React, { Component } from 'react';
import SearchIcon from '@material-ui/icons/Search';


// The search box
class SearchForm extends Component {

    render() {
        return (
            <div style={{ display: 'contents', marginBottom: '20px', width: '50%' }}>
                <span style={{ fontSize: 'x-large', fontWeight: 'bold' }}>Photos by <a href="https://unsplash.com/?utm_source=puzlr&utm_medium=referral">Unsplash</a></span>
                <form onSubmit={this.props.handleSubmit} style={{ float: 'left', width: '100%', margin: '10px auto' }}>
                    <input onChange={this.props.handleChange} style={{ height: '30px', fontSize: '24px', minWidth: '50%', maxWwidth: '100%', verticalAlign: 'middle' }} type="text" name="name" placeholder="What kind of puzzle do you like?" value={this.props.query} />
                    <SearchIcon color="primary" fontSize="large" style={{ marginLeft: '4px', verticalAlign: 'middle' }} onClick={this.props.handleSubmit} />
                    {/* <input className = "submitButton" type="submit" value="Search PNN News" /> */}
                </form>
            </div>
        )
    }
}

export default SearchForm;
import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';

const randomIntBetween = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

class PopularSearches extends Component {


    render() {
        let popularSearches = ['technology', 'architecture', 'fantasy', 'music', 'abstract', 'space', 'cat', 'perspective',
            'nature', 'landscape', 'microscopic', 'downtown', 'urban', 'travel', 'religion', 'girl', 'aerial', 'wildlife']
        let chipsArray = [];
        for (let i = 0; i < 7; i++) {
            chipsArray.push(popularSearches[randomIntBetween(0, popularSearches.length - 1)])
        }

        return (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyItems: 'space-evenly' }}>
                <Paper style={{ width: '70%', margin: '10px auto', padding: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }} elevation={3} >
                    {chipsArray.map((popularSearch, idx) => <Chip key={idx} label={popularSearch} onClick={() => this.props.filterSearch(popularSearch)} />)}

                </Paper>
            </div>
        )
    }
}

export default PopularSearches
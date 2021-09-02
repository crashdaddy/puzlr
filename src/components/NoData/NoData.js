import React from 'react';
import kofi from './ko-fi.png';

function NoData() {

    return (
        <div className="noDataDiv">
            The API that provides us with new and original photos has a rate limit of 5,000 requests per hour, which we seem to have exceeded.
            <p />Help us fund increased API rate limits!<br />
            <p style={{fontSize:'small'}}>If this is the first tine you're seeing this message, please wait a minute for the data feed to connect</p>
            <p />
            <a href="https://www.ko-fi.com/crashdaddy" target="blank"><img src={kofi} alt='' style={{ maxWidth: '250px' }} /></a>
        </div>
    )
}

export default NoData;
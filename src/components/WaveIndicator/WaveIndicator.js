import React from 'react';
import PropTypes from 'prop-types';

import './less/WaveIndicator.css';

const WaveIndicator = (props) => {

    const {result} = props;

    const getBestResult = () => {
        const diffs = Object.keys(result).map(key => parseFloat(key));
        if (diffs.length > 0) {
            const values = result[Math.max(...diffs)];
            const bestMatch = values[Math.floor(Math.random() * values.length)];
            const {start, end, startStations, endStations} = bestMatch;
            const startFreq = parseFloat(start);
            const endFreq = parseFloat(end);
            const bestFrequency = Math.round((((endFreq - startFreq) / 2) + startFreq) * 10) / 10;
            return (
                <div>
                    <small>{`${start} FM ${startStations[0].program}`}</small>
                    <h2>{`${bestFrequency} FM`}</h2>
                    <small>{`${end} FM ${endStations[0].program}`}</small>
                </div>
            );
        }
        return (
            <h2>{`No Result :(`}</h2>
        );
    };

    return (
        <div>
            <div className='WaveIndicator-result'>
                {result ? getBestResult() : `0.0 FM`}
            </div>
        </div>
    )

};

WaveIndicator.propTypes = {
    result: PropTypes.shape()
};

export default WaveIndicator;
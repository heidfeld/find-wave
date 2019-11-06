import React from 'react';
import PropTypes from 'prop-types';

import './less/WaveIndicator.css';

const WaveIndicator = (props) => {

    const {result, t} = props;

    const validResult = (anyResult) => {
        const {start, end, startStations, endStations} = anyResult;
        return start && end && startStations && Array.isArray(startStations) && endStations && Array.isArray(endStations);
    };

    const getBestResult = () => {
        const diffs = Object.keys(result).map(key => parseFloat(key));
        if (diffs.length > 0) {
            const values = result[Math.max(...diffs)];
            const bestMatch = values[Math.floor(Math.random() * values.length)];
            const {start, end, startStations, endStations} = bestMatch;
            if (!validResult(bestMatch)) {
                return (
                    <h2>{t('noResult')}</h2>
                );
            }
            const startFreq = parseFloat(start);
            const endFreq = parseFloat(end);
            const bestFrequency = Math.round((((endFreq - startFreq) / 2) + startFreq) * 10) / 10;
            return (
                <div>
                    <small>{`${start} FM ${startStations[0].program} (${t(`provinces.${startStations[0].province}`)})`}</small>
                    <h2>{`${bestFrequency} FM`}</h2>
                    <small>{`${end} FM ${endStations[0].program} (${t(`provinces.${endStations[0].province}`)})`}</small>
                </div>
            );
        }
        return (
            <h2>{t('noResult')}</h2>
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
    result: PropTypes.objectOf(
        PropTypes.arrayOf(
            PropTypes.shape({
                start: PropTypes.number,
                end: PropTypes.number,
                startStations: PropTypes.arrayOf(PropTypes.shape()),
                endStations: PropTypes.arrayOf(PropTypes.shape())
            })
        )
    ),
    t: PropTypes.func.isRequired
};

export default WaveIndicator;
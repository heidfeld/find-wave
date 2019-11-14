import React from 'react';
import PropTypes from 'prop-types';

import './less/WaveIndicator.css';

const leftClass ='WaveIndicator-boundaryStation WaveIndicator-leftStation';
const rightClass = 'WaveIndicator-boundaryStation WaveIndicator-rightStation';
const centerClass = 'WaveIndicator-centerResult';

const WaveIndicator = (props) => {

    const {result, t} = props;

    const validResult = (anyResult) => {
        const {start, end, startStations, endStations} = anyResult;
        return start && end && startStations && Array.isArray(startStations) && endStations && Array.isArray(endStations);
    };

    const createBoundaryResult = (freq, station) => {
        const {province, program} = station;
        return {
            frequency: freq,
            frequencyText: `${freq} FM`,
            program,
            province,
            provinceText: t(`provinces.${province}`)
        }
    };

    const createBestResult = (freq) => {
        return {
            frequency: freq,
            frequencyText: `${freq} FM`
        }
    };

    const getResult = () => {
        const diffs = Object.keys(result).map(key => parseFloat(key));
        if (diffs.length > 0) {
            const values = result[Math.max(...diffs)];
            const bestMatch = values[Math.floor(Math.random() * values.length)];
            const {start, end, startStations, endStations} = bestMatch;
            if (!validResult(bestMatch)) {
                return {};
            }
            const startFreq = parseFloat(start);
            const endFreq = parseFloat(end);
            const bestFrequency = Math.round((((endFreq - startFreq) / 2) + startFreq) * 10) / 10;
            return {
                prevStation: createBoundaryResult(start, startStations[0]),
                nextStation: createBoundaryResult(end, endStations[0]),
                bestStation: createBestResult(bestFrequency)
            };
        }
        return {};
    };

    const renderFullResult = (result) => {
        const {prevStation, nextStation, bestStation} = result;
        return (
            <div>
                <div className={leftClass}>
                    <div className='WaveIndicator-frequency'>{prevStation.frequencyText}</div>
                    <div className='WaveIndicator-program'>{prevStation.program}</div>
                    <div className='WaveIndicator-province'>{prevStation.provinceText}</div>
                </div>
                <div className={centerClass}>
                    {bestStation.frequencyText}
                </div>
                <div className={rightClass}>
                    <div className='WaveIndicator-frequency'>{nextStation.frequencyText}</div>
                    <div className='WaveIndicator-program'>{nextStation.program}</div>
                    <div className='WaveIndicator-province'>{nextStation.provinceText}</div>
                </div>
            </div>
        );
    };

    const renderNoResult = () => {
        return (
            <div>
                <div className={leftClass}>0.0 FM</div>
                <div className={centerClass}>0.0 FM</div>
                <div className={rightClass}>0.0 FM</div>
            </div>
        );
    };

    const renderResults = () => {
        const result = getResult() || {};
        const {prevStation, nextStation, bestStation} = result;
        if (prevStation && nextStation && bestStation) {
            return renderFullResult(result);
        }
        return renderNoResult();
    };

    return (
        <div>
            <div className='WaveIndicator-result'>
                {result ? renderResults() : renderNoResult()}
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
import React from 'react';
import PropTypes from 'prop-types';

import './less/WaveIndicator.css';

const WaveIndicator = (props) => {

    const {bestResult, anotherResults} = props;

    return (
        <div>
            <div>
                {`Result: ${bestResult.toFixed(1)}`}
            </div>
            <div>
                {`Another results: ${anotherResults}`}
            </div>
        </div>
    )

};

WaveIndicator.defaultProps = {
    bestResult: 0.0,
    anotherResults: []
};

WaveIndicator.propTypes = {
    bestResult: PropTypes.number,
    anotherResults: PropTypes.arrayOf(PropTypes.number)
};

export default WaveIndicator;
import React from 'react';
import PropTypes from 'prop-types';

import './less/Button.css';

const Button = (props) => {

    const {onClick, text, width, height, backgroundColor, fontSize} = props;

    return (
        <button
            style={{width: width, height: height, backgroundColor: backgroundColor, fontSize: fontSize}}
            className='Button'
            onClick={onClick}
        >
            {text}
        </button>
    )

};

Button.defaultProps = {
    width: 200,
    height: 100,
    backgroundColor: 'green',
    fontSize: 14
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    fontSize: PropTypes.number,
    backgroundColor: PropTypes.string,
    onClick: PropTypes.func.isRequired
};

export default Button;
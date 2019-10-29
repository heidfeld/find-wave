import React from 'react';
import PropTypes from 'prop-types';

import './less/Button.css';

const Button = (props) => {

    const {onClick, text} = props;

    return (
        <button className='Button' onClick={onClick}>
            {text}
        </button>
    )

};

Button.defaultProps = {
    width: 200,
    height: 100,
    backgroundColor: 'green'
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    backgroundColor: PropTypes.string,
    onClick: PropTypes.func.isRequired
};

export default Button;
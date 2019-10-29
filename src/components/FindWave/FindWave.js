import React, {useState} from 'react';
import PropTypes from 'prop-types';

import './less/FindWave.css'
import logo from "../../logo.svg";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import WaveIndicator from "../WaveIndicator/WaveIndicator";
import Button from "../Button/Button";

const FindWave = (props) => {

    const [result, setResult] = useState(99.7);
    const [altResults, setAltResults] = useState([]);

    const {i18n, t} = props;

    const handleLanguage = (evt, lan) => {
        if (i18n) {
            return i18n.changeLanguage(lan);
        }
    };

    const handleResult = () => {
        setResult(result + 0.1);
    };

    return (
        <div className="FindWave">
            <LanguageSwitcher onClick={handleLanguage}/>
            <div className="FindWave-header">
                <img src={logo} className="FindWave-logo" alt="logo"/>
                <h2>Find Wave</h2>
            </div>
            <div className="FindWave-container">
                <WaveIndicator
                    bestResult={result}
                    anotherResults={altResults}
                />
                <Button
                    width={200}
                    height={40}
                    fontSize={20}
                    backgroundColor={'#862c2c'}
                    text={t('searchWave')}
                    onClick={handleResult}
                />
            </div>
        </div>
    );

};

FindWave.defaultProps = {
};

FindWave.propTypes = {
    i18n: PropTypes.shape().isRequired,
    t: PropTypes.func.isRequired
};

export default FindWave;
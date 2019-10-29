import React, {Component} from 'react';
import { withTranslation } from 'react-i18next';

import logo from './logo.svg';
import './App.css';
import WaveIndicator from './components/WaveIndicator/WaveIndicator';
import Button from './components/Button/Button';
import LanguageSwitcher from "./components/LanguageSwitcher/LanguageSwitcher";

class App extends Component {

    constructor(props) {
        super(props);
        this.handleLanguage = this.handleLanguage.bind(this);
    }

    handleLanguage(evt, lan) {
        const {i18n} = this.props;
        if (i18n) {
            return i18n.changeLanguage(lan);
        }
    }

    render() {
        const {t} = this.props;
        return (
            <div className="App">
                <LanguageSwitcher onClick={this.handleLanguage}/>
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Find Wave</h2>
                </div>
                <div className="App-container">
                    <WaveIndicator/>
                    <Button
                        width={200}
                        height={30}
                        backgroundColor={'red'}
                        text={t('searchWave')}
                    />
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
            </div>
        );
    }
}

export default withTranslation('common')(App);

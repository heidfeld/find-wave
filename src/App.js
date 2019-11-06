import React, {Component} from 'react';
import { withTranslation } from 'react-i18next';

import './App.css';
import FindWave from "./components/FindWave/FindWave";

class App extends Component {

    render() {
        return (
            <div className="App">
                <FindWave {...this.props}/>
            </div>
        );
    }

}

export default withTranslation('common')(App);

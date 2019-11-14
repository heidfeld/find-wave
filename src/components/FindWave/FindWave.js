import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Multiselect} from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css';

import './less/FindWave.css'
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import WaveIndicator from "../WaveIndicator/WaveIndicator";
import {provincesWave, getAllProvinces} from "./logic/FindWaveLogic"

const FindWave = (props) => {

    const {i18n, t} = props;

    const [result, setResult] = useState(null);

    const handleLanguage = (evt, lan) => {
        if (i18n) {
            return i18n.changeLanguage(lan);
        }
    };

    const onProvinceFilterChanged = (dataItems) => {
        const provinceFilterIds = dataItems.map(({id}) => id);
        const waveResult = provincesWave(provinceFilterIds);
        setResult(waveResult);
    };

    const getMappedProvinces = () => {
        return getAllProvinces().map((id) => {
            return {
                id,
                name: t(`provinces.${id}`) || id
            }
        });
    };

    return (
        <div className="FindWave">
            <LanguageSwitcher onClick={handleLanguage}/>
            <div className="FindWave-header">
                <WaveIndicator
                    result={result}
                    t={t}
                />
            </div>
            <div className="FindWave-container">
                <div className='Filter-dropdown'>
                    <Multiselect
                        data={getMappedProvinces()}
                        valueField='id'
                        textField='name'
                        onChange={onProvinceFilterChanged}
                        placeholder={t('filterByProvince')}
                    />
                </div>
            </div>
            <div className="FindWave-footer">
                {t('footer')}
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
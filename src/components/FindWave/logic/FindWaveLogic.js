import stations from './stationsFM';

const cacheAdd = (cache, key, obj) => {
    if (cache[key]) {
        cache[key].push(obj);
    } else {
        cache[key] = [obj];
    }
    return cache;
};

const getStations = () => {
    return Array.isArray(stations) ? stations : [];
};

export const getAllProvinces = () => {
    const provinces = getStations().map(({province}) => province);
    return [...new Set(provinces)].sort();
};

const getStationsByProvinces = (provinces) => {
    return getStations().filter(({province: stationProvince}) =>
        provinces.find(province => province === stationProvince));
};

export const provincesWave = (provinces) => {
    const stationsByProvinces = getStationsByProvinces(provinces);
    const stationsSet = {};
    stationsByProvinces.forEach(station => {
        const {frequency} = station;
        cacheAdd(stationsSet, frequency, station);
    });
    const sortedFrequencies = Object.keys(stationsSet).sort((a, b) => a - b);
    sortedFrequencies.splice(0, 0,'87.5');
    sortedFrequencies.push('108.0');
    return sortedFrequencies.reduce((acc, curr, idx, arr) => {
        const prev = arr[idx - 1];
        const currFreq = Math.round(parseFloat(curr) * 10) / 10;
        const prevFreq = Math.round(parseFloat(prev) * 10) / 10;
        if (prevFreq) {
            const diff = (Math.round((currFreq - prevFreq) * 10) / 10);
            if (diff > 0.15) {
                const prevStations = stationsSet[prev];
                const currStations = stationsSet[curr];
                return cacheAdd({...acc}, diff, {
                    start: prevFreq,
                    end: currFreq,
                    startStations: prevStations,
                    endStations: currStations
                });
            }
            return acc;
        } else {
            return acc;
        }
    }, {});
};


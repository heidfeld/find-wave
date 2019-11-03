import stations from './stationsFM';

const cacheAdd = (cache, key, obj) => {
    if (cache[key]) {
        cache[key].push(obj);
    } else {
        cache[key] = [obj];
    }
    return cache;
};

export const provincesWave = (provinces) => {
    const stationsByProvinces = getStationsByProvinces(provinces);
    const stationsSet = {};
    stationsByProvinces.forEach(station => {
        const {frequency} = station;
        cacheAdd(stationsSet, frequency, station);
    });
    const sortedFrequencies = stationsSet.keys().sort((a, b) => a - b);
    sortedFrequencies.splice(0, 0,87.5);
    sortedFrequencies.push(108.0);
    sortedFrequencies.reduce((acc, curr, idx, arr) => {
        const prev = arr[idx - 1];
        if (prev) {
            const diff = curr - prev;
            //TODO: impl
            if (diff > 0) {
                return cacheAdd({...acc}, diff, {start: prev, end: curr});
            }
            return acc;
        } else {
            return acc;
        }
    }, {});

};

const getStations = () => {
    return Array.isArray(stations) ? stations : [];
};

const range = (start, end, step = 1) => {
    const length = Math.floor(Math.abs((end - start) / step)) + 1;
    return Array.from(Array(length), (x, index) => start + index * step);

};

const getFrequenciesFM = () => {
    return range(87.5, 108.0, 0.1);
};

const getStationsByProvinces = (provinces) => {
    return getStations().filter(({province: stationProvince}) =>
        provinces.find(province => province === stationProvince));
};


import Chance from 'chance';

const chance = new Chance();

export const getNumberBetween = (min, max) => {
    return chance.integer({min, max});
};

export const getOddNumberBetween = (min, max) => {
    if (min % 2 === 0 || max % 2 === 0) return 0;
    const num = getNumberBetween(min, max);
    if (num % 2 === 0) {
        return getNumberBetween(min, max);
    }
    return num;
};

export const getColorAsHex = () => {
    return chance.color({format: 'hex'});
};

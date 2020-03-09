import Chance from 'chance';

const chance = new Chance();

export const getNumberBetween = (min, max) => {
    return chance.integer({min, max});
}

export const getColorAsHex = () => {
    return chance.color({format: 'hex'});
}

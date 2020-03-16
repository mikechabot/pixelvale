import Chance from 'chance';

import {dimensions, SPRITE_SPEEDS} from '../const';
import Point from '../domain/Point';

const chance = new Chance();

const DEFAULT_MIN = 0;
const DEFAULT_MAX = Number.MAX_SAFE_INTEGER;

export const getNumberBetween = (min = DEFAULT_MIN, max = DEFAULT_MAX) => (
    chance.natural({min, max})
);

export const pickOne = (arr) => chance.pickone(arr);

export const getSpriteSpeed = () => (
    chance.pickone(SPRITE_SPEEDS)
);

export const getRandomGuid = () => chance.guid({version: 4});

/**
 * Get a random point on the canvas
 * @returns {Point}
 */
export const getPointOnCanvas = () => {
    return new Point(
        getNumberBetween(0, dimensions.width),
        getNumberBetween(0, dimensions.height)
    );
};

/**
 * Get the distance between two points
 * @param p1
 * @param p2
 * @returns {number}
 */
export const getDistance = (p1, p2) => {
    const distanceX = p1.getX() - p2.getX();
    const distanceY = p1.getY() - p2.getY();
    return Math.sqrt(Math.pow(distanceX,2) + Math.pow(distanceY, 2));
};

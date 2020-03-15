import Chance from 'chance';

import {dimensions} from '../const';
import Point from '../domain/Point';

const chance = new Chance();

const DEFAULT_MIN = 0;
const DEFAULT_MAX = Number.MAX_SAFE_INTEGER;

export const getNumberBetween = (min = DEFAULT_MIN, max = DEFAULT_MAX) => (
    chance.natural({min, max})
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

export const getDirectionsFromDynamicSpriteToStaticSprite = (spriteA, food) => {
    const monsterPoint = spriteA.getPoint();
    const foodPoint = food.getPoint();

    const distanceX = foodPoint.x - monsterPoint.getX();
    const distanceY = foodPoint.y - monsterPoint.getY();

    const radians = Math.atan2(distanceY, distanceX);

    const incrementX = Math.cos(radians) * spriteA.getSpeed();
    const incrementY = Math.sin(radians) * spriteA.getSpeed();

    return {radians, incrementX, incrementY};
};

/**
 * Detect collisions between two rectangles
 * @param r1
 * @param r2
 * @returns {boolean}
 */
export const hitTestRectangle = (r1, r2) => {
    //Define the variables we'll need to calculate
    let combinedHalfWidths;
    let combinedHalfHeights;
    let vx;
    let vy;

    //Find the center points of each sprite
    r1.centerX = r1.x + r1.width / 2;
    r1.centerY = r1.y + r1.height / 2;
    r2.centerX = r2.x + r2.width / 2;
    r2.centerY = r2.y + r2.height / 2;

    //Find the half-widths and half-heights of each sprite
    r1.halfWidth = r1.width / 2;
    r1.halfHeight = r1.height / 2;
    r2.halfWidth = r2.width / 2;
    r2.halfHeight = r2.height / 2;

    //Calculate the distance vector between the sprites
    vx = r1.centerX - r2.centerX;
    vy = r1.centerY - r2.centerY;

    //Figure out the combined half-widths and half-heights
    combinedHalfWidths = r1.halfWidth + r2.halfWidth;
    combinedHalfHeights = r1.halfHeight + r2.halfHeight;

    //Check for a collision on the x axis
    if (Math.abs(vx) < combinedHalfWidths) {
        //A collision might be occurring. Check for a collision on the y axis
        if (Math.abs(vy) < combinedHalfHeights) {
            //There's definitely a collision happening
            return true;
        } else {
            //There's no collision on the y axis
            return false;
        }
    } else {
        //There's no collision on the x axis
        return false;
    }
};

import * as PIXI from 'pixi.js';
import Chance from 'chance';

import {dimensions} from '../const';

const chance = new Chance();

const DEFAULT_MIN = 0;
const DEFAULT_MAX = Number.MAX_SAFE_INTEGER;

const SPEED = 5;

const COLLISION_MAP = {
    LEFT: 'left',
    RIGHT: 'right',
    TOP: 'top',
    BOTTOM: 'bottom',
};

export const getNumberBetween = (min = DEFAULT_MIN, max = DEFAULT_MAX) => (
    chance.natural({min, max})
);

export const getPointOnCanvas = () => {
    return {
        x: getNumberBetween(0, dimensions.width),
        y: getNumberBetween(0, dimensions.height),
    };
};

export const getRandomDirection = (sprite) => {

    const destination = getPointOnCanvas();

    const distanceX = destination.x - sprite.x;
    const distanceY = destination.y - sprite.y;

    const radians = Math.atan2(distanceY, distanceX);

    const incrementX = Math.cos(radians) * SPEED;
    const incrementY = Math.sin(radians) * SPEED;

    return {destination, radians, incrementX, incrementY};
};

/**
 * Contain a sprite within a container
 * @param sprite
 * @param container
 * @returns {string}
 */



export const contain = sprite => {
    let collision;

    //Left
    if (sprite.x < 0) {
        sprite.x = 0;
        collision = COLLISION_MAP.LEFT;
    }

    //Top
    if (sprite.y < 0) {
        sprite.y = 0;
        collision = COLLISION_MAP.TOP;
    }

    //Right
    if (sprite.x + sprite.width > dimensions.width) {
        sprite.x = dimensions.width - sprite.width;
        collision = COLLISION_MAP.RIGHT;
    }

    //Bottom
    if (sprite.y + sprite.height > dimensions.height) {
        sprite.y = dimensions.height - sprite.height;
        collision = COLLISION_MAP.BOTTOM;
    }

    // if (collision === COLLISION_MAP.LEFT || collision === COLLISION_MAP.RIGHT) {
    //     sprite.vx = sprite.vx * -1;
    // }
    //
    // if (collision === COLLISION_MAP.TOP || collision === COLLISION_MAP.BOTTOM) {
    //     sprite.vy = sprite.vy * -1;
    // }

    //Return the `collision` value
    return collision;
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

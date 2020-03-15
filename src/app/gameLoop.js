import * as PIXI from 'pixi.js';

import {contain, getRandomDirection} from './util';

const {Text, TextStyle} = PIXI;

let messages = {};
let directions = {};

const style = new TextStyle({
    fontFamily: 'Consolas',
    fontSize: 12,
});

const isWithinRange = (sprite, point, range) => {
    const x = Math.floor(sprite.x);
    const y = Math.floor(sprite.y);

    const isXWithin = x <= (point.x + range) && x >= (point.x - range);
    const isYWithin = y <= (point.y + range) && y >= (point.y - range);

    return isXWithin && isYWithin;
};

const gameLoop = (delta, rockets, app) => {
    rockets.forEach((rocket, i) => {

        if (!directions[i]) {
            directions[i] = getRandomDirection(rocket);

            const {destination, radians} = directions[i];

            rocket.rotation = radians;

            messages[i] = new Text(`[${i}]`, style);
            messages[i].position.set(destination.x, destination.y);
            messages[i].anchor.x = 0.5;
            messages[i].anchor.y = 0.5;

            app.stage.addChild(messages[i]);
        }

        const {destination, incrementX, incrementY} = directions[i];

        rocket.x += incrementX;
        rocket.y += incrementY;

        if (isWithinRange(rocket, destination, 5)) {
            app.stage.removeChild(messages[i]);
            directions[i] = null;
        }
    });
};

export default gameLoop;

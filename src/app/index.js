import './index.css';
import * as PIXI from 'pixi.js';

import {dimensions, SPRITE_KEY} from './const';
import {setup} from './setup';

const {Application} = PIXI;

const asset = (name, url) => ({ name, url });

/**
 * Create the simulation via PIXI
 * @returns {PIXI.Application}
 */
export const createPixiApplication = () => {
    const app = new Application({
        width: dimensions.width,
        height: dimensions.height,
        antialias: true,
        backgroundColor: 0xECECEC,
    });

    const {loader} = app;

    loader
        .add([
            asset(SPRITE_KEY.MONSTER, 'images/monster.png'),
            asset(SPRITE_KEY.FOOD, 'images/food.png')
        ])
        .load(() => setup(app));

    return app;
};

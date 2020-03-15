import * as PIXI from 'pixi.js';

import Food from './domain/Food';
import Monster from './domain/Monster';

import gameLoop from './gameLoop';

import {MAX_FOOD, MAX_MONSTERS} from './const';
import {getMonsterSprite} from './util/sprite';


const {utils: {TextureCache}} = PIXI;

export const setup = (app) => {
    const baseTexture = TextureCache['monster'];

    const foods = {};
    const monsters = [];

    for (let i = 0; i < MAX_MONSTERS; i++) {
        const sprite = getMonsterSprite(baseTexture);

        const monster = new Monster(sprite);
        monsters.push(monster);
        app.stage.addChild(monster.getSprite());
    }

    for (let i = 0; i < MAX_FOOD; i++) {
        const food = new Food();
        foods[food.getGuid()] = food;
        app.stage.addChild(food.getSprite());
    }

    app.renderer.render(app.stage);

    app.ticker.add(() => gameLoop(app, monsters, foods));
};

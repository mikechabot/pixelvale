import * as PIXI from 'pixi.js';

import Food from './domain/Food';

import loop from './loop';

import {INITIAL_FOOD, MAX_MONSTERS} from './const';

import {getMonsterContainer, getTitle} from './util/sprite';
import {
    buildMonsterCountChart,
    buildMonsterSpeedChart,
    updateMonsterCountChart,
    updateMonsterSpeedChart
} from './util/chart';

const {utils: {TextureCache}} = PIXI;

export const setup = (app) => {
    const monsterSpriteMap = TextureCache['monster'];
    const foodSpriteMap = TextureCache['food'];

    const foods = {};
    const monsters = [];

    const monsterSpeedChart = buildMonsterSpeedChart();
    const monsterEnergyChart = buildMonsterCountChart();

    // Create monster sprites
    for (let i = 0; i < MAX_MONSTERS; i++) {
        const {monster, monsterContainer} = getMonsterContainer(monsterSpriteMap);

        // Add monster class to monsters array
        monsters.push(monster);

        // Add monsterContainer to stage
        app.stage.addChild(monsterContainer);
    }

    // Update the chart with the latest monster numbers
    updateMonsterSpeedChart(monsterSpeedChart, monsters);
    updateMonsterCountChart(monsterEnergyChart, monsters);

    // Create food sprites
    for (let i = 0; i < INITIAL_FOOD; i++) {
        const food = new Food(foodSpriteMap);
        foods[food.getGuid()] = food;
        app.stage.addChild(food.getSprite());
    }

    const title = getTitle(monsters);

    app.stage.addChild(title);
    app.renderer.render(app.stage);

    app.ticker.add(() => {
        loop(
            app,
            monsters,
            foods,
            title,
            monsterSpriteMap,
            foodSpriteMap,
            {monsterSpeedChart, monsterEnergyChart}
        );
    });
};

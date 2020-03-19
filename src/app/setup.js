import * as PIXI from 'pixi.js';

import Food from './domain/Food';

import loop from './loop';

import {INITIAL_FOOD, MAX_MONSTERS, SPRITE_KEY} from './const';

import {getMonsterContainer, getTitle} from './util/sprite';
import {buildCharts} from './charts';

const {utils: {TextureCache}} = PIXI;

export const setup = (app) => {

    /**
     * Remove a sprite from the stage
     * @param sprite
     */
    const removeSprite = (sprite) => {
        sprite.destroy();
        app.stage.removeChild(sprite);
    };

    /**
     * Add a sprite to the stage
     * @param sprite
     */
    const addSprite = sprite => {
        app.stage.addChild(sprite);
    };

    /**
     * Create the monster sprites
     */
    const monsters = [];
    const monsterSpriteMap = TextureCache[SPRITE_KEY.MONSTER];
    for (let i = 0; i < MAX_MONSTERS; i++) {
        const {monster, monsterContainer} = getMonsterContainer(monsterSpriteMap);
        monsters.push(monster);
        addSprite(monsterContainer);
    }

    /**
     * Create the food sprites
     */
    const foods = {};
    const foodSpriteMap = TextureCache[SPRITE_KEY.FOOD];
    for (let i = 0; i < INITIAL_FOOD; i++) {
        const food = new Food(foodSpriteMap);
        foods[food.getGuid()] = food;
        addSprite(food.getSprite());
    }

    /**
     * Create the title sprite
     * @type {PIXI.Text}
     */
    const title = getTitle(monsters);
    addSprite(title);

    app.renderer.render(app.stage);

    const sprites = {monsters, foods};
    const spriteMaps = {monsterSpriteMap, foodSpriteMap};
    const utilities = {addSprite, removeSprite};
    const charts = buildCharts(monsters);

    app.ticker.add(() => {
        loop(
            app,
            utilities,
            sprites,
            title,
            spriteMaps,
            charts,
        );
    });
};

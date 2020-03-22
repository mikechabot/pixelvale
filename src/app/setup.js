import * as PIXI from 'pixi.js';

import RootStore from './stores/rootStore';
import Food from './domain/Food';

import loop from './loop';

import {INITIAL_FOOD, MAX_MONSTERS, SPRITE_KEY} from './const';

import {getMonsterContainer} from './util/sprite';


const {utils: {TextureCache}} = PIXI;

/**
 * Build the monster sprites
 * @param spriteMap
 * @returns {{monsters: [], monsterContainers: []}}
 */
const buildMonsterSprites = (spriteMap) => {
    const monsters = [];
    const monsterContainers = [];

    for (let i = 0; i < MAX_MONSTERS; i++) {
        const {monster, monsterContainer} = getMonsterContainer(spriteMap);
        monsters.push(monster);
        monsterContainers.push(monsterContainer);
    }

    return {monsters, monsterContainers};
};

/**
 * Build the food sprites
 * @param spriteMap
 * @returns {[]}
 */
const buildFoodSprites = (spriteMap) => {
    const foods = [];
    for (let i = 0; i < INITIAL_FOOD; i++) {
        const food = new Food(spriteMap);
        foods.push(food);
    }
    return foods;
};

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
    const monsterSpriteMap = TextureCache[SPRITE_KEY.MONSTER];
    const {monsters, monsterContainers} = buildMonsterSprites(monsterSpriteMap);

    monsterContainers.forEach(container => {
        addSprite(container);
    });

    /**
     * Create the food sprites
     */
    const foodSpriteMap = TextureCache[SPRITE_KEY.FOOD];
    const foods = buildFoodSprites(foodSpriteMap);

    foods.forEach(food => {
        addSprite(food.getSprite());
    });

    app.renderer.render(app.stage);

    let pause = false;
    const initialFood = document.getElementById('action');
    initialFood.addEventListener('click', () => {
        if (!pause) {
            pause = true;
            initialFood.innerText = 'Start';
        } else {
            pause = false;
            initialFood.innerText = 'Pause';
        }
    });

    const spriteMaps = {monsterSpriteMap, foodSpriteMap};
    const utilities = {addSprite, removeSprite};

    const store = new RootStore(monsters, foods);

    app.ticker.add(() => {
        if (!pause) {
            loop(
                app,
                utilities,
                store,
                spriteMaps
            );
        }
    });
};

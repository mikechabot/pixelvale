import * as PIXI from 'pixi.js';

import {getNumberBetween, getPointOnCanvas, pickOne} from './index';
import {dimensions, INITIAL_FOOD, MAX_MONSTERS, SPRITE_SPEEDS} from '../const';
import Monster from '../domain/Monster';
import Food from '../domain/Food';

const {Container, Rectangle, Sprite} = PIXI;

/**
 * Create a food sprite
 * @param foodSpriteMap
 * @returns {PIXI.Sprite}
 */
export const getFoodSprite = (foodSpriteMap) => {
    const point = getPointOnCanvas();

    const texture = foodSpriteMap.clone();
    const rectangle = new Rectangle(0, 64, 16, 16);

    texture.frame = rectangle;

    const food = new Sprite(texture);
    food.position.set(point.x, point.y);
    food.anchor.x = 0.5;
    food.anchor.y = 0.5;

    food.scale.x = 0.75;
    food.scale.y = 0.75;

    return food;
};

/**
 * Create a monster sprite
 * @param monsterSpriteMap
 * @returns {PIXI.Sprite}
 */
export const getMonsterSprite = (monsterSpriteMap) => {
    const texture =  monsterSpriteMap.clone();
    const rectangle = new Rectangle(1, 33, 32, 32);

    texture.frame = rectangle;

    const monster = new Sprite(texture);
    monster.anchor.x = 0.5;
    monster.anchor.y = 0.5;
    monster.x = 0;
    monster.y = 0;

    return monster;
};

/**
 * Create a container sprite, which holds a monster sprite,
 * along with textual information like the monster's speed
 * and energy values
 * @param monsterSpriteMap
 * @param parentMonster
 * @returns {{monster: Monster, monsterContainer: PIXI.Container}}
 */
export const getMonsterContainer = (monsterSpriteMap, parentMonster) => {
    const monsterContainer = new Container();

    monsterContainer.position.set(
        getNumberBetween(0, dimensions.width),
        getNumberBetween(0, dimensions.height)
    );

    // Get monster sprite
    const sprite = getMonsterSprite(monsterSpriteMap);

    sprite.scale.x = 0.75;
    sprite.scale.y = 0.75;

    // Instantiate Monster class
    const monster = new Monster(sprite, monsterContainer);

    if (parentMonster) {
        const speedIndex = SPRITE_SPEEDS.indexOf(parentMonster.getSpeed());

        const bottomIndex = !SPRITE_SPEEDS[speedIndex - 2] ? 0 : speedIndex - 2;
        const topIndex = !SPRITE_SPEEDS[speedIndex + 2] ? SPRITE_SPEEDS.length : speedIndex + 2;

        const speeds = SPRITE_SPEEDS.slice(bottomIndex, topIndex);

        monster.speed = pickOne(speeds);
        monster.energy = 75;
    }

    // Add monster sprite to container
    monsterContainer.addChild(monster.getSprite());

    // const energy = new Text(`Energy: ${monster.getEnergy()}`, style);
    // energy.position.set(-16, 16);
    //
    // const speed = new Text(`Speed: ${monster.getSpeed().toFixed(2)}`, style);
    // speed.position.set(-16, 32);
    //
    // monsterContainer.addChild(energy);
    // monsterContainer.addChild(speed);

    return {
        monster,
        monsterContainer
    };
};

/**
 * Build the monster sprites
 * @param spriteMap
 * @returns {{monsters: [], monsterContainers: []}}
 */
export const buildMonsterSprites = (spriteMap) => {
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
export const buildFoodSprites = (spriteMap) => {
    const foods = [];
    for (let i = 0; i < INITIAL_FOOD; i++) {
        const food = new Food(spriteMap);
        foods.push(food);
    }
    return foods;
};

import * as PIXI from 'pixi.js';

import {getNumberBetween, getPointOnCanvas} from './index';
import {dimensions, RANGE_TO_FOOD} from '../const';

const {Rectangle, Sprite, Text, TextStyle} = PIXI;

const style = new TextStyle({
    fontFamily: 'Consolas',
    fontSize: 12,
});

export const getFoodSprite = () => {
    const point = getPointOnCanvas();

    const sprite = new Text('FOOD', style);
    sprite.position.set(point.x, point.y);
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;

    return sprite;
};

export const getMonsterSprite = (baseTexture) => {
    const texture =  baseTexture.clone();
    const rectangle = new Rectangle(1, 33, 32, 32);

    texture.frame = rectangle;

    const monster = new Sprite(texture);
    monster.anchor.x = 0.5;
    monster.anchor.y = 0.5;
    monster.x = getNumberBetween(0, dimensions.width);
    monster.y = getNumberBetween(0, dimensions.height);

    return monster;
};

export const setMonsterState = (monster, directions) => {
    const {radians, incrementX, incrementY} = directions;

    const sprite = monster.getSprite();

    sprite.rotation = radians;
    sprite.x += incrementX;
    sprite.y += incrementY;
};

export const isSpriteWithinRangeOfFood = (monster, food) => {
    const monsterPoint = monster.getPoint();

    const x = Math.floor(monsterPoint.x);
    const y = Math.floor(monsterPoint.y);

    const isXWithin = x <= (food.getX() + RANGE_TO_FOOD) && x >= (food.getX() - RANGE_TO_FOOD);
    const isYWithin = y <= (food.getY() + RANGE_TO_FOOD) && y >= (food.getY() - RANGE_TO_FOOD);

    return isXWithin && isYWithin;
};

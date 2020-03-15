import Food from './domain/Food';

import {MAX_FOOD} from './const';
import {isSpriteWithinRangeOfFood} from './util/sprite';

let ticks = 0;

const throttle = () => ticks % 120 !== 0;

const gameLoop = (app, monsters, foods) => {

    // ticks++;
    // if (throttle()) {
    //     return;
    // }

    const countOfActiveFood = Object
        .keys(foods)
        .filter(key => foods[key])
        .length;

    if (countOfActiveFood < MAX_FOOD) {
        const food = new Food();
        foods[food.getGuid()] = food;
        app.stage.addChild(food.getSprite());
    }

    monsters.forEach((monster) => {
        const food = monster.getClosestFood(foods);

        if (!food) return;

        monster.moveToFood(food);

        if (isSpriteWithinRangeOfFood(monster, food)) {
            app.stage.removeChild(food.getSprite());
            foods[food.getGuid()] = null;
        }
    });
};

export default gameLoop;

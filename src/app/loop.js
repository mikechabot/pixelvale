import {
    runDisperseFoodInterval,
    runMonsterEnergyInterval,
    runMonsterDieOrReproduceInterval,
} from './intervals';

/**
 * Game loop for the Monster sprites
 * @param monster
 * @param foods
 * @param addSprite
 * @param removeSprite
 */
const monsterLoop = (monster, foods, addSprite, removeSprite) => {
    if (monster.isDead()) {
        return;
    }

    /**
     * If the monster isn't full, try to find food,
     * otherwise just have the monster move randomly
     * around the canvas
     */
    if (!monster.isFull()) {
        const {food, index} = monster.getClosestFood(foods);

        if (food) {
            monster.moveToFood(food);

            if (monster.isWithinRangeOfPoint(food)) {
                monster.eatFood();

                removeSprite(food.getSprite());
                foods.splice(index, 1);
            }
        } else {
            monster.handleRandomMovement();
        }
    } else {
        monster.handleRandomMovement();
    }
};

/**
 * Main game loop
 * @param app
 * @param utilities
 * @param sprites
 * @param spriteMaps
 * @param chartMap
 */
const loop = (app, utilities, store, spriteMaps) => {

    const {monsterStore, foodStore} = store;
    const {addSprite, removeSprite} = utilities;
    const {monsterSpriteMap, foodSpriteMap} = spriteMaps;

    runDisperseFoodInterval(foodStore.foods, foodSpriteMap, addSprite);

    monsterStore.monsters.forEach(m => {
        monsterLoop(m, foodStore.foods, addSprite, removeSprite);
    });

    runMonsterDieOrReproduceInterval(monsterStore.monsters, monsterSpriteMap, addSprite, removeSprite);
    runMonsterEnergyInterval(monsterStore.monsters);
};

export default loop;

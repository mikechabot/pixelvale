import {
    runDisperseFoodInterval,
    runMonsterEnergyInterval,
    runMonsterDieOrReproduceInterval,
} from './intervals';

/**
 * Main game loop
 * @param app
 * @param utilities
 * @param sprites
 * @param spriteMaps
 * @param chartMap
 */
const loop = (app, utilities, store, spriteMaps) => {

    const {addSprite, removeSprite} = utilities;
    const {monsterSpriteMap, foodSpriteMap} = spriteMaps;
    const {monsterStore: {monsters}, foodStore: {foods}} = store;

    runDisperseFoodInterval(foods, foodSpriteMap, addSprite);

    monsters.forEach(m => {
        if (m.isDead()) {
            return;
        }

        if (m.isFull()) {
            m.handleRandomMovement();
            return;
        }

        const {food, index} = m.getClosestFood(foods);

        if (!food) {
            m.handleRandomMovement();
            return;
        }

        m.moveToFood(food);

        if (m.isCollidingWithSprite(food)) {
            m.eatFood();

            removeSprite(food.getSprite());
            foods.splice(index, 1);
        }
    });

    runMonsterDieOrReproduceInterval(monsters, monsterSpriteMap, addSprite, removeSprite);
    runMonsterEnergyInterval(monsters);
};

export default loop;

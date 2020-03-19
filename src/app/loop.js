import {INITIAL_FOOD, MAX_FOOD, MAX_FOOD_PER_DAY, TICKS_PER_DAY} from './const';
import {
    runDisperseFoodInterval,
    runMonsterEnergyInterval,
    runMonsterMatingInterval,
    runUpdateChartInterval
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
     * Kill off any monsters
     */
    if (monster.shouldDie()) {
        monster.die();
        setTimeout(() => removeSprite(monster.getContainer()), TICKS_PER_DAY);
        return;
    }

    /**
     * If the monster isn't full, try to find food,
     * otherwise just have the monster move randomly
     * around the canvas
     */
    if (!monster.isFull()) {
        const food = monster.getClosestFood(foods);

        if (food) {
            monster.moveToFood(food);

            if (monster.isWithinRangeOfPoint(food)) {
                monster.eatFood();

                removeSprite(food.getSprite());
                delete foods[food.getGuid()];
            }
        } else {
            monster.handleRandomMovement();
        }
    } else {
        monster.handleRandomMovement();
    }
};

let interval = null;

/**
 * Main game loop
 * @param app
 * @param utilities
 * @param sprites
 * @param title
 * @param spriteMaps
 * @param chartMap
 */
const loop = (app, utilities, sprites, title, spriteMaps, chartMap) => {

    const {monsters, foods} = sprites;
    const {addSprite, removeSprite} = utilities;
    const {monsterSpriteMap, foodSpriteMap} = spriteMaps;

    runDisperseFoodInterval(foods, foodSpriteMap, addSprite);

    monsters.forEach(m => {
        monsterLoop(m, foods, addSprite, removeSprite);
    });

    runMonsterMatingInterval(monsters, monsterSpriteMap, addSprite);
    runMonsterEnergyInterval(monsters);
    runUpdateChartInterval(monsters, chartMap);

    if (!interval) {
        interval = setInterval(() => {
            const undead = monsters.filter(m => !m.isDead());
            title.text = `
                Monsters: ${undead.length} 
                Total: ${monsters.length} 
                Foods: ${Object.keys(foods).length}
                InitialFood: ${INITIAL_FOOD}
                MaxFood: ${MAX_FOOD}
                MaxFoodPerDay: ${MAX_FOOD_PER_DAY}
            `;
            clearInterval(interval);
            interval = null;
        }, TICKS_PER_DAY);
    }
};

export default loop;

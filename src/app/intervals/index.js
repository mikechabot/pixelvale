import Food from '../domain/Food';

import {getMonsterContainer} from '../util/sprite';
import {MAX_FOOD, MAX_FOOD_PER_DAY, TICKS_PER_DAY, TICKS_PER_EXPENDITURE} from '../const';

const intervals = {};

const INTERVAL_KEY = {
    FOOD            : 'food',
    DIE_OR_REPRODUCE: 'dieOrReproduce',
    EXPEND_ENERGY   : 'expendEnergy'
};

/**
 * Clear an interval by key
 * @param intervalKey
 */
const clearIntervalByKey = intervalKey => {
    window.clearInterval(intervals[intervalKey]);
    intervals[intervalKey] = null;
};

/**
 * Add an interval to the interval map
 * @param interval
 * @param intervalKey
 */
const addInterval = (interval, intervalKey) => {
    intervals[intervalKey] = interval;
};

/**
 * Run the interval to disperse food
 * @param foods
 * @param spriteMap
 * @param addSprite
 */
export const runDisperseFoodInterval = (foods, spriteMap, addSprite) => {
    let interval = intervals[INTERVAL_KEY.FOOD];
    if (!interval) {

        if (foods.length < MAX_FOOD) {
            interval = setInterval(() => {
                for (let i = 0; i < MAX_FOOD_PER_DAY; i++) {
                    const food = new Food(spriteMap);
                    foods.push(food);
                    addSprite(food.getSprite());
                }
                clearIntervalByKey(INTERVAL_KEY.FOOD);
            }, TICKS_PER_DAY);

            addInterval(interval, INTERVAL_KEY.FOOD);
        }
    }
};

/**
 * Run the interval to mate monsters
 * @param monsters
 * @param spriteMap
 * @param addSprite
 */
export const runMonsterDieOrReproduceInterval = (monsters, spriteMap, addSprite, removeSprite) => {
    let interval = intervals[INTERVAL_KEY.DIE_OR_REPRODUCE];

    if (!interval) {
        interval = setInterval(() => {
            monsters
                .forEach((m, i) => {
                    if (m.isDead()) {
                        return;
                    }

                    if (m.shouldDie()) {
                        m.die();
                        monsters.splice(i, 1);
                        setTimeout(() => removeSprite(m.getContainer()), TICKS_PER_DAY);

                    } else if (m.shouldReproduce()) {
                        const {monster, monsterContainer} = getMonsterContainer(spriteMap, m);
                        monsters.push(monster);
                        addSprite(monsterContainer);
                    }

                });
            clearIntervalByKey(INTERVAL_KEY.DIE_OR_REPRODUCE);
        }, TICKS_PER_DAY);

        addInterval(interval, INTERVAL_KEY.DIE_OR_REPRODUCE);
    }
};

/**
 * Run the interval to expend monsters' energy
 * @param monsters
 */
export const runMonsterEnergyInterval = (monsters) => {
    let interval = intervals[INTERVAL_KEY.EXPEND_ENERGY];

    if (!interval) {
        interval = setInterval(() => {
            monsters.forEach(m => {
                if (!m.isDead()) {
                    m.expendEnergy();
                }
            });
            clearIntervalByKey(INTERVAL_KEY.EXPEND_ENERGY);
        }, TICKS_PER_EXPENDITURE);

        addInterval(interval, INTERVAL_KEY.EXPEND_ENERGY);
    }
};

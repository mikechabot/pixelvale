import Food from '../domain/Food';

import {MAX_FOOD, MAX_FOOD_PER_DAY, TICKS_PER_DAY, TICKS_PER_EXPENDITURE} from '../const';
import {getMonsterContainer} from '../util/sprite';
import {updateMonsterCountChart, updateMonsterSpeedChart} from '../charts';

const intervals = {};

const INTERVAL_KEY = {
    FOOD: 'food',
    CHART: 'chart',
    MATING: 'mating',
    EXPEND_ENERGY: 'expendEnergy'
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

        const countOfActiveFood = Object
            .keys(foods)
            .filter(key => foods[key])
            .length;

        if (countOfActiveFood < MAX_FOOD) {
            interval = setInterval(() => {
                for (let i = 0; i < MAX_FOOD_PER_DAY; i++) {
                    const food = new Food(spriteMap);
                    foods[food.getGuid()] = food;
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
export const runMonsterMatingInterval = (monsters, spriteMap, addSprite) => {
    let interval = intervals[INTERVAL_KEY.MATING];

    if (!interval) {
        interval = setInterval(() => {
            monsters
                .forEach(m => {
                    if (!m.isDead() && m.shouldReproduce()) {
                        const {monster, monsterContainer} = getMonsterContainer(spriteMap, m);
                        monsters.push(monster);
                        addSprite(monsterContainer);
                    }
                });
            clearIntervalByKey(INTERVAL_KEY.MATING);
        }, TICKS_PER_DAY);

        addInterval(interval, INTERVAL_KEY.MATING);
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

/**
 * Run the interval to update the charts
 * @param monsters
 * @param chartMap
 */
export const runUpdateChartInterval = (monsters, chartMap) => {
    let interval = intervals[INTERVAL_KEY.CHART];

    if (!interval) {
        const {monsterSpeedChart, monsterEnergyChart} = chartMap;

        const undead = monsters.filter(m => !m.isDead());

        interval = setInterval(() => {
            updateMonsterSpeedChart(monsterSpeedChart, undead);
            updateMonsterCountChart(monsterEnergyChart, undead);

            clearIntervalByKey(INTERVAL_KEY.CHART);
        }, TICKS_PER_DAY);

        addInterval(interval, INTERVAL_KEY.CHART);
    }
};

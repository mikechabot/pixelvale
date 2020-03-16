import Food from './domain/Food';

import {MAX_FOOD, MAX_FOOD_PER_DAY, TICKS_PER_DAY, TICKS_PER_EXPENDITURE} from './const';
import {updateMonsterCountChart, updateMonsterSpeedChart} from './util/chart';
import {getMonsterContainer} from './util/sprite';

const intervals = {};

const INTERVAL_KEY = {
    FOOD: 'food',
    CHART: 'chart',
};

/**
 * Game loop for the Monster sprites
 * @param monster
 * @param foods
 * @param addSprite
 * @param removeSprite
 */
const monsterLoop = (monster, foods, addSprite, removeSprite) => {
    if (monster.shouldDie()) {
        monster.die();
        setTimeout(() => removeSprite(monster.getContainer()), TICKS_PER_DAY);
        return;
    }

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

    const guid = monster.getGuid();

    if (!intervals[guid]) {
        intervals[guid] = setInterval(() => {
            monster.expendEnergy();

            window.clearInterval(intervals[guid]);
            intervals[guid] = null;
        }, TICKS_PER_EXPENDITURE);
    }
};

/**
 * Main game loop
 * @param app
 * @param monsters
 * @param foods
 * @param title
 * @param chart
 */
const loop = (app, monsters, foods, title, monsterSpriteMap, foodSpriteMap, chartMap) => {

    function removeSprite(sprite) {
        sprite.destroy();
        app.stage.removeChild(sprite);
    }

    function addSprite(sprite) {
        app.stage.addChild(sprite);
    }

    let interval = intervals[INTERVAL_KEY.FOOD];
    if (!interval) {

        const countOfActiveFood = Object
            .keys(foods)
            .filter(key => foods[key])
            .length;

        if (countOfActiveFood < MAX_FOOD) {
            interval = setInterval(() => {
                for (let i = 0; i < MAX_FOOD_PER_DAY; i++) {
                    const food = new Food(foodSpriteMap);
                    foods[food.getGuid()] = food;
                    addSprite(food.getSprite());
                }

                window.clearInterval(interval);
                intervals[INTERVAL_KEY.FOOD] = null;

            }, TICKS_PER_DAY);

            intervals[INTERVAL_KEY.FOOD] = interval;
        }
    }

    monsters
        .filter(monster => !monster.isDead())
        .forEach(m => {
            monsterLoop(m, foods, addSprite, removeSprite);

            if (!m.isDead()) {
                const guid = m.getGuid();

                if (!intervals[`${guid}-mating`]) {
                    intervals[`${guid}-mating`] = setInterval(() => {
                        if (m.shouldReproduce()) {
                            const {monster, monsterContainer} = getMonsterContainer(monsterSpriteMap, m);
                            monster.energy = 75;
                            monsters.push(monster);

                            // Add monsterContainer to stage
                            app.stage.addChild(monsterContainer);
                        }
                        window.clearInterval(intervals[`${guid}-mating`]);
                        intervals[`${guid}-mating`] = null;
                    }, TICKS_PER_DAY);
                }
            }
        });


    title.text = `Monsters: ${monsters.filter(monster => !monster.isDead()).length}`;

    if (!intervals[INTERVAL_KEY.CHART]) {
        const {monsterSpeedChart, monsterEnergyChart} = chartMap;

        intervals[INTERVAL_KEY.CHART] = setInterval(() => {
            updateMonsterSpeedChart(monsterSpeedChart, monsters);
            updateMonsterCountChart(monsterEnergyChart, monsters);

            window.clearInterval(intervals[INTERVAL_KEY.CHART]);
            intervals[INTERVAL_KEY.CHART] = null;
        }, TICKS_PER_DAY / 4);
    }
};

export default loop;

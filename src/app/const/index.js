export const SPRITE_KEY = {
    MONSTER: 'monster',
    FOOD: 'food',
};

export const dimensions = {
    width: 1280,
    height: 800,
};

export const SPRITE_SPEEDS = [
    1,
    2, 2.25, 2.5, 2.75,
    3, 3.25, 3.5, 3.75,
    4, 4.25, 4.5, 4.75,
    5, 5.25, 5.5, 5.75,
    6
];

// export const DEATH_CHANCE =  0.0005;
// export const REPRODUCE_CHANCE = 0.30;
//
// export const energyModifier = monster => Math.ceil(monster.getSpeed() / 3);

/**
 * Selfish gene
 */
// export const MAX_MONSTERS = 50;
// export const INITIAL_FOOD = MAX_MONSTERS * 10;
// // export const MAX_FOOD_PER_DAY = MAX_MONSTERS * 5;
// export const MAX_FOOD_PER_DAY = INITIAL_FOOD;
// export const MAX_FOOD = INITIAL_FOOD * 2;
//
// export const RANGE_TO_FOOD = 5;
//
// export const TICKS_PER_DAY = 3000;
// export const TICKS_PER_EXPENDITURE = TICKS_PER_DAY / 6;

/**
 * Extremely large swings (more to the lower end)
 */
// export const MAX_MONSTERS = 20;
// export const INITIAL_FOOD = MAX_MONSTERS * 10;
// export const MAX_FOOD_PER_DAY = MAX_MONSTERS * 7;
// export const MAX_FOOD = INITIAL_FOOD * 10;
//
// export const RANGE_TO_FOOD = 5;
//
// export const TICKS_PER_DAY = 500;
// export const TICKS_PER_EXPENDITURE = TICKS_PER_DAY / 3;

/**
 * Large swings in population (speed on higher end)
 */
// export const MAX_MONSTERS = 20;
// export const INITIAL_FOOD = MAX_MONSTERS * 20;
// export const MAX_FOOD_PER_DAY = MAX_MONSTERS * 15;
// export const MAX_FOOD = INITIAL_FOOD * 2;
//
// export const RANGE_TO_FOOD = 5;
//
// export const TICKS_PER_DAY = 500;
// export const TICKS_PER_EXPENDITURE = TICKS_PER_DAY / 2;

export const DEATH_CHANCE =  0.05;
export const REPRODUCE_CHANCE = 0.1;

export const energyModifier = monster => 3;

export const MAX_MONSTERS = 30;
export const INITIAL_FOOD = MAX_MONSTERS * 10;
export const MAX_FOOD_PER_DAY = INITIAL_FOOD / 2;
export const MAX_FOOD = INITIAL_FOOD * 1.5;

export const RANGE_TO_FOOD = 5;

export const TICKS_PER_DAY = 750;
export const TICKS_PER_EXPENDITURE = TICKS_PER_DAY / 3;


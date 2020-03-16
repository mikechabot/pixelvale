import DynamicContainerSprite from './DynamicContainerSprite';

import {RANGE_TO_FOOD} from '../const';
import {getNumberBetween} from '../util';

class Monster extends DynamicContainerSprite {
    constructor(sprite, container) {
        super(sprite, container);
        this.energy = 100;
        this.dead = false;
    }

    getEnergy() {
        return this.energy;
    }

    isDead() {
        return this.dead;
    }

    isFull() {
        return this.getEnergy() === 100;
    }

    moveToFood(food) {
        this.stopMovingRandomly();
        const directions = this.getDirectionsToSprite(food);
        this.moveToDirection(directions);
    }

    shouldReproduce() {
        return this.energy > 75 && Math.random() < 0.30;
    }

    shouldDie() {
        return this.getEnergy() <= 0 || Math.random() < 0.0005;
    }

    die() {
        console.log('%c Monster has died', 'color: red;');
        this.getSprite().tint = 0xD73232;
        this.dead = true;
    }

    updateEnergyText() {
        const textSprite = this.container.children[1];
        textSprite.text = `Energy: ${this.energy}`;
    }

    eatFood() {
        let tempEnergy = this.getEnergy() + 3;
        if (tempEnergy > 100) {
            tempEnergy = 100;
        }

        this.energy = tempEnergy;
        this.updateEnergyText();
    }

    expendEnergy() {
        let tempEnergy = this.getEnergy() - (this.getSpeed() * 2);
        if (tempEnergy < 0) {
            tempEnergy = 0;
        }
        this.energy = tempEnergy;
        this.updateEnergyText();
    }

    getClosestFood(foods) {
        let closestFood = null;
        let closest = Number.MAX_SAFE_INTEGER;

        Object
            .keys(foods)
            .filter(key => foods[key])
            .forEach(key => {
                const food = foods[key];
                if (food) {
                    const distance = this.getDistanceToSprite(food);
                    if (distance < closest) {
                        closest = distance;
                        closestFood = food;
                    }
                }
            });

        return closestFood;
    }

    isWithinRangeOfPoint(point) {
        const x = Math.floor(this.getX());
        const y = Math.floor(this.getY());

        const isXWithin = x <= (point.getX() + RANGE_TO_FOOD) && x >= (point.getX() - RANGE_TO_FOOD);
        const isYWithin = y <= (point.getY() + RANGE_TO_FOOD) && y >= (point.getY() - RANGE_TO_FOOD);

        return isXWithin && isYWithin;
    }
}

export default Monster;

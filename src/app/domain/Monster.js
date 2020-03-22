import DynamicContainerSprite from './DynamicContainerSprite';

import {DEATH_CHANCE, energyModifier, RANGE_TO_FOOD, REPRODUCE_CHANCE} from '../const';

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
        return this.energy > 50 && Math.random() < REPRODUCE_CHANCE;
    }

    shouldDie() {
        return this.getEnergy() <= 0 || Math.random() < DEATH_CHANCE;
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
        let tempEnergy = this.getEnergy() + energyModifier(this);
        if (tempEnergy > 100) {
            tempEnergy = 100;
        }

        this.energy = tempEnergy;
        this.updateEnergyText();
    }

    expendEnergy() {
        let tempEnergy = this.getEnergy() - (this.getSpeed());
        if (tempEnergy < 0) {
            tempEnergy = 0;
        }
        this.energy = tempEnergy;
        this.updateEnergyText();
    }

    getClosestFood(foods) {
        let index = -1;
        let food = null;
        let closest = Number.MAX_SAFE_INTEGER;

        foods.forEach((f, i) => {
            const distance = this.getDistanceToSprite(f);
            if (distance < closest) {
                closest = distance;
                index = i;
                food = f;
            }
        });

        return {food, index};
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

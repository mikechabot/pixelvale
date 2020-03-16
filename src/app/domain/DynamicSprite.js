import Sprite from './Sprite';

import {getDistance, getSpriteSpeed, getPointOnCanvas} from '../util';

import Point from './Point';

class DynamicSprite extends Sprite {
    constructor(sprite) {
        super(sprite);
        this.speed = this.speed = getSpriteSpeed();
        this.navigateRandomly = false;
        this.randomPoint = null;
    }

    getSpeed() {
        return this.speed;
    }

    getX() {
        return this.sprite.x;
    }

    getY() {
        return this.sprite.y;
    }

    isNavigatingRandomly() {
        return this.navigateRandomly;
    }

    getRandomPoint() {
        return this.randomPoint;
    }

    getPoint() {
        return new Point(this.getX(), this.getY());
    }

    getDirectionsToSprite(sprite) {
        return this.getDirectionsToPoint(
            new Point(sprite.getX(), sprite.getY())
        );
    }

    getDirectionsToPoint(point) {
        const distanceX = point.getX() - this.getX();
        const distanceY = point.getY() - this.getY();

        const radians = Math.atan2(distanceY, distanceX);

        const incrementX = Math.cos(radians) * this.getSpeed();
        const incrementY = Math.sin(radians) * this.getSpeed();

        return {radians, incrementX, incrementY};
    }

    stopMovingRandomly() {
        this.navigateRandomly = false;
        this.randomPoint = null;
    }

    moveRandomly() {
        const point = getPointOnCanvas();
        this.navigateRandomly = true;
        this.randomPoint = point;
    }

    moveToDirection(direction) {
        const {radians, incrementX, incrementY} = direction;

        this.sprite.rotation = radians;
        this.sprite.x += incrementX;
        this.sprite.y += incrementY;
    }

    moveToPoint(point) {
        const directions = this.getDirectionsToPoint(point);
        this.moveToDirection(directions);
    }

    getDistanceToSprite(sprite) {
        return getDistance(this.getPoint(), sprite.getPoint());
    }

    handleRandomMovement() {
        if (!this.isNavigatingRandomly()) {
            this.moveRandomly();
        } else if (this.isWithinRangeOfPoint(this.getRandomPoint())) {
            this.stopMovingRandomly();
        } else {
            this.moveToPoint(this.getRandomPoint());
        }
    }
}

export default DynamicSprite;

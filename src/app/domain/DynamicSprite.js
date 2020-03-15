import Sprite from './Sprite';

import {getDistance, getNumberBetween} from '../util';

import {SPRITE_SPEED} from '../const';
import Point from './Point';

class DynamicSprite extends Sprite {
    constructor(sprite) {
        super(sprite);
        this.speed = this.speed = getNumberBetween(1, SPRITE_SPEED);
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

    getPoint() {
        return new Point(this.getX(), this.getY());
    }

    getDirectionsToSprite(sprite) {
        const distanceX = sprite.getX() - this.getX();
        const distanceY = sprite.getY() - this.getY();

        const radians = Math.atan2(distanceY, distanceX);

        const incrementX = Math.cos(radians) * this.getSpeed();
        const incrementY = Math.sin(radians) * this.getSpeed();

        return {radians, incrementX, incrementY};
    }

    moveTo(direction) {
        const {radians, incrementX, incrementY} = direction;

        this.sprite.rotation = radians;
        this.sprite.x += incrementX;
        this.sprite.y += incrementY;
    }

    getDistanceToSprite(sprite) {
        return getDistance(this.getPoint(), sprite.getPoint());
    }
}

export default DynamicSprite;

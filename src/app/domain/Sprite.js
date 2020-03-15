import Point from './Point';
import {getRandomGuid} from '../util';

class Sprite {
    constructor(sprite) {
        this.sprite = sprite;
        this.point = new Point(sprite.x, sprite.y);
        this.guid = getRandomGuid();
    }

    getGuid() {
        return this.guid;
    }

    getSprite() {
        return this.sprite;
    }

    getX() {
        return this.point.getX();
    }

    getY() {
        return this.point.getY();
    }

    getPoint() {
        return this.point;
    }
}

export default Sprite;

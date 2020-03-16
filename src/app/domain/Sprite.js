import Point from './Point';
import {getRandomGuid} from '../util';

class Sprite {
    constructor(sprite) {
        this.sprite = sprite;
        this.guid = getRandomGuid();
    }

    getGuid() {
        return this.guid;
    }

    getSprite() {
        return this.sprite;
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
}

export default Sprite;

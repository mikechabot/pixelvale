import Point from './Point';
import {getRandomGuid} from '../util';

class Sprite {
    constructor(sprite) {
        this.sprite = sprite;
        this.guid = getRandomGuid();

        this.halfWidth = this.getWidth() / 2;
        this.halfHeight = this.getHeight() / 2;
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

    getWidth() {
        return this.sprite.width;
    }

    getHeight() {
        return this.sprite.height;
    }

    getHalfWidth() {
        return this.halfWidth;
    }

    getHalfHeight() {
        return this.halfHeight;
    }

    getPoint() {
        return new Point(this.getX(), this.getY());
    }

    getCenterPoint() {
        return new Point(this.getX() + this.halfWidth, this.getY() + this.halfHeight);
    }

    /**
     * Detect collisions between two sprites
     * @param r1
     * @param r2
     * @returns {boolean}
     */
    isCollidingWithSprite(sprite) {
        const thisCenterPoint = this.getCenterPoint();
        const thatCenterPoint = sprite.getCenterPoint();

        //Calculate the distance vector between the sprites
        const vx = thisCenterPoint.getX() - thatCenterPoint.getX();
        const vy = thisCenterPoint.getY() - thatCenterPoint.getY();

        //Figure out the combined half-widths and half-heights
        const combinedHalfWidths = this.getHalfWidth() + sprite.getHalfWidth();
        const combinedHalfHeights = this.getHalfHeight() + sprite.getHalfHeight();

        return Math.abs(vx) < combinedHalfWidths
            && Math.abs(vy) < combinedHalfHeights;
    }
}

export default Sprite;

import DynamicSprite from './DynamicSprite';
import Point from './Point';

class DynamicContainerSprite extends DynamicSprite {
    constructor(sprite, container) {
        super(sprite);
        this.container = container;
    }

    getX() {
        return this.container.x;
    }

    getY() {
        return this.container.y;
    }

    getPoint() {
        return new Point(this.getX(), this.getY());
    }

    getContainer() {
        return this.container;
    }

    moveToDirection(direction) {
        const {radians, incrementX, incrementY} = direction;

        this.sprite.rotation = radians;
        this.container.x += incrementX;
        this.container.y += incrementY;
    }


}

export default DynamicContainerSprite;

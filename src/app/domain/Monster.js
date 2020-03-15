import DynamicSprite from './DynamicSprite';

class Monster extends DynamicSprite {
    constructor(sprite) {
        super(sprite);
    }

    moveToFood(food) {
        const directions = this.getDirectionsToSprite(food);
        this.moveTo(directions);
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
}

export default Monster;

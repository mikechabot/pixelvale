import Sprite from './Sprite';

import {getFoodSprite} from '../util/sprite';

class Food extends Sprite {
    constructor(foodSpriteMap) {
        super(getFoodSprite(foodSpriteMap));
    }
}

export default Food;

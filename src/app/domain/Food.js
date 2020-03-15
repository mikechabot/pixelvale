import Sprite from './Sprite';

import {getFoodSprite} from '../util/sprite';

class Food extends Sprite {
    constructor() {
        super(getFoodSprite());
    }
}

export default Food;

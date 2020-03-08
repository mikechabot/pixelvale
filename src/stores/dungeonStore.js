import { observable, decorate} from "mobx"

import World from '../domain/world';
import {getNumberBetween} from '../util/random';

class DungeonStore {
    constructor() {
        const width = getNumberBetween(20, 30);
        const height = getNumberBetween(20, 30);

        this.world = new World(width, height);
    }

    getTileAt(x, y) {
        return this.world.getTileAt(x, y);
    }

    getDimensions() {
        return {
            width: this.world.width,
            height: this.world.height
        }
    }
}

export default decorate(DungeonStore, {
    world: observable,
})

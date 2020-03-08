import Maybe from 'maybe-baby';

import Tile from './tile';
import {getNumberBetween} from '../util/random';
import Room from './room';

class World {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.tiles = {};
        this.rooms = {};

        this.constructWorld();
        this.generateRooms();
    }

    constructWorld() {
        for (let x = 0; x < this.width; x++) {
            this.tiles[x] = {};
            for (let y = 0; y < this.height; y++) {
                this.tiles[x][y] = new Tile(x, y);
            }
        }
    }

    getNonRoomTile(attempts = 0) {
        if (attempts < 5) {
            const startX = getNumberBetween(1, this.width - 1);
            const startY = getNumberBetween(1, this.height - 1);
            const startTile = this.getTileAt(startX, startY);
            if (startTile.room) {
                return this.getNonRoomTile(++attempts);
            }
            return startTile;
        }

        console.warn('Ran out of attempts at room finding. Stopping.');
        return;
    }

    generateRooms() {
        const numberOfRooms = getNumberBetween(5, 7);

        for (let i = 0; i < numberOfRooms; i++) {
            const startTile = this.getNonRoomTile(0);

            if (startTile) {
                const room = new Room(i);

                const roomDimensions = {
                    width: getNumberBetween(4, 8),
                    height: getNumberBetween(4, 8)
                }

                room.build(startTile, roomDimensions, this);

                this.rooms = {id: room.id, room}
            }
        }
    }

    getTileAt(x, y) {
        const tile = Maybe.of(() => this.tiles[x][y]);

        if (tile.isNothing()) {
            console.error(`No tile found at x:${x}, y:${y}!`);
            return;
        }

        return tile.join();
    }

    isEdgeTile(tile) {
        return tile.x === 0
            || tile.y === 0
            || tile.x === this.width - 1
            || tile.y === this.height -1;
    }
}


export default World;

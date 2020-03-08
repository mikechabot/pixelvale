import isNil from 'lodash/isNil';
import includes from 'lodash/includes';

class Room {
    constructor(id) {
        this.id = id;
        this.tiles = [];
    }

    assignToTile(tile) {
        if (includes(this.tiles, tile)) {
            console.warn(`Tile x:${tile.x}, y:${tile.y} is already assigned this room`);
            return;
        }

        if (!isNil(tile.room)) {
            console.error(`Tile x:${tile.x}, y:${tile.y} is already assigned to room ${tile.room.id}!`);
            return;
        }

        tile.room = this;

        this.tiles.push(tile);
    }

    build(startTile, roomDimensions, world) {
        if (!startTile) {
            console.error('Cannot build room with missing startTile!');
            return;
        }

        const startX = startTile.x;
        const startY = startTile.y;
        const {width, height} = roomDimensions;

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const tile = world.getTileAt(startX + x, startY + y);
                if (tile) {
                    console.log(`Trying to assign tile ${tile.toString()} to room ${this.id}`);
                    if (!world.isEdgeTile(tile)) {
                        console.log(`Assigned tile ${tile.toString()} to room ${this.id}`);
                        this.assignToTile(tile);
                    }
                }
            }
        }
    }
}

export default Room;

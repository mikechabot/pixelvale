import Maybe from 'maybe-baby';

import Tile from './tile';
import Room from './room';

import {TILE_TYPE} from './enums/tileType';
import {getOddNumberBetween, getNumberBetween} from '../util/random';

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
                const tile = new Tile(x, y, this);
                tile.type = TILE_TYPE.EARTH;
                this.tiles[x][y] = tile;
            }
        }
    }

    checkRoomBoundaries(centerTile, roomDimensions) {
        const {x, y} = centerTile;

        const offsetX = Math.floor(roomDimensions.width / 2);
        const offsetY = Math.floor(roomDimensions.height / 2);

        const northWestTile = this.getTileAt(x - offsetX, y - offsetY);
        const southEastTile = this.getTileAt(x + offsetX, y + offsetY);

        const hasTiles = Boolean(northWestTile) && Boolean(southEastTile);

        if (!hasTiles) {
            console.error('Unable to get tiles within bounds');
            return false;
        }

        if (this.isEdgeTile(northWestTile) || this.isEdgeTile(southEastTile)) {
            console.error('One of the tiles is an edge tile');
            return false;
        }

        return true;
    }

    /**
     * Attempt to generate room dimensions that are within bounds
     * @param centerTile
     * @param attempts
     * @returns {undefined|{width, height}|{width: *, height: *}}
     */
    getRoomDimensions(centerTile, attempts = 0) {
        if (attempts >= 10) {
            console.warn(`Giving up on room generation after ${attempts} attempts`);
            return;
        }

        // const roomDimensions = {
        //     width: 5,
        //     height: 3
        // };

        const roomDimensions = {
            width: getOddNumberBetween(5, 5),
            height: getOddNumberBetween(5, 9)
        };

        if (!this.checkRoomBoundaries(centerTile, roomDimensions)) {
            return this.getRoomDimensions(centerTile, ++attempts);
        }

        console.log(`Generating room with dimensions: ${JSON.stringify(roomDimensions)}`);

        return roomDimensions;
    }

    generateRooms() {
        const initialRoomDimensions = {width: 5, height: 7};
        this.generateInitialRoom(initialRoomDimensions);
    }

    generateInitialRoom(roomDimensions) {
        const x = Math.floor(this.width / 4);
        const y = Math.floor(this.height / 4);

        const centerTile = this.getTileAt(x, y);

        this.generateRoom(centerTile, roomDimensions);
    }

    generateRoom(tile, roomDimensions) {

        if (!this.checkRoomBoundaries(tile, roomDimensions)) {
            return;
        }

        const room = new Room(1, roomDimensions);
        this.rooms = {id: room.id, room};

        const offsetX = Math.floor(roomDimensions.width / 2);
        const offsetY = Math.floor(roomDimensions.height / 2);

        const {x, y} = tile;

        const northWestTile = this.getTileAt(x - offsetX, y - offsetY);
        const northEastTile = this.getTileAt(x + offsetX, y - offsetY);
        const southEastTile = this.getTileAt(x + offsetX, y + offsetY);
        const southWestTile = this.getTileAt(x - offsetX, y + offsetY);

        northWestTile.text = 'NW';
        northEastTile.text = 'NE';
        southEastTile.text = 'SE';
        southWestTile.text = 'SW';

        const boundaries = [northWestTile, northEastTile, southEastTile, southWestTile];

        boundaries.forEach(boundaryTile => {
            boundaryTile.type = TILE_TYPE.WALL;
        });

        this.performRoomFloodFill(room, boundaries, tile);

        this.generateHallwayFromRoom(room);

    }

    generateHallwayFromRoom(room) {
        console.log('ROOM', room);
        const {tiles} = room;

        const maxX = Math.max(...tiles.map(t => t.x));
        const maxY = Math.max(...tiles.map(t => t.y));

        const startHallwayTile = this.getTileAt(maxX + 5,  maxY - 1);
        if (!startHallwayTile) {
            return;
        }

        startHallwayTile.text = 'DOOR';

        // this.generateRoom(startHallwayTile, {width: 7, height: 5});
    }

    performRoomFloodFill(room, boundaries, centerTile) {
        this.assignWallBoundaries(room, boundaries);

        centerTile.getNeighbors().forEach(neighbor => {
            this.floodFillRoom(room, neighbor);
        });
    }

    /**
     * Create the walls around a room.
     * Given a set of boundary tiles, assign walls along their X and Y axis.
     * Northern walls are three tiles high, so assign walls to these as well.
     * @param room
     * @param boundaries
     */
    assignWallBoundaries(room, boundaries) {
        const [northWestTile, northEastTile, southEastTile, southWestTile] = boundaries;

        const middleStoryWallOfNorthWest = northWestTile.south();
        const middleStoryWallOfNorthEast = northEastTile.south();

        const bottomStoryWallOfNorthWest = middleStoryWallOfNorthWest.south();
        const bottomStoryWallOfNorthEast = middleStoryWallOfNorthEast.south();

        this.floodFillFromTo(room, northWestTile, northEastTile, TILE_TYPE.WALL);
        this.floodFillFromTo(room, middleStoryWallOfNorthWest, middleStoryWallOfNorthEast, TILE_TYPE.WALL);
        this.floodFillFromTo(room, bottomStoryWallOfNorthWest, bottomStoryWallOfNorthEast, TILE_TYPE.WALL);
        this.floodFillFromTo(room, northEastTile, southEastTile, TILE_TYPE.WALL);
        this.floodFillFromTo(room, southEastTile, southWestTile, TILE_TYPE.WALL);
        this.floodFillFromTo(room, southWestTile, northWestTile, TILE_TYPE.WALL);
    }

    floodFillRoom(room, tile) {
        // We can't flood here, so just return.
        if (!this.isTileFillable(tile)) {
            return;
        }

        const tileQueue = [tile];

        while(tileQueue.length > 0) {
            const t = tileQueue.pop();

            room.assignToTile(t);
            t.type = TILE_TYPE.FLOOR;

            t.getNeighbors().forEach(neighbor => {
                if (!neighbor) {
                    return;
                }

                if (this.isTileFillable(neighbor)) {
                    room.assignToTile(neighbor);
                    neighbor.type = TILE_TYPE.FLOOR;
                    tileQueue.push(neighbor);
                }
            });
        }
    }

    /**
     * Given a "fromTile" and "toTile", flood fill between them along a direct X, Y pathway.
     * @param room
     * @param fromTile
     * @param toTile
     * @param tileType
     */
    floodFillFromTo(room, fromTile, toTile, tileType) {
        // We've completed the flood, just return.
        if (fromTile.x === toTile.x && fromTile.y === toTile.y) {
            return;
        }

        fromTile.type = tileType;

        let nextTile;

        // Flood north
        if (fromTile.y < toTile.y) {
            nextTile = this.getTileAt(fromTile.x, fromTile.y + 1);
        }

        // Flood east
        if (fromTile.x < toTile.x) {
            nextTile = this.getTileAt(fromTile.x + 1, fromTile.y);
        }

        // Flood south
        if (fromTile.y > toTile.y) {
            nextTile = this.getTileAt(fromTile.x, fromTile.y - 1);
        }

        // Flood west
        if (fromTile.x > toTile.x) {
            nextTile = this.getTileAt(fromTile.x - 1, fromTile.y);
        }

        if (nextTile) {
            this.floodFillFromTo(room, nextTile, toTile, tileType);
        }
    }

    isTileFillable(tile) {
        if (!tile) {
            return false;
        }

        if (tile.room) {
            return false;
        }

        if (tile.type === TILE_TYPE.WALL || tile.type === TILE_TYPE.FLOOR) {
            return false;
        }

        return true;
    }

    getTileAt(x, y) {
        const tile = Maybe.of(() => this.tiles[x][y]);

        if (tile.isNothing()) {
            // console.warn(`No tile found at x:${x}, y:${y}!`);
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

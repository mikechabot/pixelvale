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

    checkPotentialRoomBoundaries(centerTile, roomDimensions, roomCount) {

        console.log('Checking room boundaries for', centerTile.toString());

        const {x, y} = centerTile;

        const offsetX = Math.floor(roomDimensions.width / 2);
        const offsetY = Math.floor(roomDimensions.height / 2);

        const northWestTile = this.getTileAt(x - offsetX - 1, y - offsetY - 1);
        const southEastTile = this.getTileAt(x + offsetX + 1, y + offsetY + 1);

        const hasTiles = Boolean(northWestTile) && Boolean(southEastTile);

        if (!hasTiles) {
            console.warn('Unable to get tiles within bounds');
            return false;
        }

        if (this.isEdgeTile(northWestTile) || this.isEdgeTile(southEastTile)) {
            console.warn('One of the tiles is an edge tile');
            return false;
        }

        const northEastTile = this.getTileAt(x + offsetX + 1, y - offsetY - 1);
        const southWestTile = this.getTileAt(x - offsetX - 1, y + offsetY + 1);

        if (this.hasRoomBetweenTiles(roomCount, northWestTile, northEastTile)) return false;
        if (this.hasRoomBetweenTiles(roomCount, northEastTile, southEastTile)) return false;
        if (this.hasRoomBetweenTiles(roomCount, southEastTile, southWestTile)) return false;
        if (this.hasRoomBetweenTiles(roomCount, southWestTile, northWestTile)) return false;

        return true;
    }

    /**
     * Attempt to generate room dimensions that are within bounds
     * @param centerTile
     * @param attempts
     * @returns {undefined|{width, height}|{width: *, height: *}}
     */
    getRoomDimensions(centerTile, roomCount) {
        // const roomDimensions = {
        //     width: 5,
        //     height: 3
        // };
        const roomDimensions = {
            width: getOddNumberBetween(5, 9),
            height: getOddNumberBetween(7, 9)
        };

        if (!this.checkPotentialRoomBoundaries(centerTile, roomDimensions, roomCount)) {
            return;
        }

        console.log(`Generating room with dimensions: ${JSON.stringify(roomDimensions)}`);

        return roomDimensions;
    }

    generateRooms() {
        let attempts = 20;

        while(attempts > 0) {

            const x = getNumberBetween(5, this.width - 5);
            const y = getNumberBetween(5, this.height - 5);

            const startingTile = this.getTileAt(x, y);
            if (startingTile.room) {
                --attempts;
                console.warn('Starting tile has a room, starting over, attempt #', attempts);
                continue;
            }

            const room = this.generateRoom(startingTile);

            if (!room) {
                --attempts;
                console.warn('Unable to generate room, starting over, attempt #', attempts);
                continue;
            }

            console.log('Successfully generated a room at', startingTile.toString());
        }
    }

    generateRoom(startingTile) {

        console.log('ATTEMPTING ROOM GENERATION');

        const roomCount = Object.keys(this.rooms).length + 1;
        const roomDimensions = this.getRoomDimensions(startingTile, roomCount);

        if (!roomDimensions) {
            return;
        }

        const room = new Room(roomCount, roomDimensions, startingTile);

        this.rooms[room.id] = room;

        const offsetX = Math.floor(roomDimensions.width / 2);
        const offsetY = Math.floor(roomDimensions.height / 2);

        const {x, y} = startingTile;

        const northWestTile = this.getTileAt(x - offsetX, y - offsetY);
        const northEastTile = this.getTileAt(x + offsetX, y - offsetY);
        const southEastTile = this.getTileAt(x + offsetX, y + offsetY);
        const southWestTile = this.getTileAt(x - offsetX, y + offsetY);

        const boundaries = [northWestTile, northEastTile, southEastTile, southWestTile];

        boundaries.forEach(b => {
            room.assignToTile(b);
        });

        this.performRoomFloodFill(room, boundaries, startingTile);

        return room;
    }

    performRoomFloodFill(room, boundaries, startingTile) {
        this.assignWallBoundaries(room, boundaries);

        startingTile.getNeighbors().forEach(neighbor => {
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

        this.floodFillFromToWithRoomAssignment(room, northWestTile, northEastTile, TILE_TYPE.WALL);
        this.floodFillFromToWithRoomAssignment(room, middleStoryWallOfNorthWest, middleStoryWallOfNorthEast, TILE_TYPE.WALL);
        this.floodFillFromToWithRoomAssignment(room, bottomStoryWallOfNorthWest, bottomStoryWallOfNorthEast, TILE_TYPE.WALL);
        this.floodFillFromToWithRoomAssignment(room, northEastTile, southEastTile, TILE_TYPE.WALL);
        this.floodFillFromToWithRoomAssignment(room, southEastTile, southWestTile, TILE_TYPE.WALL);
        this.floodFillFromToWithRoomAssignment(room, southWestTile, northWestTile, TILE_TYPE.WALL);
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
    floodFillFromToWithRoomAssignment(room, fromTile, toTile, tileType) {
        // We've completed the flood, just return.
        if (this.isSameTile(fromTile, toTile)) {
            return;
        }

        // The tile doesn't have a room, so it assign it this one
        if (!fromTile.room) {
            room.assignToTile(fromTile);
        }

        // This tile has already been flooded via another room fill
        if (fromTile.room.id !== room.id) {
            return;
        }

        fromTile.type = tileType;

        const nextTile = this.getNextNeighborTile(fromTile, toTile);

        if (nextTile) {
            this.floodFillFromToWithRoomAssignment(room, nextTile, toTile, tileType);
        }
    }

    floodFillFromTo(fromTile, toTile, tileType) {
        if (this.isSameTile(fromTile, toTile)) {
            return;
        }

        const nextTile = this.getNextNeighborTile(fromTile, toTile);

        if (nextTile) {
            nextTile.type = tileType;
            this.floodFillFromTo(nextTile, toTile, tileType);
        }
    }

    isSameTile(tileA, tileB) {
        return tileA.x === tileB.x && tileA.y === tileB.y;
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

    hasRoomBetweenTiles(roomCount, fromTile, toTile) {
        // One of the tiles has a room
        if (fromTile.room || toTile.room) {
            return true;
        }

        // We're at out destination tile, if we're here, then
        // we haven't found a room between them
        if (fromTile.x === toTile.x && fromTile.y === toTile.y) {
            return false;
        }

        const nextTile = this.getNextNeighborTile(fromTile, toTile);

        if (nextTile) {
            return this.hasRoomBetweenTiles(roomCount, nextTile, toTile);
        }

        return false;
    }

    generateHallways() {
        const doorTiles = [];
        Object
            .keys(this.rooms)
            .forEach(roomId => {
                const room = this.rooms[roomId];
                const southernMostTile = room.getSouthernMostRoomTile();
                if (southernMostTile) {
                    southernMostTile.text = 'DOOR';
                    doorTiles.push(southernMostTile);
                }
            });

        if (doorTiles.length) {
            console.log('FLOODFILL WATER');
            this.floodFillFromTo(doorTiles[0], doorTiles[1], TILE_TYPE.WATER);
        }
    }

    getNextNeighborTile(fromTile, toTile) {
        let nextTile;

        // Get north tile
        if (fromTile.y > toTile.y) {
            nextTile = fromTile.north();
        }

        // Get east tile
        if (fromTile.x < toTile.x) {
            nextTile = fromTile.east();
        }

        // Get south tile
        if (fromTile.y < toTile.y) {
            nextTile = fromTile.south();
        }

        // Get west tile
        if (fromTile.x > toTile.x) {
            nextTile = fromTile.west();
        }

        return nextTile;
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

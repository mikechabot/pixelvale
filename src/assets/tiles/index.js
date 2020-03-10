import {getNumberBetween} from '../../util/random';

import {TILE_TYPE} from '../../domain/enums/tileType';

import earth from './earth/earth.png';
import earthWallWest from './earth/earth-wall-west.png';
import earthWallEast from './earth/earth-wall-east.png';
import earthWallNorth from './earth/earth-wall-north.png';
import earthWallSouth from './earth/earth-wall-south.png';
import earthWallSouthEast from './earth/earth-wall-south-east.png';
import earthWallSouthWest from './earth/earth-wall-south-west.png';
import earthWallNorthEast from './earth/earth-wall-north-east.png';
import earthWallNorthWest from './earth/earth-wall-north-west.png';

import floor2 from './floors/floor-2.png';
import floor3 from './floors/floor-3.png';
import floor4 from './floors/floor-4.png';
import floor5 from './floors/floor-5.png';
import floor6 from './floors/floor-6.png';
import floor7 from './floors/floor-7.png';
import floor8 from './floors/floor-8.png';

import wallNorth from './walls/wall-north.png';
import wallSouth from './walls/wall-south.png';
import wallEast from './walls/wall-east.png';
import wallWest from './walls/wall-west.png';
import wallNorthEast from './walls/wall-north-east.png';
import wallNorthWest from './walls/wall-north-west.png';
import wallSouthEast from './walls/wall-south-east.png';
import wallSouthWest from './walls/wall-south-west.png';

import wallNorthBottom from './walls/wall-north-bottom.png';
import wallNorthTop from './walls/wall-north-top.png';

const floors = [floor2, floor3, floor4, floor5, floor6, floor7, floor8];

const isTileOfType = (neighbor, type) => {
    if (!neighbor) return;
    return neighbor.type === type;
};

export const getTileTypeImage = tile => {

    const [north, east, south, west] = tile.getNeighbors();

    switch (tile.type) {
        case TILE_TYPE.FLOOR: {
            return floors[getNumberBetween(0, floors.length - 1)];
        }
        case TILE_TYPE.WALL: {

            // Southwest corner of wall
            if (isTileOfType(west, TILE_TYPE.EARTH)
                && isTileOfType(east, TILE_TYPE.WALL)
                && isTileOfType(south, TILE_TYPE.EARTH)) {
                return earthWallNorthEast;
            }

            // Southeast corner of wall
            if (isTileOfType(east, TILE_TYPE.EARTH)
                && isTileOfType(west, TILE_TYPE.WALL)
                && isTileOfType(south, TILE_TYPE.EARTH)) {
                return earthWallNorthWest;
            }

            // Northwest corner of wall
            if (isTileOfType(west, TILE_TYPE.EARTH)
                && isTileOfType(north, TILE_TYPE.EARTH)
                && isTileOfType(east, TILE_TYPE.WALL)) {
                return earthWallSouthEast;
            }

            // Northeast corner of wall
            if (isTileOfType(east, TILE_TYPE.EARTH)
                && isTileOfType(north, TILE_TYPE.EARTH)
                && isTileOfType(west, TILE_TYPE.WALL)) {
                return earthWallSouthWest;
            }

            // Bottom story of wall
            if (isTileOfType(south, TILE_TYPE.FLOOR)
                && isTileOfType(north, TILE_TYPE.WALL)) {
                return wallNorthBottom;
            }

            // Middle story of wall
            if (isTileOfType(north, TILE_TYPE.WALL)
                && isTileOfType(south, TILE_TYPE.WALL)
                && isTileOfType(east, TILE_TYPE.WALL)
                && isTileOfType(west, TILE_TYPE.WALL)) {
                return wallNorthTop;
            }

            // South wall
            if (isTileOfType(south, TILE_TYPE.EARTH)) {
                return earthWallNorth;
            }

            // North wall
            if (isTileOfType(north, TILE_TYPE.EARTH)) {
                return earthWallSouth;
            }

            // West wall
            if (isTileOfType(west, TILE_TYPE.EARTH)) {
                return earthWallEast;
            }

            // East wall
            if (isTileOfType(east, TILE_TYPE.EARTH)) {
                return earthWallWest;
            }

            return;
        }
        default: return;
    }
};

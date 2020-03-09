import {getNumberBetween} from '../../util/random';

import {TILE_TYPE} from '../../domain/enums/tileType';

import earth from './earth.png';

import floor1 from './floor/floor-1.png';
import floor2 from './floor/floor-2.png';
import floor3 from './floor/floor-3.png'
import floor4 from './floor/floor-4.png';
import floor5 from './floor/floor-5.png';
import floor6 from './floor/floor-6.png';
import floor7 from './floor/floor-7.png';
import floor8 from './floor/floor-8.png';

const floors = [floor1, floor2, floor3, floor4, floor5, floor6, floor7, floor8];

export const TILE_TYPE_IMAGE = {
    [TILE_TYPE.EARTH]: () => earth,
    [TILE_TYPE.FLOOR]: () => floors[getNumberBetween(0, floors.length - 1)],
}

import React from 'react';
import classNames from 'classnames/bind';
import { observer } from 'mobx-react'
import { useStores } from '../hooks';

import {getColorAsHex} from '../util/random';
import {TILE_TYPE_IMAGE} from '../assets/tiles';

import styles from './styles/Pixelvale.module.scss';
const cx = classNames.bind(styles);

const generateTileMap = (dungeonStore) => {
    const {width, height} = dungeonStore.getDimensions();

    const roomColorMap = {};

    const tileMap = [];
    for (let x = 0; x < width; x++) {
        const children = [];
        for (let y = 0; y < height; y++) {

            const tile = dungeonStore.getTileAt(x, y);

            const tileTypeImage = TILE_TYPE_IMAGE[tile.type];

            const backgroundStyle = {};
            if (tileTypeImage) {
                backgroundStyle.backgroundImage = `url(${tileTypeImage()})`;
                backgroundStyle.backgroundSize = 'contain';
            }

            // const roomStyle = {};
            // if (tile.room) {
            //     backgroundStyle.backgroundImage = null;
            // }

            children.push(
                <div
                    key={`tile:${tile.toString()}`}
                    style={{
                        height: 64, width: 64,
                        flexShrink: 0,
                        fontSize: 12,
                        ...backgroundStyle
                    }}>
                    <div>{`${tile.x},${tile.y}`}</div>
                    {tile.room && (
                        <div style={{fontWeight: 'bold'}}>{tile.room ? `r:${tile.room.id}` : ''}</div>
                    )}
                </div>
            )
        }
        tileMap.push(<div key={x} style={{display: 'flex', flexShrink: 0}}>{children}</div>)
    }

    return tileMap;
}

export const Pixelvale = observer(() => {
    const { dungeonStore } = useStores()
    return (
        <div className={cx('pixelvale')}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                {generateTileMap(dungeonStore)}
            </div>
        </div>
    )
})

export default Pixelvale;

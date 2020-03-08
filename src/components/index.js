import React from 'react';
import classNames from 'classnames/bind';
import { observer } from 'mobx-react'
import { useStores } from '../hooks';

import styles from './styles/Pixelvale.module.scss';
const cx = classNames.bind(styles);

const generateTileMap = (dungeonStore) => {
    const {width, height} = dungeonStore.getDimensions();

    const tileMap = [];
    for (let x = 0; x < width; x++) {
        const children = [];
        for (let y = 0; y < height; y++) {

            const tile = dungeonStore.getTileAt(x, y);

            const roomStyle = {};
            if (tile.room) {
                roomStyle.backgroundColor = 'cyan';
            }

            children.push(
                <div
                    style={{
                        border: '1px solid black',
                        height: 25, width: 25,
                        flexShrink: 0,
                        fontSize: 8,
                        ...roomStyle
                    }}>
                    <div>{`${tile.x},${tile.y}`}</div>
                    {tile.room && (
                        <div style={{fontWeight: 'bold'}}>{tile.room ? `r:${tile.room.id}` : ''}</div>
                    )}
                </div>
            )
        }
        tileMap.push(<div style={{display: 'flex', flexShrink: 0}}>{children}</div>)
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

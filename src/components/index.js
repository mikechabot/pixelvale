import React from 'react';
import classNames from 'classnames/bind';
import { observer } from 'mobx-react';
import { useStores } from '../hooks';

import Tile from './tile';

import styles from './styles/Pixelvale.module.scss';
const cx = classNames.bind(styles);

const generateTileMap = (dungeonStore) => {
    const {width, height} = dungeonStore.getDimensions();

    const tileMap = [];
    for (let y = 0; y < height; y++) {
        const children = [];
        for (let x = 0; x < width; x++) {
            const tile = dungeonStore.getTileAt(x, y);
            children.push((
                <Tile
                    key={`tile:${tile.toString()}`}
                    tile={tile}
                />
            ));
        }
        tileMap.push(<div key={y} style={{display: 'flex'}}>{children}</div>);
    }

    return tileMap;
};

export const Pixelvale = observer(() => {
    const { dungeonStore } = useStores();
    return (
        <div className={cx('pixelvale')} style={{width: '100%', height: '100%'}}>
            <div style={{display: 'flex', flexDirection: 'column', height: '100%', width: '100%'}}>
                {generateTileMap(dungeonStore)}
            </div>
        </div>
    );
});

export default Pixelvale;

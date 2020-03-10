import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import {getTileTypeImage} from '../../assets/tiles';

import styles from './styles/Tile.scss';
const cx = classNames.bind(styles);

const Tile = ({tile}) => {

    const tileTypeImage = getTileTypeImage(tile);

    const backgroundStyle = {};
    if (tileTypeImage) {
        backgroundStyle.backgroundImage = `url(${tileTypeImage})`;
        backgroundStyle.backgroundSize = 'contain';
    }

    return (
        <div
            className={cx('tile')}
            style={backgroundStyle}>
            <div>{`${tile.x},${tile.y}`}</div>
            <div><span style={{color: 'red', fontSize: 10}}>{tile.text}</span></div>
            <div>{tile.type}</div>
            {tile.room && (
                <div style={{fontWeight: 'bold'}}>{tile.room ? `r:${tile.room.id}` : ''}</div>
            )}
        </div>
    );
};

Tile.propTypes = {
    tile: PropTypes.instanceOf(Object),
};

export default Tile;

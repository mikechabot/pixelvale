import React from 'react';
import {observer} from 'mobx-react';
import {useStore} from '../stores/useStore';

export const PixelvaleStats = observer(() => {
    const store = useStore();
    const {monsterStore, foodStore} = store;
    return (
        <div>
            <nav className="level">
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">Food Count</p>
                        <p id="food-count-display" className="title">
                            {foodStore.count}
                        </p>
                    </div>
                </div>
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">Monsters Count</p>
                        <p id="monster-count-display" className="title">
                            {monsterStore.count}
                        </p>
                    </div>
                </div>
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">Average Speed</p>
                        <p id="monster-avg-speed-display" className="title">
                            {monsterStore.averageSpeed}
                        </p>
                    </div>
                </div>
            </nav>s
        </div>
    );
});

export default PixelvaleStats;

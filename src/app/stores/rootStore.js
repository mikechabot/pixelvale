import MonsterStore from './monsterStore';
import FoodStore from './foodStore';
import {autorun} from 'mobx';
import {buildCharts, updateMonsterCountChart, updateMonsterSpeedChart} from '../charts';

const chartOptions = {
    delay: 250
};

class RootStore {
    constructor(monsters, foods) {
        this.monsterStore = new MonsterStore(this, monsters);
        this.foodStore = new FoodStore(this, foods);

        const {
            monsterSpeedChart,
            monsterEnergyChart
        } = buildCharts(monsters);

        autorun(() => {
            updateMonsterSpeedChart(monsterSpeedChart, this.monsterStore.monsters);
            updateMonsterCountChart(monsterEnergyChart, this.monsterStore.monsters);
        }, chartOptions);
    }
}

export default RootStore;

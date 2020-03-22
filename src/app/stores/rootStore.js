import MonsterStore from './monsterStore';
import FoodStore from './foodStore';
import {autorun, reaction} from 'mobx';
import {buildCharts, updateMonsterCountChart, updateMonsterSpeedChart} from '../charts';

const monsterCountDisplay = document.getElementById('monster-count-display');
const monsterAvgSpeedDisplay = document.getElementById('monster-avg-speed-display');
const foodCountDisplay = document.getElementById('food-count-display');

const defaultOptions = {
    delay: 1000
};

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


        reaction(() => this.monsterStore.count, (value = 0) => {
            this.updateElement(monsterCountDisplay, value);
        }, defaultOptions);

        reaction(() => this.monsterStore.averageSpeed, (value = 0) => {
            this.updateElement(monsterAvgSpeedDisplay, value.toFixed(2));
        }, defaultOptions);

        reaction(() => this.foodStore.count, (value = 0) => {
            this.updateElement(foodCountDisplay, value);
        }, defaultOptions);

        autorun(() => {
            updateMonsterSpeedChart(monsterSpeedChart, this.monsterStore.monsters);
            updateMonsterCountChart(monsterEnergyChart, this.monsterStore.monsters);
        }, chartOptions);
    }

    updateElement(element, value) {
        element.innerText = value.toString();
    }
}

export default RootStore;

import {monsterCountConfig, monsterSpeedConfig} from './config';
import {SPRITE_SPEEDS} from '../const';

const Chart = CanvasJS.Chart;

/**
 * Build the charts and hydrate it with data
 * @param monsters
 * @returns {{monsterEnergyChart: CanvasJS.Chart, monsterSpeedChart: CanvasJS.Chart}}
 */
export const buildCharts = monsters => {
    const monsterSpeedChart = buildMonsterSpeedChart();
    const monsterEnergyChart = buildMonsterCountChart();

    updateMonsterSpeedChart(monsterSpeedChart, monsters);
    updateMonsterCountChart(monsterEnergyChart, monsters);

    return {
        monsterSpeedChart,
        monsterEnergyChart
    };
};

/**
 * Build the monster count chart
 * @returns {CanvasJS.Chart}
 */
export const buildMonsterCountChart = () => {
    const chart = new Chart('monsters-energy', monsterCountConfig);
    chart.render();
    return chart;
};

/**
 * Build the monster speed chart
 * @returns {CanvasJS.Chart}
 */
export const buildMonsterSpeedChart = () => {
    const chart = new Chart('monsters-by-speed', monsterSpeedConfig);
    chart.render();
    return chart;
};

/**
 * Update the monster speed chart
 * @param chart
 * @param monsters
 */
export const updateMonsterSpeedChart = (chart, monsters) => {
    const dataPoints = [];
    for (let i=0; i < SPRITE_SPEEDS.length; i++) {
        const monstersAtSpeed = monsters.filter(m => m.getSpeed() === SPRITE_SPEEDS[i]);
        dataPoints.push({
            label: SPRITE_SPEEDS[i],
            y: monstersAtSpeed.length
        });
    }
    // Use the "set" function within CanvasJS to fully update the
    // the dataPoints property
    chart.data[0].set('dataPoints', dataPoints);
    chart.render();
};

/**
 * Update the monster count chart
 * @param chart
 * @param monsters
 */
export const updateMonsterCountChart = (chart, monsters) => {
    const date = new Date();

    /**
     * Set up axis 1
     */
    chart.data[0].dataPoints.push({
        x: date,
        y: monsters.length
    });

    const totalSpeed = monsters.map(m => m.getSpeed()).reduce((a, c) => a + c, 0);

    /**
     * Set up axis 2
     */
    chart.data[1].dataPoints.push({
        x: date,
        y: totalSpeed / monsters.length
    });

    chart.render();
};

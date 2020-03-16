const Chart = CanvasJS.Chart;

export const buildMonsterCountChart = () => {
    const chart = new Chart('monsters-energy', {
        title:{
            text: 'Monster Count'
        },
        axisX: {
            title: 'Time',
        },
        axisY: {
            title: 'Alive',
        },
        axisY2: {
            title: 'Average Speed',
            maximum: 6,
            interval: 1,
        },
        data: [
            {
                type: 'line',
                showInLegend: true,
                legendText: 'Alive',
                dataPoints: [],
            },
            {
                type: 'line',
                axisYType: 'secondary',
                showInLegend: true,
                legendText: 'Average Speed',
                color: 'orange',
                dataPoints: []
            }
        ]
    });

    chart.render();

    return chart;
};

export const buildMonsterSpeedChart = () => {
    const chart = new Chart('monsters-by-speed', {
        title:{
            text: 'Monsters by Speed'
        },
        axisX: {
            title: 'Speed',
        },
        axisY: {
            title: 'Count',
        },
        data: [
            {
                type: 'column',
                dataPoints: []
            }
        ]
    });

    chart.render();

    return chart;
};

export const updateMonsterSpeedChart = (chart, monsters) => {
    const dataPoints = [];

    const monstersBySpeed = {};
    monsters
        .filter(m => !m.isDead())
        .forEach(m => {
            const speed = m.getSpeed();
            const monstersOfSpeed = monstersBySpeed[speed];
            if (!monstersOfSpeed) {
                monstersBySpeed[speed] = [];
            }
            monstersBySpeed[speed].push(m);
        });

    Object
        .keys(monstersBySpeed)
        .sort()
        .forEach(speedKey => {
            dataPoints.push({
                label: speedKey,
                y: monstersBySpeed[speedKey].length
            });
        });



    chart.data[0].set('dataPoints', dataPoints);
    chart.render();
};


export const updateMonsterCountChart = (chart, monsters) => {
    const undead =  monsters.filter(m => !m.isDead());

    const date = new Date();

    chart.data[0].dataPoints.push({
        x: date,
        y: undead.length
    });

    const totalSpeed = undead.map(m => m.getSpeed()).reduce((a, c) => a + c, 0);

    chart.data[1].dataPoints.push({
        x: date,
        y: totalSpeed / undead.length
    });

    chart.render();
};


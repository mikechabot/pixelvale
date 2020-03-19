const chartTitleStyle = {
    fontFamily: 'Roboto Condensed',
    fontWeight: 'bold',
    fontSize: 16,
};

const axisStyle = {
    titleFontFamily: 'Roboto Condensed',
    titleFontWeight: 'bold',
};

/**
 * Configuration for the Monster Count chart
 * @type {}
 */
export const monsterCountConfig = {
    title:{
        text: 'Monster Count',
        ...chartTitleStyle,
    },
    backgroundColor: '#f9f9f9',
    theme: 'light2',
    axisX: {
        title: 'Time',
        ...axisStyle
    },
    axisY: {
        title: 'Alive',
        ...axisStyle
    },
    axisY2: {
        title: 'Average Speed',
        maximum: 6,
        interval: 1,
        ...axisStyle
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
            dataPoints: []
        }
    ]
};

/**
 * Configuration for the Monster Speed chart
 * @type {}
 */
export const monsterSpeedConfig = {
    title:{
        text: 'Monsters by Speed',
        ...chartTitleStyle,
    },
    backgroundColor: '#f9f9f9',
    theme: 'light2',
    axisX: {
        title: 'Speed',
        interval: 0.25,
        ...axisStyle
    },
    axisY: {
        title: 'Count',
        ...axisStyle
    },
    data: [
        {
            type: 'column',
            dataPoints: []
        }
    ]
};

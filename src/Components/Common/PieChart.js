import ReactApexChart from 'react-apexcharts'
import { getChartColorsArray } from './ChartsDynamicColor'
import CustomLoader from './CustomLoader'
import React from 'react'

const SimplePie = ({ dataColors, series, labels, loading, title }) => {
    var chartPieBasicColors = getChartColorsArray(dataColors)
    var options = {
        chart: {
            height: 350,
            type: 'pie',
        },
        labels: labels || [],
        legend: {
            position: 'bottom',
        },
        dataLabels: {
            dropShadow: {
                enabled: false,
            },
        },
        title: {
            text: title,
            align: 'left',
            style: {
                fontWeight: 500,
            },
        },
        colors: chartPieBasicColors,
    }
    return (
        <React.Fragment>
            {!loading ? (
                <ReactApexChart
                    dir='ltr'
                    className='apex-charts'
                    series={series}
                    options={options}
                    type='pie'
                    height={350}
                />
            ) : (
                <CustomLoader />
            )}
        </React.Fragment>
    )
}

const PatternedDonut = ({ dataColors, series, labels, loading, title }) => {
    var chartPiePatternColors = getChartColorsArray(dataColors)
    var options = {
        chart: {
            height: 300,
            type: 'donut',
            dropShadow: {
                enabled: true,
                color: '#111',
                top: -1,
                left: 3,
                blur: 3,
                opacity: 0.2,
            },
        },
        stroke: {
            width: 0,
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        total: {
                            showAlways: true,
                            show: true,
                        },
                    },
                },
            },
        },
        labels,
        dataLabels: {
            dropShadow: {
                blur: 3,
                opacity: 0.8,
            },
        },
        fill: {
            type: 'pattern',
            opacity: 1,
            pattern: {
                enabled: true,
                style: [
                    'verticalLines',
                    'squares',
                    'horizontalLines',
                    'circles',
                    'slantedLines',
                ],
            },
        },
        states: {
            hover: {
                filter: 'none',
            },
        },
        theme: {
            palette: 'palette2',
        },
        title: {
            text: title,
            style: {
                fontWeight: 500,
            },
        },
        legend: {
            position: 'bottom',
        },
        colors: chartPiePatternColors,
    }
    return (
        <React.Fragment>
            {!loading ? (
                <ReactApexChart
                    dir='ltr'
                    className='apex-charts'
                    series={series}
                    options={options}
                    type='donut'
                    height={350}
                />
            ) : (
                <CustomLoader height={'350px'} />
            )}
        </React.Fragment>
    )
}
export { SimplePie, PatternedDonut }

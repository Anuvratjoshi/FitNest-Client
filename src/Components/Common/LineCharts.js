import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { getChartColorsArray } from './ChartsDynamicColor'
import CustomLoader from './CustomLoader'
const BasicLineCharts = ({
    dataColors,
    series,
    title,
    categories,
    loading,
}) => {
    var linechartBasicColors = getChartColorsArray(dataColors)
    var options = {
        yaxis: {
            tickAmount: undefined, // let Apex calculate based on range
            forceNiceScale: true,
            labels: {
                formatter: val => (Number.isInteger(val) ? val : ''), // only show whole numbers
            },
        },
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: true,
            },
            toolbar: {
                show: false,
            },
        },
        markers: {
            size: 4,
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'straight',
        },
        colors: linechartBasicColors,
        title: {
            text: title,
            align: 'left',
            style: {
                fontWeight: 500,
            },
        },

        xaxis: {
            categories: categories || [],
        },
    }
    return (
        <React.Fragment>
            {!loading ? (
                <ReactApexChart
                    dir='ltr'
                    options={options}
                    series={series}
                    type='line'
                    height='350'
                    className='apex-charts'
                />
            ) : (
                <CustomLoader />
            )}
        </React.Fragment>
    )
}

export { BasicLineCharts }

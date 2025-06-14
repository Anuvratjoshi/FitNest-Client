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
export { SimplePie }

import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { getChartColorsArray } from './ChartsDynamicColor'
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
                <div
                    className='d-flex justify-content-center align-items-center flex-column'
                    style={{ height: '350px' }}
                >
                    <svg
                        width='60'
                        height='60'
                        viewBox='0 0 100 100'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        className='shaking-animation border-1'
                    >
                        <rect
                            x='25'
                            y='45'
                            width='50'
                            height='10'
                            fill='#4b4b4b'
                        />
                        <rect
                            x='20'
                            y='40'
                            width='5'
                            height='20'
                            fill='#2e2e2e'
                        />
                        <rect
                            x='75'
                            y='40'
                            width='5'
                            height='20'
                            fill='#2e2e2e'
                        />
                        <rect
                            x='15'
                            y='38'
                            width='3'
                            height='24'
                            fill='#7c7c7c'
                        />
                        <rect
                            x='82'
                            y='38'
                            width='3'
                            height='24'
                            fill='#7c7c7c'
                        />
                    </svg>
                    <span className='mt-2 fw-semibold text-muted'>
                        Lifting data...
                    </span>
                </div>
            )}
        </React.Fragment>
    )
}

export { BasicLineCharts }

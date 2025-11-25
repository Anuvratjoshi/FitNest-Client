import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap'
import Timer from '../../../../../Components/Common/Timer'
import { BasicLineCharts } from '../../../../../Components/Common/LineCharts'
import { toast } from 'react-toastify'
import {
    getRegisteredUserMonthWise,
    getSubscriptionBreakdown,
    getSubscriptionInfo,
} from '../../../../../helpers/apiservice_helper'
import CHART_CATEGORIES from '../../../../../Components/constants/categories'
import {
    PatternedDonut,
    SimplePie,
} from '../../../../../Components/Common/PieChart'

const UserAnalytics = () => {
    document.title = 'Analytics | Manage-Users'

    // #### Fetching registered users monthly count ####
    const [monthlyRegisteredUser, setMonthlyRegisteredUser] = useState({
        monthly: {},
        quaterly: {},
    })
    const [m_r_u_loading, set_m_r_u_loading] = useState(true)
    const fetchRegisteredUsersMonthwise = async () => {
        try {
            set_m_r_u_loading(true)
            const res = await getRegisteredUserMonthWise()
            setMonthlyRegisteredUser({
                monthly: res?.data?.[0],
                quaterly: res.data?.[1],
            })
        } catch (error) {
            console.log('!!! fetchRegisteredUsersMonthwise Error !!!', error)
            toast.error(error, { autoClose: 1500 })
        } finally {
            set_m_r_u_loading(false)
        }
    }

    // #### Fetching users subscription count ####
    const [users, setUsers] = useState({
        labels: [],
        data: [],
    })
    const [u_loading, set_u_loading] = useState(true)
    const fetchSubscriptionInfo = async () => {
        try {
            set_u_loading(true)
            const res = await getSubscriptionInfo()
            setUsers({
                labels: Object.keys(res.data?.[0]),
                data: Object.values(res.data?.[0]),
            })
        } catch (error) {
            console.log('!!! fetchSubscriptionInfo Error !!!', error)
            toast.error(error, { autoClose: 1500 })
        } finally {
            set_u_loading(false)
        }
    }

    // #### Fetching users subscription breakdown ####
    const [subscriptionBreakdown, setSubscriptionBreakdown] = useState({
        labels: [],
        data: [],
    })
    const [s_loading, set_s_loading] = useState(true)
    const fetchSubscriptionBreakdown = async () => {
        try {
            set_s_loading(true)
            const res = await getSubscriptionBreakdown()
            setSubscriptionBreakdown({
                labels: Object.keys(res.data?.[0]),
                data: Object.values(res.data?.[0]),
            })
        } catch (error) {
            console.log('!!! fetchSubscriptionBreakdown Error !!!', error)
            toast.error(error, { autoClose: 1500 })
        } finally {
            set_s_loading(false)
        }
    }

    const fetchData = async () => {
        try {
            await Promise.all([
                fetchRegisteredUsersMonthwise(),
                fetchSubscriptionInfo(),
                fetchSubscriptionBreakdown(),
            ])
        } catch (error) {
            console.log('!!! fetchData Error !!!', error)
            toast.error(error, { autoClose: 1500 })
        }
    }

    // #### initial side effect to fetch data ####
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <React.Fragment>
            <div className='page-content'>
                <Container fluid>
                    <Row>
                        <Timer
                            consoleTitle='User Analytics'
                            breadCrumbTitle='Manage Users'
                            pageTitle='Analytics'
                        />
                    </Row>
                    <Row>
                        <Col lg={6}>
                            {/* Line chart for registered users on monthly basis */}
                            <Card>
                                <CardHeader>
                                    <h4 className='card-title mb-0'>
                                        User Registered (
                                        <span className='mx-2 text-warning text-uppercase'>
                                            {'Monthly'}
                                        </span>
                                        )
                                    </h4>
                                </CardHeader>
                                <CardBody>
                                    <BasicLineCharts
                                        dataColors='["--vz-info"]'
                                        series={[
                                            monthlyRegisteredUser?.monthly,
                                        ]}
                                        categories={
                                            CHART_CATEGORIES?.LINE?.MONTHLY
                                                ?.DATA
                                        }
                                        title=''
                                        loading={m_r_u_loading}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg={6}>
                            {/* Line chart for registered users on quaterly basis */}
                            <Card>
                                <CardHeader>
                                    <h4 className='card-title mb-0'>
                                        User Registered (
                                        <span className='mx-2 text-warning text-uppercase'>
                                            {'Quaterly'}
                                        </span>
                                        )
                                    </h4>
                                </CardHeader>
                                <CardBody>
                                    <BasicLineCharts
                                        dataColors='["--vz-info"]'
                                        series={[
                                            monthlyRegisteredUser?.quaterly,
                                        ]}
                                        categories={
                                            CHART_CATEGORIES?.LINE?.QUATERLY
                                                ?.DATA
                                        }
                                        title=''
                                        loading={m_r_u_loading}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {/* Pie chart for subscription info display */}
                            <Card>
                                <CardHeader>
                                    <h4 className='card-title mb-0'>
                                        Subscription Info
                                    </h4>
                                </CardHeader>
                                <CardBody>
                                    <SimplePie
                                        dataColors='["--vz-primary", "--vz-success", "--vz-danger", "--vz-info"]'
                                        series={users.data}
                                        labels={users.labels}
                                        loading={u_loading}
                                        title=''
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {/* Pie chart for subscription breakdown display */}
                            <Card>
                                <CardHeader>
                                    <h4 className='card-title mb-0'>
                                        Subscription Breakdown
                                    </h4>
                                </CardHeader>
                                <CardBody>
                                    <PatternedDonut
                                        dataColors='["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]'
                                        series={subscriptionBreakdown.data}
                                        labels={subscriptionBreakdown.labels}
                                        loading={s_loading}
                                        title=''
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default UserAnalytics

import React, { useEffect, useState } from 'react'
import { Card, Container, Row } from 'reactstrap'
import Timer from '../../../../../Components/Common/Timer'
import ActivityTable from './Tables/ActivityTable'
import { getActivity } from '../../../../../helpers/apiservice_helper'

const Activity = () => {
    // #### Fetching admin activity logs ####
    const [adminActivityData, setAdminActivityData] = useState([])
    const [a_a_loading, set_a_a_loading] = useState(true)
    const fetchAdminActivity = async () => {
        try {
            set_a_a_loading(true)
            const res = await getActivity()
            setAdminActivityData(res.data)
        } catch (error) {
            console.log('!!! fetchAdminActivity Error !!!', error)
            toast.error(error, { autoClose: 1500 })
        } finally {
            set_a_a_loading(false)
        }
    }

    const fetchData = async () => {
        try {
            await Promise.all([fetchAdminActivity()])
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
                            consoleTitle='Activity Logs console'
                            breadCrumbTitle='Manage Users'
                            pageTitle='Acitvity Logs'
                        />
                    </Row>

                    {/* ACTIVITY TABLE */}
                    <Card>
                        <ActivityTable
                            data={adminActivityData}
                            loading={a_a_loading}
                            pageSize={10}
                        />
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default Activity

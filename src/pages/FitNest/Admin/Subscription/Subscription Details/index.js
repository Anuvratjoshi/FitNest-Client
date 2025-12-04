import React from 'react'
import { Container, Row } from 'reactstrap'
import Timer from '../../../../../Components/Common/Timer'
import Subscription from './Components/Subscription'

const SubscriptionDetails = () => {
    return (
        <React.Fragment>
            <div className='page-content'>
                <Container fluid>
                    <Row>
                        <Timer
                            consoleTitle='Subscription'
                            breadCrumbTitle='FitNest Subscription'
                            pageTitle='Subscription Details'
                        />
                    </Row>
                    <Row>
                        <Subscription />
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default SubscriptionDetails

import React from 'react'
import { Container, Row } from 'reactstrap'
import Timer from '../../../../../Components/Common/Timer'
import Pricing from './Pricing/Pricing'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { getLoggedinUser } from '../../../../../helpers/api_helper'

const stripePromise = loadStripe(process.env?.REACT_APP_STRIPE_PUBLIC_KEY)

const FitNestSubscription = () => {
    document.title = 'Pricing | Fitnest-Subscription'
    const user = getLoggedinUser()

    return (
        <React.Fragment>
            <div className='page-content'>
                <Container fluid>
                    <Row>
                        <Timer
                            consoleTitle='Subscription'
                            breadCrumbTitle='FitNest Subscription'
                            pageTitle='Subscription'
                        />
                    </Row>
                    {/* Pricing page */}
                    <Row>
                        <Elements stripe={stripePromise}>
                            {user?.data?._id && (
                                <Pricing gymId={user?.data?._id} />
                            )}
                        </Elements>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default FitNestSubscription

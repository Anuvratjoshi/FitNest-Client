import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap'
import Timer from '../../../../../Components/Common/Timer'
import StripePaymentForm from './Forms/StripePaymentForm'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { getLoggedinUser } from '../../../../../helpers/api_helper'
import CreditCard from './Cards/CreditCard'
import { getCustomerCards } from '../../../../../helpers/apiservice_helper'
import CustomLoader from '../../../../../Components/Common/CustomLoader'
const CardDetails = () => {
    const stripePromise = loadStripe(process.env?.REACT_APP_STRIPE_PUBLIC_KEY)
    const user = getLoggedinUser()
    // #### Fetching users all attached cards ####
    const [customerCards, setCustomerCards] = useState({
        all: [],
        default: [],
    })
    const [c_c_loading, set_c_c_loading] = useState(true)
    const fetchCustomerCards = async () => {
        try {
            set_c_c_loading(true)
            const res = await getCustomerCards()
            const defaultCard = res.data?.filter(card => card?.default)
            setCustomerCards({ all: res.data, default: defaultCard })
        } catch (error) {
            console.log('!!! fetchSubscriptionBreakdown Error !!!', error)
            toast.error(error, { autoClose: 1500 })
        } finally {
            set_c_c_loading(false)
        }
    }

    const fetchData = async () => {
        try {
            await fetchCustomerCards()
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
                            consoleTitle='Card details'
                            breadCrumbTitle='FitNest Subscription'
                            pageTitle='Card Details'
                        />
                    </Row>
                    <Row>
                        <Card>
                            <CardHeader>
                                <h4 className='card-title mb-0 flex-grow-1'>
                                    CARDS ADDED
                                </h4>
                            </CardHeader>
                            <CardBody>
                                {!c_c_loading ? (
                                    <div className='d-flex flex-wrap gap-3 justify-content-center justify-content-md-start'>
                                        {customerCards?.all?.length ? (
                                            customerCards?.all?.map(card => (
                                                <CreditCard
                                                    key={card?.id}
                                                    last4={card?.last4}
                                                    exp_month={card?.exp_month}
                                                    exp_year={card?.exp_year}
                                                    defaultCard={card?.default}
                                                    brand={card?.brand}
                                                />
                                            ))
                                        ) : (
                                            <p className='fw-semibold fs-6 text-muted'>
                                                No Cards Added Yet
                                            </p>
                                        )}
                                    </div>
                                ) : (
                                    <CustomLoader height={'248px'} />
                                )}
                            </CardBody>
                        </Card>
                    </Row>
                    <Row>
                        {user?.data?._id && (
                            <Elements stripe={stripePromise}>
                                <StripePaymentForm
                                    gymId={user?.data?._id}
                                    fetchCustomerCards={fetchCustomerCards}
                                    totalCardAdded={customerCards?.all?.length}
                                />
                            </Elements>
                        )}
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default CardDetails

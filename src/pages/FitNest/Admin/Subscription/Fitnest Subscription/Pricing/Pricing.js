import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Card,
    CardBody,
    Col,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Spinner,
} from 'reactstrap'
import classnames from 'classnames'
import { toast } from 'react-toastify'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { FITNEST_SUBSCIPTION_PRICING } from '../../../../../../Components/constants/pricing'
import { createStripeSubscription } from '../../../../../../helpers/apiservice_helper'

const Pricing = ({ gymId }) => {
    const [activeTab, setActiveTab] = useState('1')
    const [modal, setModal] = useState(false)
    const [selectedPlan, setSelectedPlan] = useState(null)
    const stripe = useStripe()
    const elements = useElements()
    const navigate = useNavigate()
    const [s_loading, set_s_loading] = useState(false)

    const toggleModal = (plan = null) => {
        setSelectedPlan(plan)
        setModal(!modal)
    }

    const handleSubscribe = async () => {
        if (!stripe || !elements) {
            toast.error('Stripe not loaded')
            return
        }

        set_s_loading(true)
        console.log({ selectedPlan })
        try {
            // Step 1: Create subscription on backend
            const subRes = await createStripeSubscription({
                gymId,
                priceId: selectedPlan.id, // must exist in your plan object
            })

            if (!subRes?.data?.clientSecret) {
                toast.error('Failed to create subscription')
                set_s_loading(false)
                return
            }

            const clientSecret = subRes.data.clientSecret

            // Step 2: Confirm payment on frontend
            const cardElement = elements.getElement(CardElement)
            const { paymentIntent, error } = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: {
                        card: cardElement,
                    },
                },
            )

            if (error) {
                toast.error(error.message || 'Payment failed')
                set_s_loading(false)
                return
            }

            if (paymentIntent?.status === 'succeeded') {
                toast.success('Subscription created successfully!')
                navigate('/dashboard')
                setModal(false)
            } else {
                toast.warn('Subscription pending, please check later.')
            }
        } catch (err) {
            console.error(err)
            toast.error('Something went wrong')
        } finally {
            set_s_loading(false)
        }
    }

    return (
        <React.Fragment>
            <Row className='justify-content-center mt-4'>
                <Col lg={6} md={8} sm={10}>
                    <div className='text-center mb-4'>
                        <h4 className='fw-semibold fs-22'>Plans & Pricing</h4>
                        <p className='text-muted fs-15'>
                            Simple pricing. No hidden fees. Advanced features
                            for your business.
                        </p>
                        <Nav
                            pills
                            className='plan-nav arrow-navtabs d-inline-flex rounded p-1'
                        >
                            <NavItem>
                                <NavLink
                                    href='#'
                                    className={classnames(
                                        { active: activeTab === '1' },
                                        'fw-semibold',
                                    )}
                                    onClick={() => setActiveTab('1')}
                                >
                                    Monthly
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    href='#'
                                    className={classnames(
                                        { active: activeTab === '2' },
                                        'fw-semibold',
                                    )}
                                    onClick={() => setActiveTab('2')}
                                >
                                    Annually{' '}
                                    <span className='badge bg-success ms-1'>
                                        25% Off
                                    </span>
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </div>
                </Col>
            </Row>

            <Row className='justify-content-center'>
                {FITNEST_SUBSCIPTION_PRICING?.map(plan => (
                    <Col
                        key={plan?.id}
                        xl={4}
                        lg={5}
                        md={6}
                        sm={10}
                        className='mb-4'
                    >
                        <Card className='pricing-box ribbon-box h-100'>
                            {plan?.ribbon && (
                                <div className='ribbon-two ribbon-two-danger'>
                                    <span>Popular</span>
                                </div>
                            )}
                            <CardBody className='bg-light p-4 d-flex flex-column justify-content-between h-100'>
                                <div className='d-flex justify-content-between flex-wrap mb-3'>
                                    <h5 className='fw-semibold mb-2'>
                                        {plan?.type}
                                    </h5>
                                    <TabContent activeTab={activeTab}>
                                        <TabPane tabId='1'>
                                            <h4 className='mb-0 text-nowrap'>
                                                ₹{plan?.rate}
                                                <small className='fs-12 text-muted ms-1'>
                                                    /Month
                                                </small>
                                            </h4>
                                        </TabPane>
                                        <TabPane tabId='2'>
                                            <h4 className='mb-0 text-nowrap'>
                                                <small className='fs-12'>
                                                    <del>
                                                        ₹{plan?.delrateYear}
                                                    </del>
                                                </small>{' '}
                                                ₹{plan?.rateYear}
                                                <small className='fs-12 text-muted ms-1'>
                                                    /Year
                                                </small>
                                            </h4>
                                        </TabPane>
                                    </TabContent>
                                </div>

                                <p className='text-muted mb-3'>
                                    {plan?.description}
                                </p>

                                <ul className='list-unstyled vstack gap-3'>
                                    <li>
                                        <i className='ri-checkbox-circle-fill text-success me-2'></i>
                                        <b>{plan?.Customers}</b> Users
                                    </li>
                                    <li>
                                        <i className='ri-checkbox-circle-fill text-success me-2'></i>
                                        <b>Scalable</b> Bandwidth
                                    </li>
                                    <li>
                                        <i className='ri-checkbox-circle-fill text-success me-2'></i>
                                        <b>{plan?.FTP}</b> Login
                                    </li>
                                    <li>
                                        <i
                                            className={`ri-${plan?.supportClassSymbol}-circle-fill text-${plan?.supportClass} me-2`}
                                        ></i>
                                        Support
                                    </li>
                                    <li>
                                        <i
                                            className={`ri-${plan?.emailCampaignsSymbol}-circle-fill text-${plan?.emailCampaignsClass} me-2`}
                                        ></i>
                                        <b>{plan?.emailCampaigns}</b> Campaigns
                                    </li>
                                </ul>

                                <div className='mt-4'>
                                    <Button
                                        color={plan?.planButtonClassname}
                                        className='w-100'
                                        onClick={() => toggleModal(plan)}
                                    >
                                        {plan?.btntxt}
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Subscription Modal */}
            <Modal isOpen={modal} toggle={() => toggleModal(null)}>
                <ModalHeader toggle={() => toggleModal(null)}>
                    Subscribe to {selectedPlan?.type}
                </ModalHeader>
                <ModalBody>
                    <CardElement options={{ hidePostalCode: true }} />
                </ModalBody>
                <ModalFooter>
                    <Button
                        color='secondary'
                        onClick={() => toggleModal(null)}
                        disabled={s_loading}
                    >
                        Cancel
                    </Button>
                    <Button
                        color='primary'
                        onClick={handleSubscribe}
                        disabled={s_loading}
                    >
                        {s_loading ? <Spinner size='sm' /> : 'Subscribe'}
                    </Button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    )
}

export default Pricing

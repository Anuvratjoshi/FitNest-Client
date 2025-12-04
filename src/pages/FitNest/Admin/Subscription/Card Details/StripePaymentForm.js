import React, { useState } from 'react'
import {
    Card,
    CardBody,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Spinner,
    Row,
    Col,
    FormFeedback,
    CardHeader,
} from 'reactstrap'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import {
    attachPaymentMethod,
    createStripeCustomer,
    createSetupIntent,
} from '../../../../../helpers/apiservice_helper'

const StripePaymentForm = ({ gymId, fetchCustomerCards, totalCardAdded }) => {
    const stripe = useStripe()
    const elements = useElements()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)
    const [cardError, setCardError] = useState(true)

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: '',
            name: '',
            gymId,
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Please Enter Your Full Name'),
            email: Yup.string().email().required('Please Enter a Valid Email'),
        }),
        onSubmit: async values => {
            if (!stripe || !elements) return
            if (totalCardAdded === 3)
                return setMessage({
                    type: 'danger',
                    text: 'You can only add upto 3 cards',
                })
            setLoading(true)
            setMessage(null)

            try {
                if (!gymId) {
                    return toast.error('No gym ID provided', {
                        autoClose: 1500,
                    })
                }

                // #### Create Stripe Customer ####
                const response = await createStripeCustomer({
                    name: values.name,
                    email: values.email,
                    gymId,
                })

                const customerId = response?.data?.customerId
                if (!customerId) {
                    return toast.error('No customer ID returned', {
                        autoClose: 1500,
                    })
                }

                // #### Create SetupIntent (no customer) ####
                const setupIntentRes = await createSetupIntent({ gymId })
                const clientSecret = setupIntentRes?.data?.clientSecret
                if (!clientSecret) {
                    return toast.error('Failed to generate setup intent', {
                        autoClose: 1500,
                    })
                }

                // #### Confirm Card Setup — creates payment method but does NOT attach it ####
                const result = await stripe.confirmCardSetup(clientSecret, {
                    payment_method: {
                        card: elements.getElement(CardElement),
                        billing_details: {
                            name: values.name,
                            email: values.email,
                        },
                    },
                })

                if (result.error || !result?.setupIntent?.payment_method) {
                    return toast.error(
                        result.error?.message || 'Failed to confirm card setup',
                    )
                }

                // #### Attach payment method manually (deduplication happens here) ####
                const attach = await attachPaymentMethod({
                    customerId,
                    paymentMethodId: result.setupIntent.payment_method,
                })
                setMessage({
                    type: 'success',
                    text:
                        attach?.message ||
                        `Customer created and card added successfully.`,
                })
                setTimeout(() => {
                    fetchCustomerCards()
                    validation.resetForm()
                    // Clear the CardElement input field
                    const cardElement = elements.getElement(CardElement)
                    if (cardElement) cardElement.clear()
                }, 4000)
            } catch (err) {
                console.log('!!! Error While Attaching Payment Method !!!', err)
                setMessage({
                    type: 'danger',
                    text: err || 'Something went wrong.',
                })
            } finally {
                setLoading(false)
            }
        },
    })

    const handleCardChange = e => {
        try {
            if (e?.error) {
                setCardError(true)
                return toast.error(e.error.message || 'Invalid card details', {
                    autoClose: 1500,
                })
            }
            if (e?.complete) {
                return setCardError(false)
            }
        } catch (error) {
            console.log('!!! Error While Handling The Card Change !!!', error)
            toast.error(error, { autoClose: 1500 })
        }
    }

    const resetForm = () => {
        try {
            validation.resetForm()
            const cardElement = elements.getElement(CardElement)
            if (cardElement) cardElement.clear()
        } catch (error) {
            console.log(
                '!!! Error While Resetting The Stripe Payment Form !!!',
                error,
            )
            toast.error(error, { autoClose: 1500 })
        }
    }

    if (message) {
        setTimeout(() => setMessage(null), 3000)
    }
    return (
        <Card className='shadow-sm'>
            <CardBody className='mb-2'>
                <CardHeader className='text-center mt-2 mb-3'>
                    <h5 className='text-primary text-uppercase fs-4'>
                        Add Card Details to Make Payments Seamlessly
                    </h5>
                    <p className='text-muted'>Fill out the details below</p>
                </CardHeader>

                {message && (
                    <div
                        className={`alert alert-${message.type} mt-3 d-flex align-items-center`}
                        role='alert'
                    >
                        {message.text}
                    </div>
                )}

                <Form
                    onSubmit={e => {
                        e.preventDefault()
                        validation.handleSubmit()
                        return false
                    }}
                >
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for='name' className='fw-semibold'>
                                    Full Name{' '}
                                    <span className='text-danger'>*</span>
                                </Label>
                                <Input
                                    id='name'
                                    name='name'
                                    placeholder='Ex: John Doe'
                                    type='text'
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.name}
                                    invalid={
                                        validation.touched.name &&
                                        !!validation.errors.name
                                    }
                                />
                                <FormFeedback>
                                    {validation.errors.name}
                                </FormFeedback>
                            </FormGroup>
                        </Col>

                        <Col md={6}>
                            <FormGroup>
                                <Label for='email' className='fw-semibold'>
                                    Gym Email{' '}
                                    <span className='text-danger'>*</span>
                                </Label>
                                <Input
                                    id='email'
                                    name='email'
                                    type='email'
                                    placeholder='gym@example.com'
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.email}
                                    invalid={
                                        validation.touched.email &&
                                        !!validation.errors.email
                                    }
                                />
                                <FormFeedback>
                                    {validation.errors.email}
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>

                    <FormGroup className='mt-3'>
                        <Label className='fw-semibold'>
                            Card Details <span className='text-danger'>*</span>
                        </Label>
                        <div className='p-3 border rounded bg-dark'>
                            <CardElement
                                options={{
                                    hidePostalCode: true,
                                    style: {
                                        base: {
                                            color: '#fff',
                                            fontSize: '16px',
                                            '::placeholder': { color: '#aaa' },
                                        },
                                        invalid: {
                                            color: '#ff4d4f',
                                        },
                                    },
                                }}
                                onChange={handleCardChange}
                            />
                        </div>
                    </FormGroup>

                    <div className='d-flex justify-content-center align-items-center flex-wrap gap-2'>
                        <Button
                            type='button'
                            disabled={
                                !stripe ||
                                loading ||
                                !validation.dirty ||
                                cardError
                            }
                            className='mt-4 fw-semibold'
                            color='danger'
                            style={{ width: '180px' }}
                            onClick={() => resetForm()}
                        >
                            Reset Form
                        </Button>
                        <Button
                            color='primary'
                            type='submit'
                            disabled={
                                !stripe ||
                                loading ||
                                !validation.dirty ||
                                cardError
                            }
                            className='mt-4 fw-semibold'
                            style={{ width: '180px' }}
                        >
                            {loading ? (
                                <>
                                    <Spinner size='sm' className='me-2' />
                                    Processing...
                                </>
                            ) : (
                                'Create Stripe Customer'
                            )}
                        </Button>
                    </div>
                </Form>
            </CardBody>
        </Card>
    )
}

export default StripePaymentForm

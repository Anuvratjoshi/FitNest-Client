import React, { useEffect } from 'react'
import {
    Row,
    Col,
    CardBody,
    Card,
    Alert,
    Container,
    Input,
    Label,
    Form,
    FormFeedback,
} from 'reactstrap'

// Formik Validation
import * as Yup from 'yup'
import { useFormik } from 'formik'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// action
import { registerUser, apiError, resetRegisterFlag } from '../../slices/thunks'

//redux
import { useSelector, useDispatch } from 'react-redux'

import { Link, useNavigate } from 'react-router-dom'

//import images
import mainLogo from '../../assets/images/main-logo.png'
import ParticlesAuth from '../AuthenticationInner/ParticlesAuth'
import { createSelector } from 'reselect'

const Register = () => {
    const history = useNavigate()
    const dispatch = useDispatch()

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            ownersEmail: '',
            ownersFirstName: '',
            ownersLastName: '',
            ownersNationality: '',
            ownersNumber: '',
            ownersState: '',
            gymLocation: '',
            gymName: '',
            password: '',
            confirm_password: '',
            role: 'admin',
        },
        validationSchema: Yup.object({
            ownersEmail: Yup.string().required('Please Enter Your Email'),
            ownersFirstName: Yup.string().required(
                'Please Enter Your First Name',
            ),
            ownersLastName: Yup.string().required(
                'Please Enter Your Last Name',
            ),
            ownersNationality: Yup.string().required(
                'Please Enter Your Nationality',
            ),
            ownersNumber: Yup.string().required(
                'Please Enter Your Phone number',
            ),
            ownersState: Yup.string().required('Please Enter Your State'),
            gymLocation: Yup.string().required('Please Enter Your Location'),
            gymName: Yup.string().required('Please Enter Your Gym Name'),
            password: Yup.string().required('Please Enter Your Password'),
            confirm_password: Yup.string().when('password', {
                is: val => val && val.length > 0,
                then: schema =>
                    schema
                        .oneOf(
                            [Yup.ref('password')],
                            "Confirm Password Isn't Match",
                        )
                        .required('Please Confirm Your Password'),
                otherwise: schema =>
                    schema.required('Please Confirm Your Password'),
            }),
        }),
        onSubmit: values => {
            dispatch(registerUser(values))
        },
    })

    const selectLayoutState = state => state.Account
    const registerdatatype = createSelector(selectLayoutState, account => ({
        success: account.success,
        error: account.error,
        message: account.message,
    }))
    // Inside your component
    const { error, success, message } = useSelector(registerdatatype)

    useEffect(() => {
        dispatch(apiError(''))
    }, [dispatch])

    useEffect(() => {
        if (success) {
            setTimeout(() => history('/login'), 3000)
        }

        setTimeout(() => {
            dispatch(resetRegisterFlag())
        }, 3000)
    }, [dispatch, success, error, history])

    document.title = 'Basic SignUp | Velzon - React Admin & Dashboard Template'

    return (
        <React.Fragment>
            <ParticlesAuth>
                <div className='auth-page-content'>
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className='d-flex align-items-center justify-content-center text-white-50'>
                                    <Link
                                        to='/'
                                        className='d-inline-block auth-logo'
                                    >
                                        <img
                                            src={mainLogo}
                                            alt=''
                                            height='200'
                                            width='340'
                                        />
                                    </Link>
                                </div>
                            </Col>
                        </Row>

                        <Row className='justify-content-center'>
                            <Col md={8}>
                                <Card className='mt-1 card-bg-fill'>
                                    <CardBody className='p-4'>
                                        <div className='text-center mt-2'>
                                            <h5 className='text-primary'>
                                                Create New Account
                                            </h5>
                                            <p className='text-muted'>
                                                Get your free FitNest account
                                                now
                                            </p>
                                        </div>
                                        <div className='p-2 mt-4'>
                                            <Form
                                                onSubmit={e => {
                                                    e.preventDefault()
                                                    validation.handleSubmit()
                                                    return false
                                                }}
                                                className='needs-validation'
                                                action='#'
                                            >
                                                {/* Success message */}
                                                {success && (
                                                    <>
                                                        {toast(
                                                            'Your Redirect To Login Page...',
                                                            {
                                                                position:
                                                                    'top-right',
                                                                hideProgressBar: false,
                                                                className:
                                                                    'bg-success text-white',
                                                                progress:
                                                                    undefined,
                                                                toastId: '',
                                                            },
                                                        )}
                                                        <ToastContainer
                                                            autoClose={2000}
                                                            limit={1}
                                                        />
                                                        <Alert
                                                            color='success'
                                                            fade={false}
                                                        >
                                                            Register User
                                                            Successfully and
                                                            Your Redirect To
                                                            Login Page...
                                                        </Alert>
                                                    </>
                                                )}

                                                {/* Error message */}
                                                {error && (
                                                    <Alert
                                                        color='danger'
                                                        fade={false}
                                                    >
                                                        <div>{message}</div>
                                                    </Alert>
                                                )}
                                                <Row>
                                                    {/* ownersEmail */}
                                                    <Col md={6}>
                                                        <div className='mb-3'>
                                                            <Label className='form-label'>
                                                                Email{' '}
                                                                <span className='text-danger'>
                                                                    *
                                                                </span>
                                                            </Label>
                                                            <Input
                                                                name='ownersEmail'
                                                                type='email'
                                                                placeholder='Enter email address'
                                                                onChange={
                                                                    validation.handleChange
                                                                }
                                                                onBlur={
                                                                    validation.handleBlur
                                                                }
                                                                value={
                                                                    validation
                                                                        .values
                                                                        .ownersEmail
                                                                }
                                                                invalid={
                                                                    validation
                                                                        .touched
                                                                        .ownersEmail &&
                                                                    !!validation
                                                                        .errors
                                                                        .ownersEmail
                                                                }
                                                            />
                                                            {validation.touched
                                                                .ownersEmail &&
                                                                validation
                                                                    .errors
                                                                    .ownersEmail && (
                                                                    <FormFeedback type='invalid'>
                                                                        {
                                                                            validation
                                                                                .errors
                                                                                .ownersEmail
                                                                        }
                                                                    </FormFeedback>
                                                                )}
                                                        </div>
                                                    </Col>

                                                    {/* ownersFirstName */}
                                                    <Col md={6}>
                                                        <div className='mb-3'>
                                                            <Label className='form-label'>
                                                                First Name{' '}
                                                                <span className='text-danger'>
                                                                    *
                                                                </span>
                                                            </Label>
                                                            <Input
                                                                name='ownersFirstName'
                                                                type='text'
                                                                placeholder='Enter first name'
                                                                onChange={
                                                                    validation.handleChange
                                                                }
                                                                onBlur={
                                                                    validation.handleBlur
                                                                }
                                                                value={
                                                                    validation
                                                                        .values
                                                                        .ownersFirstName
                                                                }
                                                                invalid={
                                                                    validation
                                                                        .touched
                                                                        .ownersFirstName &&
                                                                    !!validation
                                                                        .errors
                                                                        .ownersFirstName
                                                                }
                                                            />
                                                            {validation.touched
                                                                .ownersFirstName &&
                                                                validation
                                                                    .errors
                                                                    .ownersFirstName && (
                                                                    <FormFeedback type='invalid'>
                                                                        {
                                                                            validation
                                                                                .errors
                                                                                .ownersFirstName
                                                                        }
                                                                    </FormFeedback>
                                                                )}
                                                        </div>
                                                    </Col>

                                                    {/* ownersLastName */}
                                                    <Col md={6}>
                                                        <div className='mb-3'>
                                                            <Label className='form-label'>
                                                                Last Name{' '}
                                                                <span className='text-danger'>
                                                                    *
                                                                </span>
                                                            </Label>
                                                            <Input
                                                                name='ownersLastName'
                                                                type='text'
                                                                placeholder='Enter last name'
                                                                onChange={
                                                                    validation.handleChange
                                                                }
                                                                onBlur={
                                                                    validation.handleBlur
                                                                }
                                                                value={
                                                                    validation
                                                                        .values
                                                                        .ownersLastName
                                                                }
                                                                invalid={
                                                                    validation
                                                                        .touched
                                                                        .ownersLastName &&
                                                                    !!validation
                                                                        .errors
                                                                        .ownersLastName
                                                                }
                                                            />
                                                            {validation.touched
                                                                .ownersLastName &&
                                                                validation
                                                                    .errors
                                                                    .ownersLastName && (
                                                                    <FormFeedback type='invalid'>
                                                                        {
                                                                            validation
                                                                                .errors
                                                                                .ownersLastName
                                                                        }
                                                                    </FormFeedback>
                                                                )}
                                                        </div>
                                                    </Col>

                                                    {/* ownersNationality */}
                                                    <Col md={6}>
                                                        <div className='mb-3'>
                                                            <Label className='form-label'>
                                                                Nationality{' '}
                                                                <span className='text-danger'>
                                                                    *
                                                                </span>
                                                            </Label>
                                                            <Input
                                                                name='ownersNationality'
                                                                type='text'
                                                                placeholder='Enter nationality'
                                                                onChange={
                                                                    validation.handleChange
                                                                }
                                                                onBlur={
                                                                    validation.handleBlur
                                                                }
                                                                value={
                                                                    validation
                                                                        .values
                                                                        .ownersNationality
                                                                }
                                                                invalid={
                                                                    validation
                                                                        .touched
                                                                        .ownersNationality &&
                                                                    !!validation
                                                                        .errors
                                                                        .ownersNationality
                                                                }
                                                            />
                                                            {validation.touched
                                                                .ownersNationality &&
                                                                validation
                                                                    .errors
                                                                    .ownersNationality && (
                                                                    <FormFeedback type='invalid'>
                                                                        {
                                                                            validation
                                                                                .errors
                                                                                .ownersNationality
                                                                        }
                                                                    </FormFeedback>
                                                                )}
                                                        </div>
                                                    </Col>

                                                    {/* ownersNumber */}
                                                    <Col md={6}>
                                                        <div className='mb-3'>
                                                            <Label className='form-label'>
                                                                Phone Number{' '}
                                                                <span className='text-danger'>
                                                                    *
                                                                </span>
                                                            </Label>
                                                            <Input
                                                                name='ownersNumber'
                                                                type='text'
                                                                placeholder='Enter phone number'
                                                                onChange={
                                                                    validation.handleChange
                                                                }
                                                                onBlur={
                                                                    validation.handleBlur
                                                                }
                                                                value={
                                                                    validation
                                                                        .values
                                                                        .ownersNumber
                                                                }
                                                                invalid={
                                                                    validation
                                                                        .touched
                                                                        .ownersNumber &&
                                                                    !!validation
                                                                        .errors
                                                                        .ownersNumber
                                                                }
                                                            />
                                                            {validation.touched
                                                                .ownersNumber &&
                                                                validation
                                                                    .errors
                                                                    .ownersNumber && (
                                                                    <FormFeedback type='invalid'>
                                                                        {
                                                                            validation
                                                                                .errors
                                                                                .ownersNumber
                                                                        }
                                                                    </FormFeedback>
                                                                )}
                                                        </div>
                                                    </Col>

                                                    {/* ownersState */}
                                                    <Col md={6}>
                                                        <div className='mb-3'>
                                                            <Label className='form-label'>
                                                                State{' '}
                                                                <span className='text-danger'>
                                                                    *
                                                                </span>
                                                            </Label>
                                                            <Input
                                                                name='ownersState'
                                                                type='text'
                                                                placeholder='Enter state'
                                                                onChange={
                                                                    validation.handleChange
                                                                }
                                                                onBlur={
                                                                    validation.handleBlur
                                                                }
                                                                value={
                                                                    validation
                                                                        .values
                                                                        .ownersState
                                                                }
                                                                invalid={
                                                                    validation
                                                                        .touched
                                                                        .ownersState &&
                                                                    !!validation
                                                                        .errors
                                                                        .ownersState
                                                                }
                                                            />
                                                            {validation.touched
                                                                .ownersState &&
                                                                validation
                                                                    .errors
                                                                    .ownersState && (
                                                                    <FormFeedback type='invalid'>
                                                                        {
                                                                            validation
                                                                                .errors
                                                                                .ownersState
                                                                        }
                                                                    </FormFeedback>
                                                                )}
                                                        </div>
                                                    </Col>

                                                    {/* gymLocation */}
                                                    <Col md={6}>
                                                        <div className='mb-3'>
                                                            <Label className='form-label'>
                                                                Gym Location{' '}
                                                                <span className='text-danger'>
                                                                    *
                                                                </span>
                                                            </Label>
                                                            <Input
                                                                name='gymLocation'
                                                                type='text'
                                                                placeholder='Enter location'
                                                                onChange={
                                                                    validation.handleChange
                                                                }
                                                                onBlur={
                                                                    validation.handleBlur
                                                                }
                                                                value={
                                                                    validation
                                                                        .values
                                                                        .gymLocation
                                                                }
                                                                invalid={
                                                                    validation
                                                                        .touched
                                                                        .gymLocation &&
                                                                    !!validation
                                                                        .errors
                                                                        .gymLocation
                                                                }
                                                            />
                                                            {validation.touched
                                                                .gymLocation &&
                                                                validation
                                                                    .errors
                                                                    .gymLocation && (
                                                                    <FormFeedback type='invalid'>
                                                                        {
                                                                            validation
                                                                                .errors
                                                                                .gymLocation
                                                                        }
                                                                    </FormFeedback>
                                                                )}
                                                        </div>
                                                    </Col>

                                                    {/* gymName */}
                                                    <Col md={6}>
                                                        <div className='mb-3'>
                                                            <Label className='form-label'>
                                                                Gym Name{' '}
                                                                <span className='text-danger'>
                                                                    *
                                                                </span>
                                                            </Label>
                                                            <Input
                                                                name='gymName'
                                                                type='text'
                                                                placeholder='Enter gym name'
                                                                onChange={
                                                                    validation.handleChange
                                                                }
                                                                onBlur={
                                                                    validation.handleBlur
                                                                }
                                                                value={
                                                                    validation
                                                                        .values
                                                                        .gymName
                                                                }
                                                                invalid={
                                                                    validation
                                                                        .touched
                                                                        .gymName &&
                                                                    !!validation
                                                                        .errors
                                                                        .gymName
                                                                }
                                                            />
                                                            {validation.touched
                                                                .gymName &&
                                                                validation
                                                                    .errors
                                                                    .gymName && (
                                                                    <FormFeedback type='invalid'>
                                                                        {
                                                                            validation
                                                                                .errors
                                                                                .gymName
                                                                        }
                                                                    </FormFeedback>
                                                                )}
                                                        </div>
                                                    </Col>

                                                    {/* password */}
                                                    <Col md={6}>
                                                        <div className='mb-3'>
                                                            <Label className='form-label'>
                                                                Password{' '}
                                                                <span className='text-danger'>
                                                                    *
                                                                </span>
                                                            </Label>
                                                            <Input
                                                                name='password'
                                                                type='password'
                                                                placeholder='Enter Password'
                                                                onChange={
                                                                    validation.handleChange
                                                                }
                                                                onBlur={
                                                                    validation.handleBlur
                                                                }
                                                                value={
                                                                    validation
                                                                        .values
                                                                        .password
                                                                }
                                                                invalid={
                                                                    validation
                                                                        .touched
                                                                        .password &&
                                                                    !!validation
                                                                        .errors
                                                                        .password
                                                                }
                                                            />
                                                            {validation.touched
                                                                .password &&
                                                                validation
                                                                    .errors
                                                                    .password && (
                                                                    <FormFeedback type='invalid'>
                                                                        {
                                                                            validation
                                                                                .errors
                                                                                .password
                                                                        }
                                                                    </FormFeedback>
                                                                )}
                                                        </div>
                                                    </Col>

                                                    {/* confirm_password */}
                                                    <Col md={6}>
                                                        <div className='mb-3'>
                                                            <Label className='form-label'>
                                                                Confirm Password{' '}
                                                                <span className='text-danger'>
                                                                    *
                                                                </span>
                                                            </Label>
                                                            <Input
                                                                name='confirm_password'
                                                                type='password'
                                                                placeholder='Confirm Password'
                                                                onChange={
                                                                    validation.handleChange
                                                                }
                                                                onBlur={
                                                                    validation.handleBlur
                                                                }
                                                                value={
                                                                    validation
                                                                        .values
                                                                        .confirm_password
                                                                }
                                                                invalid={
                                                                    validation
                                                                        .touched
                                                                        .confirm_password &&
                                                                    !!validation
                                                                        .errors
                                                                        .confirm_password
                                                                }
                                                            />
                                                            {validation.touched
                                                                .confirm_password &&
                                                                validation
                                                                    .errors
                                                                    .confirm_password && (
                                                                    <FormFeedback type='invalid'>
                                                                        {
                                                                            validation
                                                                                .errors
                                                                                .confirm_password
                                                                        }
                                                                    </FormFeedback>
                                                                )}
                                                        </div>
                                                    </Col>
                                                </Row>

                                                {/* Submit Button */}
                                                <div className='mt-4'>
                                                    <button
                                                        className='btn btn-success w-100'
                                                        type='submit'
                                                    >
                                                        Sign Up
                                                    </button>
                                                </div>
                                            </Form>
                                        </div>
                                    </CardBody>
                                </Card>
                                <div className='mt-4 text-center'>
                                    <p className='mb-0'>
                                        Already have an account ?
                                        <Link
                                            to='/login'
                                            className='fw-semibold text-primary text-decoration-underline mx-1'
                                        >
                                            Signin
                                        </Link>
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </ParticlesAuth>
        </React.Fragment>
    )
}

export default Register

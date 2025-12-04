import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
    Modal,
    ModalHeader,
    ModalBody,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormFeedback,
    Row,
    Col,
    ModalFooter,
} from 'reactstrap'
import FeatherIcon from 'feather-icons-react'

const QuotationModal = ({ isOpen, toggle, selectedPlan }) => {
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            fullName: '',
            email: '',
            phone: '',
            selectedPlan: selectedPlan?.type || 'Basic',
            duration: 'monthly',
            companyName: '',
            additionalRequirements: '',
        },
        validationSchema: Yup.object({
            fullName: Yup.string().required('Please enter your full name'),
            email: Yup.string()
                .email('Invalid email format')
                .required('Please enter your email'),
            phone: Yup.string()
                .matches(
                    /^[6-9]\d{9}$/,
                    'Please enter a valid 10-digit Indian phone number',
                )
                .required('Please enter your phone number'),
            selectedPlan: Yup.string().required('Please select a plan'),
            duration: Yup.string().required('Please select duration'),
            additionalRequirements: Yup.string().max(
                1000,
                'Message must be less than 1000 characters',
            ),
        }),

        onSubmit: values => {
            console.log({ 'Form Data': values })
            validation.resetForm()
            toggle()
        },
    })

    const closeModal = () => {
        validation.resetForm()
        toggle()
    }
    return (
        <Modal isOpen={isOpen} toggle={closeModal} centered size='lg'>
            <ModalHeader
                tag='h5'
                className='p-3 bg-primary modal-title'
                toggle={closeModal}
            >
                <div className='d-flex align-items-center'>
                    <FeatherIcon icon='file-text' className='icon-sm me-2' />
                    <span>Request Quotation</span>
                </div>
            </ModalHeader>

            <ModalBody className='p-4'>
                <Form
                    className='needs-validation'
                    onSubmit={e => {
                        e.preventDefault()
                        validation.handleSubmit()
                    }}
                >
                    <Row>
                        <Col md={6}>
                            <FormGroup className='mb-3'>
                                <Label htmlFor='fullName'>
                                    Full Name
                                    <sup className='text-danger'>*</sup>
                                </Label>
                                <Input
                                    type='text'
                                    name='fullName'
                                    id='fullName'
                                    placeholder='Enter your full name'
                                    value={validation.values.fullName}
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    invalid={
                                        validation.touched.fullName &&
                                        !!validation.errors.fullName
                                    }
                                />
                                <FormFeedback>
                                    {validation.errors.fullName}
                                </FormFeedback>
                            </FormGroup>
                        </Col>

                        <Col md={6}>
                            <FormGroup className='mb-3'>
                                <Label htmlFor='email'>
                                    Email <sup className='text-danger'>*</sup>
                                </Label>
                                <Input
                                    type='email'
                                    name='email'
                                    id='email'
                                    placeholder='Enter your email'
                                    value={validation.values.email}
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
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

                    <Row>
                        <Col md={6}>
                            <FormGroup className='mb-3'>
                                <Label htmlFor='phone'>
                                    Phone Number{' '}
                                    <sup className='text-danger'>*</sup>
                                </Label>
                                <Input
                                    type='tel'
                                    name='phone'
                                    id='phone'
                                    placeholder='Enter your phone number'
                                    value={validation.values.phone}
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    invalid={
                                        validation.touched.phone &&
                                        !!validation.errors.phone
                                    }
                                />
                                <FormFeedback>
                                    {validation.errors.phone}
                                </FormFeedback>
                            </FormGroup>
                        </Col>

                        <Col md={6}>
                            <FormGroup className='mb-3'>
                                <Label htmlFor='selectedPlan'>
                                    Selected Plan{' '}
                                    <sup className='text-danger'>*</sup>
                                </Label>
                                <Input
                                    type='select'
                                    name='selectedPlan'
                                    id='selectedPlan'
                                    value={validation.values.selectedPlan}
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    invalid={
                                        validation.touched.selectedPlan &&
                                        !!validation.errors.selectedPlan
                                    }
                                >
                                    <option value=''>
                                        --- Select Plan ---
                                    </option>
                                    <option value='Basic'>Basic</option>
                                    <option value='Professional'>
                                        Professional
                                    </option>
                                </Input>
                                <FormFeedback>
                                    {validation.errors.selectedPlan}
                                </FormFeedback>
                            </FormGroup>
                        </Col>

                        <Col md={6}>
                            <FormGroup className='mb-3'>
                                <Label htmlFor='duration'>
                                    Selected Plan{' '}
                                    <sup className='text-danger'>*</sup>
                                </Label>
                                <Input
                                    type='select'
                                    name='duration'
                                    id='duration'
                                    value={validation.values.duration}
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    invalid={
                                        validation.touched.duration &&
                                        !!validation.errors.duration
                                    }
                                >
                                    <option value=''>
                                        --- Select Duration ---
                                    </option>
                                    <option value='monthly'>Monthly</option>
                                    <option value='annualy'>Annualy</option>
                                </Input>
                                <FormFeedback>
                                    {validation.errors.duration}
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup className='mb-3'>
                                <Label htmlFor='companyName'>
                                    Company Name
                                </Label>
                                <Input
                                    type='text'
                                    name='companyName'
                                    id='companyName'
                                    placeholder='Enter your company name (optional)'
                                    value={validation.values.companyName}
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                />
                            </FormGroup>
                        </Col>

                        <Col sm={12}>
                            <FormGroup className='mb-3'>
                                <Label htmlFor='additionalRequirements'>
                                    Additional Requirements
                                </Label>
                                <Input
                                    type='textarea'
                                    name='additionalRequirements'
                                    id='additionalRequirements'
                                    placeholder='Enter any additional requirements or notes (optional)'
                                    rows={3}
                                    value={
                                        validation.values.additionalRequirements
                                    }
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    invalid={
                                        validation.touched
                                            .additionalRequirements &&
                                        !!validation.errors
                                            .additionalRequirements
                                    }
                                />
                                <FormFeedback>
                                    {validation.errors.additionalRequirements}
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </ModalBody>

            <ModalFooter className='p-3 border-top'>
                <Button
                    color='primary'
                    type='button'
                    onClick={() => validation.handleSubmit()}
                    disabled={!validation.dirty || !validation.isValid}
                >
                    Submit Request
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default QuotationModal

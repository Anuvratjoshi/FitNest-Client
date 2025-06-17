import { useFormik } from 'formik'
import React, { useState } from 'react'
import {
    Button,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalHeader,
    Row,
    Col,
    Spinner,
} from 'reactstrap'
import * as Yup from 'yup'
import { adminUpdateUser } from '../../../../../../helpers/apiservice_helper'
import { toast } from 'react-toastify'

const AdminEditUser = ({
    userData,
    editModalFlag,
    setEditModalFlag,
    fetchData,
}) => {
    const [u_u_flag, set_u_u_flag] = useState(false)
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            userId: userData?.userId || '',
            email: userData?.email || '',
            firstName: userData?.firstName || '',
            lastName: userData?.lastName || '',
            gender: userData?.gender || '',
            isActive: userData?.membership?.isActive ? 'true' : 'false',
            autoRenew: userData?.membership?.autoRenew ? 'true' : 'false',
            phone: userData?.phone || '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email format')
                .required("Please enter user's email"),
            firstName: Yup.string().required("Please enter user's first name"),
            lastName: Yup.string().required("Please enter user's last name"),
            gender: Yup.string().required('Please select gender'),
            isActive: Yup.string().required(
                'Please select membership active status',
            ),
            autoRenew: Yup.string().required('Please select auto-renew status'),
        }),
        onSubmit: async values => {
            const payload = {
                ...values,
                membership: {
                    isActive: values.isActive === 'true',
                    autoRenew: values.autoRenew === 'true',
                },
            }
            delete payload.isActive
            delete payload.autoRenew
            try {
                set_u_u_flag(true)

                // #### updating the user ####
                const res = await adminUpdateUser(payload)

                toast.success(res?.message, { autoClose: 1500 })

                // #### refreshing the user table ####
                fetchData()

                // #### closing the modal ####
                setEditModalFlag({ isOpen: false, type: '' })
            } catch (error) {
                console.log('!!! User Updating Error !!!', error)
                toast.error(error, { autoClose: 1500 })
            } finally {
                set_u_u_flag(false)
            }
        },
    })

    const toggle = () => {
        if (u_u_flag)
            toast.warn('User update is in progress', { autoClose: 1500 })
        else setEditModalFlag({ isOpen: false, type: '' })
    }
    return (
        <Modal isOpen={editModalFlag?.isOpen} centered>
            <ModalHeader
                tag='h5'
                className='p-3 bg-soft-info modal-title'
                toggle={toggle}
            >
                {editModalFlag?.type === 'view'
                    ? 'View User Details'
                    : 'Edit User'}
            </ModalHeader>
            <ModalBody>
                <Form
                    className='needs-validation'
                    onSubmit={e => {
                        e.preventDefault()
                        validation.handleSubmit()
                    }}
                >
                    {/* Email */}
                    <FormGroup className='mb-3'>
                        <Label htmlFor='email'>
                            Email <sup className='text-danger'>*</sup>
                        </Label>
                        <Input
                            type='email'
                            name='email'
                            id='email'
                            placeholder='Enter user email'
                            className={`${
                                editModalFlag?.type === 'view' &&
                                'bg-dark-subtle'
                            }`}
                            value={validation.values.email}
                            disabled={editModalFlag?.type === 'view'}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            invalid={
                                validation.touched.email &&
                                !!validation.errors.email
                            }
                        />
                        <FormFeedback>{validation.errors.email}</FormFeedback>
                    </FormGroup>

                    {/* First and Last Name */}
                    <Row>
                        <Col md={6}>
                            <FormGroup className='mb-3'>
                                <Label htmlFor='firstName'>
                                    First Name
                                    <sup className='text-danger'>*</sup>
                                </Label>
                                <Input
                                    type='text'
                                    name='firstName'
                                    id='firstName'
                                    placeholder='Enter first name'
                                    className={`${
                                        editModalFlag?.type === 'view' &&
                                        'bg-dark-subtle'
                                    }`}
                                    value={validation.values.firstName}
                                    disabled={editModalFlag?.type === 'view'}
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    invalid={
                                        validation.touched.firstName &&
                                        !!validation.errors.firstName
                                    }
                                />
                                <FormFeedback>
                                    {validation.errors.firstName}
                                </FormFeedback>
                            </FormGroup>
                        </Col>

                        <Col md={6}>
                            <FormGroup className='mb-3'>
                                <Label htmlFor='lastName'>
                                    Last Name
                                    <sup className='text-danger'>*</sup>
                                </Label>
                                <Input
                                    type='text'
                                    name='lastName'
                                    id='lastName'
                                    placeholder='Enter last name'
                                    className={`${
                                        editModalFlag?.type === 'view' &&
                                        'bg-dark-subtle'
                                    }`}
                                    value={validation.values.lastName}
                                    disabled={editModalFlag?.type === 'view'}
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    invalid={
                                        validation.touched.lastName &&
                                        !!validation.errors.lastName
                                    }
                                />
                                <FormFeedback>
                                    {validation.errors.lastName}
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>

                    {/* Phone */}
                    <FormGroup className='mb-3'>
                        <Label htmlFor='phone'>
                            Phone <sup className='text-danger'>*</sup>
                        </Label>
                        <Input
                            type='text'
                            name='phone'
                            id='phone'
                            className='bg-dark-subtle'
                            placeholder='Enter phone number'
                            defaultValue={validation.values.phone}
                            disabled={true}
                            style={{ cursor: 'not-allowed' }}
                            onBlur={validation.handleBlur}
                            invalid={
                                validation.touched.phone &&
                                !!validation.errors.phone
                            }
                        />
                        <FormFeedback>{validation.errors.phone}</FormFeedback>
                    </FormGroup>

                    {/* Gender */}
                    <FormGroup className='mb-3'>
                        <Label htmlFor='gender'>
                            Gender <sup className='text-danger'>*</sup>
                        </Label>
                        <Input
                            type='select'
                            name='gender'
                            id='gender'
                            className={`${
                                editModalFlag?.type === 'view' &&
                                'bg-dark-subtle'
                            }`}
                            value={validation.values.gender}
                            disabled={editModalFlag?.type === 'view'}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            invalid={
                                validation.touched.gender &&
                                !!validation.errors.gender
                            }
                        >
                            <option value=''>Select</option>
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                            <option value='other'>Other</option>
                        </Input>
                        <FormFeedback>{validation.errors.gender}</FormFeedback>
                    </FormGroup>

                    {/* Membership Active */}
                    <FormGroup className='mb-3'>
                        <Label htmlFor='isActive'>
                            Membership Active
                            <sup className='text-danger'>*</sup>
                        </Label>
                        <Input
                            type='select'
                            name='isActive'
                            id='isActive'
                            className={`${
                                editModalFlag?.type === 'view' &&
                                'bg-dark-subtle'
                            }`}
                            value={validation.values.isActive}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            invalid={
                                validation.touched.isActive &&
                                !!validation.errors.isActive
                            }
                            disabled={editModalFlag?.type === 'view'}
                        >
                            <option value=''>Select</option>
                            <option value='true'>Yes</option>
                            <option value='false'>No</option>
                        </Input>
                        <FormFeedback>
                            {validation.errors.isActive}
                        </FormFeedback>
                    </FormGroup>

                    {/* Auto Renew */}
                    <FormGroup className='mb-3'>
                        <Label htmlFor='autoRenew'>
                            Auto Renew <sup className='text-danger'>*</sup>
                        </Label>
                        <Input
                            type='autoRenew'
                            name='autoRenew'
                            id='autoRenew'
                            className='bg-dark-subtle'
                            style={{ cursor: 'not-allowed' }}
                            disabled
                            defaultValue={validation.values.autoRenew}
                            onBlur={validation.handleBlur}
                            invalid={
                                validation.touched.autoRenew &&
                                !!validation.errors.autoRenew
                            }
                        />
                        <FormFeedback>
                            {validation.errors.autoRenew}
                        </FormFeedback>
                    </FormGroup>

                    {/* Submit Button */}
                    {editModalFlag?.type === 'edit' && (
                        <div className='text-end'>
                            {!u_u_flag ? (
                                <Button
                                    color='primary'
                                    type='submit'
                                    disabled={!validation.dirty || u_u_flag}
                                >
                                    Save Changes
                                </Button>
                            ) : (
                                <Button color='primary' type='submit' disabled>
                                    Updating{' '}
                                    <Spinner className='mx-1' size='sm' />
                                </Button>
                            )}
                        </div>
                    )}
                </Form>
            </ModalBody>
        </Modal>
    )
}

export default AdminEditUser

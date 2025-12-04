import React, { useState } from 'react'
import {
    Button,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalHeader,
    Row,
    Spinner,
} from 'reactstrap'
import DeleteModal from '../../../../../Components/Common/DeleteModal'

import { toast } from 'react-toastify'
import {
    detachCard,
    makeDefaultCard,
} from '../../../../../helpers/apiservice_helper'

const CardInfo = ({
    details,
    isOpen,
    setIsOpen,
    fetchCustomerCards,
    totalCardAdded,
}) => {
    // #### Delete Modal ####
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const onCloseClick = () => {
        setShowDeleteModal(false)
    }

    // #### Detaching/Deleting A Card ####
    const [loading, setLoading] = useState(false)
    const onDeleteClick = async () => {
        if (totalCardAdded === 1)
            return toast.error('Oops! You need to keep at least one card.', {
                autoClose: 3000,
            })

        setLoading(true)
        try {
            const response = await detachCard(details)
            toast.success(response?.message, { autoClose: 1500 })
            setShowDeleteModal(false)
            setIsOpen(false)
            // #### Fetching fresh cards ####
            fetchCustomerCards()
        } catch (error) {
            console.log('!!! Error While Detaching A Card !!!', error)
            toast.error(error, { autoClose: 1500 })
        } finally {
            setLoading(false)
        }
    }

    // #### Making A Card Default ####
    const [cardDefaultLoading, setCardDefaultLoading] = useState(false)
    const onDefaultClick = async () => {
        setCardDefaultLoading(true)
        try {
            const response = await makeDefaultCard(details)
            toast.success(response?.message, { autoClose: 1500 })
            setIsOpen(false)
            // #### Fetching fresh cards ####
            fetchCustomerCards()
        } catch (error) {
            console.log('!!! Error While Making A Card Default !!!', error)
            toast.error(error, { autoClose: 1500 })
        } finally {
            setCardDefaultLoading(false)
        }
    }
    return (
        <React.Fragment>
            <Modal isOpen={isOpen} centered>
                <ModalHeader
                    tag='h5'
                    className='p-3 bg-soft-info modal-title border border-top-0'
                    toggle={() => setIsOpen(false)}
                >
                    Card Info
                </ModalHeader>
                <ModalBody>
                    <Form className='needs-validation'>
                        <Row>
                            <Col xs='12'>
                                <FormGroup className='mb-3'>
                                    <Label htmlFor='cardNumber'>
                                        Card Number
                                        <sup className='text-danger'>*</sup>
                                    </Label>
                                    <Input
                                        type='text'
                                        name='cardNumber'
                                        id='cardNumber'
                                        className={
                                            'bg-dark-subtle text-uppercase text-warning fw-semibold'
                                        }
                                        defaultValue={`**** **** **** ${details?.last4}`}
                                        disabled={true}
                                        style={{ cursor: 'not-allowed' }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col xs='12'>
                                <FormGroup className='mb-3'>
                                    <Label htmlFor='cardType'>
                                        Card Type
                                        <sup className='text-danger'>*</sup>
                                    </Label>
                                    <Input
                                        type='text'
                                        name='cardType'
                                        id='cardType'
                                        className={
                                            'bg-dark-subtle text-uppercase'
                                        }
                                        defaultValue={details?.brand}
                                        disabled={true}
                                        style={{ cursor: 'not-allowed' }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col xs='12' md='6'>
                                <FormGroup className='mb-3'>
                                    <Label htmlFor='expiryMonth'>
                                        Expiry Month
                                        <sup className='text-danger'>*</sup>
                                    </Label>
                                    <Input
                                        type='text'
                                        name='expiryMonth'
                                        id='expiryMonth'
                                        className={
                                            'bg-dark-subtle text-uppercase'
                                        }
                                        defaultValue={`${
                                            details?.exp_month < 10
                                                ? '0' + details?.exp_month
                                                : details?.exp_month
                                        }`}
                                        disabled={true}
                                        style={{ cursor: 'not-allowed' }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col xs='12' md='6'>
                                <FormGroup className='mb-3'>
                                    <Label htmlFor='expiryYear'>
                                        Expiry Year
                                        <sup className='text-danger'>*</sup>
                                    </Label>
                                    <Input
                                        type='text'
                                        name='expiryYear'
                                        id='expiryYear'
                                        className={
                                            'bg-dark-subtle text-uppercase'
                                        }
                                        defaultValue={details?.exp_year}
                                        disabled={true}
                                        style={{ cursor: 'not-allowed' }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col xs='12'>
                                <FormGroup className='mb-3'>
                                    <Label htmlFor='defaultCard'>
                                        Default Card
                                        <sup className='text-danger'>*</sup>
                                    </Label>
                                    <Input
                                        type='text'
                                        name='defaultCard'
                                        id='defaultCard'
                                        className={
                                            'bg-dark-subtle text-uppercase text-warning fw-semibold'
                                        }
                                        defaultValue={details?.defaultCard}
                                        disabled={true}
                                        style={{ cursor: 'not-allowed' }}
                                    />
                                </FormGroup>
                            </Col>
                            <div className='d-flex justify-content-md-end justify-content-center gap-2'>
                                <Button
                                    type='button'
                                    color='success'
                                    style={{
                                        width: '133.9px',
                                        height: '38.42px',
                                    }}
                                    disabled={
                                        details?.defaultCard ||
                                        cardDefaultLoading ||
                                        loading
                                    }
                                    onClick={() => onDefaultClick()}
                                >
                                    {cardDefaultLoading ? (
                                        <Spinner size='sm' />
                                    ) : (
                                        'Make As Default'
                                    )}
                                </Button>
                                <Button
                                    type='button'
                                    color='danger'
                                    onClick={() => setShowDeleteModal(true)}
                                    disabled={loading || cardDefaultLoading}
                                >
                                    Remove Card
                                </Button>
                            </div>
                        </Row>
                    </Form>
                </ModalBody>
            </Modal>
            {showDeleteModal && (
                <DeleteModal
                    show={showDeleteModal}
                    onCloseClick={onCloseClick}
                    onDeleteClick={onDeleteClick}
                    message={'You Want To Remove This Card !'}
                    loading={loading}
                />
            )}
        </React.Fragment>
    )
}

export default CardInfo

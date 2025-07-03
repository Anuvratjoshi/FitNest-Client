import React from 'react'
import {
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalHeader,
    Row,
} from 'reactstrap'

const CardInfo = ({ details, isOpen, setIsOpen }) => {
    return (
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
                                    className={'bg-dark-subtle text-uppercase'}
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
                                    className={'bg-dark-subtle text-uppercase'}
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
                                    className={'bg-dark-subtle text-uppercase'}
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
                    </Row>
                </Form>
            </ModalBody>
        </Modal>
    )
}

export default CardInfo

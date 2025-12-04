import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import FeatherIcon from 'feather-icons-react'

const ConfirmationModal = ({ isOpen, toggle, onSubmit }) => {
    const handleSubmit = () => {
        if (onSubmit) onSubmit()
        toggle()
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle} centered size='md'>
            <ModalHeader
                tag='h5'
                className='p-3 bg-success text-white modal-title border-0'
                toggle={toggle}
            >
                <div className='d-flex align-items-center'>
                    <FeatherIcon icon='check-circle' className='icon-sm me-2' />
                    <span className='fw-bold'>
                        Confirm Your Subscription Request
                    </span>
                </div>
            </ModalHeader>

            <ModalBody className='p-4 bg-light'>
                <div className='text-center'>
                    <FeatherIcon
                        icon='info'
                        className='icon-lg text-primary mb-3'
                    />
                    <h6 className='fw-bold text-muted mb-3'>
                        Thank You for Your Interest!
                    </h6>
                    <p className='mb-3 text-muted'>
                        We're excited to help you get started with our premium
                        subscription plans. Submitting this request confirms
                        your agreement to our terms and conditions.
                    </p>
                    <div className='text-start bg-dark p-3 rounded border mb-3'>
                        <h6 className='fw-bold text-success mb-2'>
                            Key Terms & Conditions:
                        </h6>
                        <ul className='list-unstyled'>
                            <li className='mb-1'>
                                <FeatherIcon
                                    icon='check'
                                    className='icon-xs text-success me-2'
                                />
                                Subscription fees are billed monthly/annually as
                                selected.
                            </li>
                            <li className='mb-1'>
                                <FeatherIcon
                                    icon='check'
                                    className='icon-xs text-success me-2'
                                />
                                You can cancel anytime with no penalties.
                            </li>
                            <li className='mb-1'>
                                <FeatherIcon
                                    icon='check'
                                    className='icon-xs text-success me-2'
                                />
                                All plans include access to exclusive features
                                and support.
                            </li>
                        </ul>
                    </div>
                    <div className='text-start bg-dark p-3 rounded border mb-3'>
                        <h6 className='fw-bold text-success mb-2'>
                            Privacy Policy:
                        </h6>
                        <ul className='list-unstyled'>
                            <li className='mb-1'>
                                <FeatherIcon
                                    icon='shield'
                                    className='icon-xs text-success me-2'
                                />
                                Your data is used solely for processing this
                                request.
                            </li>
                            <li className='mb-1'>
                                <FeatherIcon
                                    icon='shield'
                                    className='icon-xs text-success me-2'
                                />
                                We do not share, sell, or distribute information
                                without consent.
                            </li>
                            <li className='mb-1'>
                                <FeatherIcon
                                    icon='shield'
                                    className='icon-xs text-success me-2'
                                />
                                Secure encryption protects your personal
                                details.
                            </li>
                        </ul>
                    </div>
                    <p className='text-muted small'>
                        Please review all details carefully. By proceeding, you
                        acknowledge and accept these terms.
                    </p>
                </div>
            </ModalBody>

            <ModalFooter className='p-3 border-top bg-light'>
                <Button
                    color='outline-secondary'
                    onClick={toggle}
                    className='fw-bold'
                >
                    Cancel
                </Button>
                <Button
                    color='success'
                    onClick={handleSubmit}
                    className='fw-bold'
                >
                    <FeatherIcon icon='send' className='icon-xs me-1' />
                    Submit Request
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default ConfirmationModal

import React, { useState } from 'react'
import ReactCreditCards from 'react-credit-cards-2'
import 'react-credit-cards-2/dist/es/styles-compiled.css'
import CardInfo from '../Modals/CardInfo'

const CreditCard = ({
    last4,
    exp_month,
    exp_year,
    defaultCard,
    brand,
    paymentId,
    fetchCustomerCards,
    totalCardAdded,
}) => {
    const [clickedCard, setClickedCard] = useState({})
    const [isOpen, setIsOpen] = useState(false)
    return (
        <React.Fragment>
            <div className='mb-4 position-relative'>
                <div
                    className={`position-relative border border-3 shadow-sm ${
                        defaultCard ? 'border-danger' : 'border-muted'
                    }`}
                    style={{
                        borderRadius: '18px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        setClickedCard({
                            paymentId,
                            last4,
                            exp_month,
                            exp_year,
                            defaultCard,
                            brand,
                        })
                        setIsOpen(true)
                    }}
                >
                    <div className='force-visa-bg'>
                        <ReactCreditCards
                            number={`**** **** **** ${last4}`}
                            expiry={`${
                                exp_month < 10 ? '0' + exp_month : exp_month
                            }/${exp_year}`}
                            cvc={'***'}
                            name={brand}
                            focused={'number'}
                        />
                        {defaultCard && (
                            <span
                                className='badge rounded-pill bg-danger position-absolute'
                                style={{
                                    top: '10px',
                                    right: '10px',
                                    fontSize: '0.75rem',
                                    padding: '5px 8px',
                                }}
                            >
                                Default
                            </span>
                        )}
                    </div>
                </div>
            </div>
            {isOpen && (
                <CardInfo
                    details={clickedCard}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    fetchCustomerCards={fetchCustomerCards}
                    totalCardAdded={totalCardAdded}
                />
            )}
        </React.Fragment>
    )
}

export default CreditCard

import React from 'react'
import ReactCreditCards from 'react-credit-cards-2'
import 'react-credit-cards-2/dist/es/styles-compiled.css'

const CreditCard = ({ last4, exp_month, exp_year, defaultCard, brand }) => {
    return (
        <div className='mb-4 position-relative'>
            <div
                className={`position-relative border border-3 shadow-sm ${
                    defaultCard ? 'border-danger' : 'border-muted'
                }`}
                style={{
                    borderRadius: '18px',
                    overflow: 'hidden',
                }}
            >
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
    )
}

export default CreditCard

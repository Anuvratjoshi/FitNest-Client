import React from 'react'
import CountUp from 'react-countup'
import { Card, CardBody, Spinner } from 'reactstrap'

const GlobalCard = ({
    count,
    g_c_loading,
    card_body_class,
    spinner_color_class,
    icon_bg_class,
    icon_class,
    title,
}) => {
    return (
        <Card>
            <CardBody className={card_body_class}>
                <div className='flex-grow-1'>
                    {!g_c_loading ? (
                        <h4 className='fw-bold'>
                            <CountUp
                                start={0}
                                end={count}
                                separator={','}
                                decimals={0}
                                duration={3}
                            />
                        </h4>
                    ) : (
                        <Spinner
                            style={{
                                height: '22px',
                                width: '22px',
                                marginBottom: '5px',
                            }}
                            color={spinner_color_class}
                        >
                            Loading...
                        </Spinner>
                    )}
                    <h6 className='text-muted fs-13 mb-0'>{title}</h6>
                </div>
                <div className='flex-shrink-0 avatar-xs text-center'>
                    <div className={icon_bg_class}>
                        <i className={icon_class}></i>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

export default GlobalCard

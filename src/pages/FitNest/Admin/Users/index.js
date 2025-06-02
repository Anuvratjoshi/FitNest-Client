import React from 'react'
import { Link } from 'react-router-dom'
import { ButtonGroup, Col, Container, Row } from 'reactstrap'

const Users = () => {
    return (
        <React.Fragment>
            <div className='page-content'>
                <Container fluid>
                    <Row>
                        <Col xs={12}>
                            <div className='page-title-box d-sm-flex align-items-center justify-content-between'>
                                <h4 className='mb-sm-0'>
                                    Users Console
                                    <ButtonGroup className='mx-sm-4'>
                                        <select
                                            id='lTYvmh'
                                            className='form-select'
                                            aria-label='Default select example'
                                            // onChange={changeValue}
                                            // defaultValue={refreshRate}
                                        >
                                            <option value={0}>none</option>
                                            <option value={2}>2 minute</option>
                                            <option value={10}>
                                                10 minute
                                            </option>
                                        </select>
                                    </ButtonGroup>
                                </h4>
                                <div className='page-title-right'>
                                    <ol className='breadcrumb m-0'>
                                        <li className='breadcrumb-item'>
                                            <Link to='#'>Manage Users</Link>
                                        </li>
                                        <li className='breadcrumb-item active'>
                                            Users
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default Users

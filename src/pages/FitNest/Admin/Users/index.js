import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
    ButtonGroup,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Row,
} from 'reactstrap'
import TableContainer from '../../../../Components/Common/TableContainerReactTable'

const Users = () => {
    const data = [
        {
            id: '10',
            name: 'Tyrone',
            email: 'tyrone@example.com',
            designation: 'Senior Response Liaison',
            company: 'Raynor, Rolfson and Daugherty',
            location: 'Qatar',
        },
        {
            id: '09',
            name: 'Cathy',
            email: 'cathy@example.com',
            designation: 'Customer Data Director',
            company: 'Ebert, Schamberger and Johnston',
            location: 'Mexico',
        },
        {
            id: '08',
            name: 'Patsy',
            email: 'patsy@example.com',
            designation: 'Dynamic Assurance Director',
            company: 'Streich Group',
            location: 'Niue',
        },
        {
            id: '07',
            name: 'Kerry',
            email: 'kerry@example.com',
            designation: 'Lead Applications Associate',
            company: 'Feeney, Langworth and Tremblay',
            location: 'Niger',
        },
        {
            id: '06',
            name: 'Traci',
            email: 'traci@example.com',
            designation: 'Corporate Identity Director',
            company: 'Koelpin - Goldner',
            location: 'Vanuatu',
        },
        {
            id: '05',
            name: 'Noel',
            email: 'noel@example.com',
            designation: 'Customer Data Director',
            company: 'Howell - Rippin',
            location: 'Germany',
        },
        {
            id: '04',
            name: 'Robert',
            email: 'robert@example.com',
            designation: 'Product Accounts Technician',
            company: 'Hoeger',
            location: 'San Marino',
        },
        {
            id: '03',
            name: 'Shannon',
            email: 'shannon@example.com',
            designation: 'Legacy Functionality Associate',
            company: 'Zemlak Group',
            location: 'South Georgia',
        },
        {
            id: '02',
            name: 'Harold',
            email: 'harold@example.com',
            designation: 'Forward Creative Coordinator',
            company: 'Metz Inc',
            location: 'Iran',
        },
        {
            id: '01',
            name: 'Jonathan',
            email: 'jonathan@example.com',
            designation: 'Senior Implementation Architect',
            company: 'Hauck Inc',
            location: 'Holy See',
        },
    ]
    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: cellProps => {
                    return <span className='fw-semibold'>{cellProps.id}</span>
                },
                disableFilters: true,
                filterable: false,
            },

            {
                Header: 'Name',
                accessor: 'name',
                disableFilters: true,
                filterable: false,
            },
            {
                Header: 'Email',
                accessor: 'email',
                disableFilters: true,
                filterable: false,
            },
            {
                Header: 'Designation',
                accessor: 'designation',
                disableFilters: true,
                filterable: false,
            },
            {
                Header: 'Company',
                accessor: 'company',
                disableFilters: true,
                filterable: false,
            },
            {
                Header: 'Location',
                accessor: 'location',
                disableFilters: true,
                filterable: false,
            },
        ],
        [],
    )
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
                    <Card>
                        <CardHeader>
                            <h4 className='card-title mb-0 flex-grow-1'>
                                USER TABLE
                            </h4>
                        </CardHeader>
                        <CardBody>
                            <div style={{ overflowX: 'auto' }}>
                                <TableContainer
                                    columns={columns || []}
                                    data={data || []}
                                    isPagination={true}
                                    isGlobalFilter={true}
                                    iscustomPageSize={false}
                                    isBordered={false}
                                    customPageSize={5}
                                    className='custom-header-css table align-middle table-nowrap'
                                    tableClassName='table-centered align-middle table-nowrap mb-0'
                                    theadClassName='text-muted table-light'
                                    SearchPlaceholder='Search...'
                                />
                            </div>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default Users

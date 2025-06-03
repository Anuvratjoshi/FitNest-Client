import React, { useEffect, useMemo, useState } from 'react'
import { Card, CardBody, CardHeader, Container, Row } from 'reactstrap'
import TableContainer from '../../../../Components/Common/TableContainerReactTable'
import Timer from '../../../../Components/Common/Timer'
import { getAllUsers } from '../../../../helpers/fakebackend_helper'

const Users = () => {
    // #### Fetching users associated with a gym ####
    const [allUsers, setAllUsers] = useState([])
    const [a_u_flag, set_a_u_flag] = useState(true)
    const fetchAllUser = async () => {
        try {
            const res = await getAllUsers()
            setAllUsers(res.data)
        } catch (error) {
            console.log('!!! fetchAllUser Error !!!', error)
        } finally {
            set_a_u_flag(false)
        }
    }

    const fetchData = async () => {
        try {
            await fetchAllUser()
        } catch (error) {
            console.log('fetchData Error', error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    // Table Columns
    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: cellProps => (
                    <span className='fw-semibold'>{cellProps.userId}</span>
                ),
                disableFilters: true,
                filterable: false,
            },
            {
                Header: 'Name',
                accessor: cellProps =>
                    `${cellProps.firstName} ${cellProps.lastName}`,
                disableFilters: true,
                filterable: false,
            },
            {
                Header: 'Email',
                accessor: cellProps => (
                    <span className='text-primary'>{cellProps.email}</span>
                ),
                disableFilters: true,
                filterable: false,
            },
            {
                Header: 'Phone',
                accessor: 'phone',
                disableFilters: true,
                filterable: false,
            },
            {
                Header: 'Gender',
                accessor: 'gender',
                disableFilters: true,
                filterable: false,
            },
            {
                Header: 'Membership Active',
                accessor: cellProps =>
                    cellProps.membership?.isActive ? 'Yes' : 'No',
                disableFilters: true,
                filterable: false,
            },
            {
                Header: 'Action',
                accessor: cellProps => (
                    <>
                        <span
                            className='mx-1 fs-18 bx bx-edit-alt text-warning bg-warning-subtle rounded btn btn-sm'
                            onClick={() => console.log(cellProps)}
                        ></span>
                        <span className='mx-1 fs-18 bx bx-trash text-danger bg-danger-subtle rounded btn btn-sm'></span>
                        <span className='mx-1 fs-18 mdi mdi-eye text-info bg-info-subtle rounded btn btn-sm'></span>
                    </>
                ),

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
                        <Timer
                            consoleTitle='Users'
                            breadCrumbTitle='Manage Users'
                            pageTitle='Users'
                        />
                    </Row>
                    <Card>
                        <CardHeader>
                            <h4 className='card-title mb-0 flex-grow-1'>
                                USER TABLE
                            </h4>
                        </CardHeader>
                        <CardBody>
                            <div className='d-flex justify-content-end mb-2'>
                                {/* Search bar alignment handled inside TableContainer */}
                            </div>
                            <div style={{ overflowX: 'auto' }}>
                                <TableContainer
                                    columns={columns || []}
                                    data={allUsers || []}
                                    isPagination={true}
                                    isGlobalFilter={true}
                                    iscustomPageSize={false}
                                    isBordered={false}
                                    customPageSize={5}
                                    loading={a_u_flag}
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

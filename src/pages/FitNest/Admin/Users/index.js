import React, { useEffect, useMemo, useState } from 'react'
import { Card, CardBody, CardHeader, Container, Row } from 'reactstrap'
import TableContainer from '../../../../Components/Common/TableContainerReactTable'
import Timer from '../../../../Components/Common/Timer'
import { getAllUsers } from '../../../../helpers/apiservice_helper'
import AdminEditUser from './Modals/AdminEditUser'

const Users = () => {
    // #### Fetching users associated with a gym ####
    const [allUsers, setAllUsers] = useState([])
    const [a_u_flag, set_a_u_flag] = useState(true)
    const fetchAllUser = async () => {
        try {
            set_a_u_flag(true)
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
            console.log('!!! fetchData Error !!!', error)
        }
    }

    // #### initial side effect to fetch data ####
    useEffect(() => {
        fetchData()
    }, [])

    // #### mask user id ####
    const maskMongoId = id => {
        return id.replace(/^(.{3}).{3}(.{5}).{10}(.{3})$/, '$1***$2***$3')
    }

    // #### Edit User ####
    const [editModalFlag, setEditModalFlag] = useState({
        isOpen: false,
        type: '',
    })
    const [clickedUserData, setClickedUserData] = useState({})

    // #### action click handlers ####
    const actionClickHandler = (data, type) => {
        if (type === 'edit') {
            setClickedUserData(data)
            setEditModalFlag({ isOpen: true, type })
            return
        } else if (type === 'view') {
            setClickedUserData(data)
            setEditModalFlag({ isOpen: true, type })
        }
    }

    // #### Table Columns ####
    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: cellProps => (
                    <span
                        onClick={() => actionClickHandler(cellProps, 'view')}
                        className='fw-semibold text-primary'
                        style={{ cursor: 'pointer' }}
                    >
                        {maskMongoId(cellProps.userId)}
                    </span>
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
                    <div className='d-flex'>
                        <span
                            className='mx-1 fs-18 bx bx-edit-alt text-warning bg-warning-subtle rounded btn btn-sm'
                            onClick={() =>
                                actionClickHandler(cellProps, 'edit')
                            }
                        ></span>
                        <span className='mx-1 fs-18 bx bx-trash text-danger bg-danger-subtle rounded btn btn-sm'></span>
                    </div>
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
            {editModalFlag?.isOpen && (
                <AdminEditUser
                    editModalFlag={editModalFlag}
                    setEditModalFlag={setEditModalFlag}
                    userData={clickedUserData}
                    fetchAllUser={fetchAllUser}
                />
            )}
        </React.Fragment>
    )
}

export default Users

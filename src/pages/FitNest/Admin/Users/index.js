import React, { useEffect, useMemo, useState } from 'react'
import { Card, CardBody, CardHeader, Container, Row } from 'reactstrap'
import TableContainer from '../../../../Components/Common/TableContainerReactTable'
import Timer from '../../../../Components/Common/Timer'
import {
    adminDeleteUser,
    getAllUsers,
} from '../../../../helpers/apiservice_helper'
import AdminEditUser from './Modals/AdminEditUser'
import { maskMongoId } from '../../../../helpers/general_helper'
import DeleteModal from '../../../../Components/Common/DeleteModal'
import { toast } from 'react-toastify'

const Users = () => {
    // #### Fetching users associated with a gym ####
    const [allUsers, setAllUsers] = useState([])
    const [a_u_loading, set_a_u_loading] = useState(true)
    const fetchAllUser = async () => {
        try {
            set_a_u_loading(true)
            const res = await getAllUsers()
            setAllUsers(res.data)
        } catch (error) {
            console.log('!!! fetchAllUser Error !!!', error)
            toast.error(error?.message, { autoClose: 1500 })
        } finally {
            set_a_u_loading(false)
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

    // #### Edit User ####
    const [editModalFlag, setEditModalFlag] = useState({
        isOpen: false,
        type: '',
    })
    const [clickedUserData, setClickedUserData] = useState({})

    // #### delete user ####
    const [d_m_flag, set_d_m_flag] = useState(false)
    const [d_m_loading, set_d_m_loading] = useState()
    const onDeleteClick = async () => {
        if (clickedUserData?.userId) {
            set_d_m_loading(true)
            try {
                const res = await adminDeleteUser(clickedUserData?.userId)
                toast.success(res?.message, { autoClose: 1500 })
                set_d_m_flag(false)
                setClickedUserData({})
                fetchAllUser()
            } catch (error) {
                console.log('!!! Error While Deleting User!!!', error)
                toast.error(error?.message, { autoClose: 1500 })
            } finally {
                set_d_m_loading(false)
            }
        }
    }
    const onCloseClick = () => {
        set_d_m_flag(false)
        setClickedUserData({})
    }

    // #### action click handlers ####
    const actionClickHandler = (data, type) => {
        if (type === 'edit') {
            setClickedUserData(data)
            setEditModalFlag({ isOpen: true, type })
            return
        } else if (type === 'view') {
            setClickedUserData(data)
            setEditModalFlag({ isOpen: true, type })
            return
        } else if (type === 'delete') {
            setClickedUserData(data)
            set_d_m_flag(true)
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
                        <span
                            className='mx-1 fs-18 bx bx-trash text-danger bg-danger-subtle rounded btn btn-sm'
                            onClick={() =>
                                actionClickHandler(cellProps, 'delete')
                            }
                        ></span>
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
                                    loading={a_u_loading}
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
            <DeleteModal
                show={d_m_flag}
                message='Are you sure you want to remove this record ?'
                onCloseClick={onCloseClick}
                onDeleteClick={onDeleteClick}
                loading={d_m_loading}
            />
        </React.Fragment>
    )
}

export default Users

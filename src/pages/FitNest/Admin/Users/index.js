import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Container, Row } from 'reactstrap'
import Timer from '../../../../Components/Common/Timer'
import {
    adminDeleteUser,
    getAllUsers,
    usersByLastLoginTime,
    usersMembershipStatus,
} from '../../../../helpers/apiservice_helper'
import AdminEditUser from './Modals/AdminEditUser'
import DeleteModal from '../../../../Components/Common/DeleteModal'
import { toast } from 'react-toastify'
import UserTable from './Tables/UserTable'
import UserByMembershipStatusTable from './Tables/UserByMembershipStatusTable'
import UserByLastLoginTable from './Tables/UserByLastLoginTable'

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

    // #### Fetching users associated with a gym ####
    const [filteredUsers, setFilteredUsers] = useState([])
    const [selectedFilter, setSelectedFilter] = useState('Active')
    const [f_u_loading, set_f_u_loading] = useState(true)
    const fetchUsersByMembershipStatus = async statusLabel => {
        const statusBool = statusLabel === 'Active' ? true : false
        try {
            set_f_u_loading(true)
            const res = await usersMembershipStatus({ status: statusBool })
            setFilteredUsers(res.data)
            setSelectedFilter(statusLabel)
        } catch (error) {
            console.log('!!! fetchUsersByMembershipStatus Error !!!', error)
            toast.error(error?.message, { autoClose: 1500 })
        } finally {
            set_f_u_loading(false)
        }
    }

    // #### Fetching users by last login time ####
    const [usersByLastLogin, setUsersByLastLogin] = useState([])
    const [u_b_l_l_loading, set_u_b_l_l_loading] = useState(true)
    const fetchuserByLastLoginTime = async () => {
        try {
            set_u_b_l_l_loading(true)
            const res = await usersByLastLoginTime({ days: 30 })
            setUsersByLastLogin(res.data)
        } catch (error) {
            console.log('!!! fetchuserByLastLoginTime Error !!!', error)
            toast.error(error?.message, { autoClose: 1500 })
        } finally {
            set_u_b_l_l_loading(false)
        }
    }
    const fetchData = async () => {
        try {
            await Promise.all([
                fetchAllUser(),
                fetchUsersByMembershipStatus('Active'),
                fetchuserByLastLoginTime(),
            ])
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
                await Promise.all([
                    fetchAllUser(),
                    fetchUsersByMembershipStatus(selectedFilter),
                ])
            } catch (error) {
                console.log('!!! Error While Deleting User!!!', error)
                toast.error(error?.message, { autoClose: 1500 })
            } finally {
                set_d_m_loading(false)
            }
        }
    }

    // #### delete modal close click handlers ####
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
                    {/* USER TABLE */}
                    <Card>
                        <UserTable
                            actionClickHandler={actionClickHandler}
                            allUsers={allUsers}
                            a_u_loading={a_u_loading}
                        />
                    </Card>
                    {/* USER TABLE ( {selectedFilter} MEMBERSHIP ) */}
                    <Card>
                        <UserByMembershipStatusTable
                            actionClickHandler={actionClickHandler}
                            filteredUsers={filteredUsers}
                            f_u_loading={f_u_loading}
                            selectedFilter={selectedFilter}
                            fetchUsersByMembershipStatus={
                                fetchUsersByMembershipStatus
                            }
                        />
                    </Card>
                    {/* USER BY LAST LOGIN TIME TABLE */}
                    <Card>
                        <UserByLastLoginTable
                            actionClickHandler={actionClickHandler}
                            usersByLastLogin={usersByLastLogin}
                            u_b_l_l_loading={u_b_l_l_loading}
                        />
                    </Card>
                </Container>
            </div>
            {editModalFlag?.isOpen && (
                <AdminEditUser
                    editModalFlag={editModalFlag}
                    setEditModalFlag={setEditModalFlag}
                    userData={clickedUserData}
                    fetchData={fetchData}
                />
            )}
            {d_m_flag && (
                <DeleteModal
                    show={d_m_flag}
                    message='Are you sure you want to remove this record ?'
                    onCloseClick={onCloseClick}
                    onDeleteClick={onDeleteClick}
                    loading={d_m_loading}
                />
            )}
        </React.Fragment>
    )
}

export default Users

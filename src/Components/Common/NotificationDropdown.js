import React, { useEffect, useState } from 'react'
import {
    Col,
    Dropdown,
    DropdownMenu,
    DropdownToggle,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane,
} from 'reactstrap'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

//import images
import bell from '../../assets/images/svg/bell.svg'

//SimpleBar
import SimpleBar from 'simplebar-react'
import moment from 'moment'
import {
    getAdminNotifications,
    readNotification,
} from '../../helpers/apiservice_helper'
import CustomLoader from './CustomLoader'
import { toast } from 'react-toastify'

const NotificationDropdown = () => {
    //Dropdown Toggle
    const [isNotificationDropdown, setIsNotificationDropdown] = useState(false)
    const toggleNotificationDropdown = () => {
        setIsNotificationDropdown(!isNotificationDropdown)
    }

    //Tab
    const [activeTab, setActiveTab] = useState('1')
    const toggleTab = tab => {
        if (activeTab !== tab) {
            setActiveTab(tab)
        }
    }

    // #### Fetching notification based on type : all | latest ####
    const [notificationData, setNotificationData] = useState([])
    const [n_d_loading, s_n_d_loading] = useState(true)
    const [isFetching, setIsFetching] = useState(false) // state to avoid overlaps
    const fetchNotificationData = async type => {
        if (isFetching) return // Prevent overlap
        setIsFetching(true)
        try {
            const res = await getAdminNotifications({ type: type ?? 'all' })
            if (type === 'latest' && res.data?.length) {
                setNotificationData(prev => [...res.data, ...prev])
            } else if (!type) {
                // #### initial load ####
                setNotificationData(res.data || [])
            }
        } catch (error) {
            console.log('!!! fetchNotificationData Error !!!', error)
            toast.error(error, { autoClose: 1500 })
        } finally {
            s_n_d_loading(false)
            setIsFetching(false)
        }
    }

    const fetchData = async () => {
        try {
            await Promise.all([fetchNotificationData()])
        } catch (error) {
            console.log('!!! fetchData Error !!!', error)
            toast.error(error, { autoClose: 1500 })
        }
    }

    // #### initial side effect to fetch data ####
    useEffect(() => {
        fetchData()
    }, [])

    // #### Fetch every 15 seconds safely ####
    useEffect(() => {
        const interval = setInterval(() => {
            fetchNotificationData('latest').catch(err => {
                console.error('Interval fetch error:', err)
            })
        }, 15000)

        return () => clearInterval(interval)
    }, [])

    // #### Reading notification ####
    const [clickedNotificationId, setClickedNotificationId] = useState('')
    const readParitcularNotification = async id => {
        setClickedNotificationId(id)

        if (!id) {
            return toast.error('Notification ID is missing', {
                autoClose: 1500,
            })
        }

        if (clickedNotificationId) {
            return toast.warn('Notification reading is already in progress', {
                autoClose: 1500,
            })
        }

        try {
            const res = await readNotification({ _id: id })

            if (!res || typeof res !== 'object') {
                throw new Error('Unexpected response from server')
            }

            if (res.success && res.data?._id) {
                setNotificationData(prev =>
                    prev?.filter(
                        notification => notification?._id !== res.data._id,
                    ),
                )
                toast.success(res.message || 'Notification marked as read', {
                    autoClose: 1500,
                })
            } else {
                toast.error(
                    res.message || 'Failed to mark notification as read',
                    { autoClose: 1500 },
                )
            }
        } catch (error) {
            console.log('!!! readParitcularNotification Error !!!', error)
            toast.error(error, { autoClose: 1500 })
        } finally {
            setClickedNotificationId('')
        }
    }

    const iconClassMap = {
        info: 'bx bx-info-circle text-center',
        warn: 'bx bx-error-alt text-center',
        error: 'bx bx-error text-center',
    }
    return (
        <React.Fragment>
            <Dropdown
                isOpen={isNotificationDropdown}
                toggle={toggleNotificationDropdown}
                className='topbar-head-dropdown ms-1 header-item'
            >
                <DropdownToggle
                    type='button'
                    tag='button'
                    className='btn btn-icon btn-topbar btn-ghost-secondary rounded-circle'
                >
                    <i className='bx bx-bell fs-22'></i>
                    {notificationData?.length > 0 && (
                        <span className='position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-danger'>
                            {notificationData?.length}
                            <span className='visually-hidden'>
                                unread messages
                            </span>
                        </span>
                    )}
                </DropdownToggle>
                <DropdownMenu className='dropdown-menu-lg dropdown-menu-end p-0'>
                    <div className='dropdown-head bg-primary bg-pattern rounded-top'>
                        <div className='p-3'>
                            <Row className='align-items-center'>
                                <Col>
                                    <h6 className='m-0 fs-16 fw-semibold text-white'>
                                        Notifications
                                    </h6>
                                </Col>
                                <div className='col-auto dropdown-tabs'>
                                    <span className='badge bg-light-subtle text-bodyfs-13'>
                                        {notificationData?.length} New
                                    </span>
                                </div>
                            </Row>
                        </div>

                        <div className='px-2 pt-2'>
                            <Nav className='nav-tabs dropdown-tabs nav-tabs-custom'>
                                <NavItem>
                                    <NavLink
                                        href='#'
                                        className={classnames({
                                            active: activeTab === '1',
                                        })}
                                        onClick={() => {
                                            toggleTab('1')
                                        }}
                                    >
                                        All ({notificationData?.length})
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        href='#'
                                        className={classnames({
                                            active: activeTab === '2',
                                        })}
                                        onClick={() => {
                                            toggleTab('2')
                                        }}
                                    >
                                        Messages
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        href='#'
                                        className={classnames({
                                            active: activeTab === '3',
                                        })}
                                        onClick={() => {
                                            toggleTab('3')
                                        }}
                                    >
                                        Alerts
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </div>
                    </div>

                    <TabContent activeTab={activeTab}>
                        <TabPane tabId='1' className='py-2 ps-2'>
                            {!n_d_loading && notificationData?.length > 0 ? (
                                <SimpleBar
                                    style={{ maxHeight: '300px' }}
                                    className='pe-1'
                                >
                                    {notificationData?.map(
                                        (notification, index) => (
                                            <div
                                                key={index}
                                                className='text-reset notification-item d-block dropdown-item position-relative'
                                            >
                                                <div className='d-flex p-2 align-items-start'>
                                                    <div className='avatar-xs me-2'>
                                                        <span
                                                            className={
                                                                notification?.level ===
                                                                'info'
                                                                    ? 'avatar-title bg-info-subtle text-info rounded-circle fs-16'
                                                                    : notification?.level ===
                                                                      'warn'
                                                                    ? 'avatar-title bg-warning-subtle text-warning rounded-circle fs-16'
                                                                    : notification?.level ===
                                                                      'error'
                                                                    ? 'avatar-title bg-danger-subtle text-danger rounded-circle fs-16'
                                                                    : ''
                                                            }
                                                        >
                                                            <i
                                                                className={
                                                                    iconClassMap[
                                                                        notification
                                                                            .level
                                                                    ] ||
                                                                    'bx bx-message-alt-detail'
                                                                }
                                                            />
                                                        </span>
                                                    </div>

                                                    <div className='flex-1 w-100'>
                                                        <Link
                                                            to='#'
                                                            className='stretched-link text-decoration-none'
                                                        >
                                                            <h6 className='mt-0 mb-1 lh-base fw-semibold text-capitalize'>
                                                                {typeof notification?.message ===
                                                                    'string' &&
                                                                notification
                                                                    .message
                                                                    .length > 20
                                                                    ? `${notification.message.slice(
                                                                          0,
                                                                          20,
                                                                      )} .....`
                                                                    : notification?.message ||
                                                                      'No message'}
                                                            </h6>
                                                        </Link>

                                                        <div
                                                            className='fs-13 text-muted rounded'
                                                            style={{
                                                                wordBreak:
                                                                    'break-word',
                                                                overflowWrap:
                                                                    'break-word',
                                                                whiteSpace:
                                                                    'normal',
                                                            }}
                                                        >
                                                            <p className='mb-1 m-0'>
                                                                {typeof notification?.description ===
                                                                    'string' &&
                                                                notification
                                                                    .description
                                                                    .length >
                                                                    100
                                                                    ? `${notification.description.slice(
                                                                          0,
                                                                          100,
                                                                      )} .....`
                                                                    : notification?.description ||
                                                                      'No description'}
                                                            </p>
                                                        </div>

                                                        <p className='mb-0 fs-11 fw-medium text-uppercase text-muted mt-1'>
                                                            <i className='mdi mdi-clock-outline me-1'></i>
                                                            {moment(
                                                                notification.date,
                                                            ).format(
                                                                'YYYY-MM-DD HH:mm:ss',
                                                            )}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <input
                                                            style={{
                                                                cursor: 'pointer',
                                                            }}
                                                            className='form-check-input'
                                                            type='checkbox'
                                                            checked={
                                                                notification?._id ===
                                                                clickedNotificationId
                                                            }
                                                            disabled={
                                                                clickedNotificationId &&
                                                                notification?._id !==
                                                                    clickedNotificationId
                                                            }
                                                            readOnly
                                                            onClick={() =>
                                                                readParitcularNotification(
                                                                    notification?._id,
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ),
                                    )}

                                    <div className='my-3 text-center'>
                                        <button
                                            type='button'
                                            className='btn btn-soft-success waves-effect waves-light'
                                        >
                                            View All Notifications
                                            <i className='ri-arrow-right-line align-middle'></i>
                                        </button>
                                    </div>
                                </SimpleBar>
                            ) : notificationData?.length === 0 ? (
                                <SimpleBar
                                    style={{ maxHeight: '300px' }}
                                    className='p-4'
                                >
                                    <div className='w-25 w-sm-50 pt-3 mx-auto'>
                                        <img
                                            src={bell}
                                            className='img-fluid'
                                            alt='user-pic'
                                        />
                                    </div>
                                    <div className='text-center pb-5 mt-2'>
                                        <h6 className='fs-18 fw-semibold lh-base'>
                                            Hey! You have no new notifications
                                        </h6>
                                    </div>
                                </SimpleBar>
                            ) : (
                                <CustomLoader height={'300px'} />
                            )}
                        </TabPane>

                        <TabPane tabId='2' className='py-2 ps-2'>
                            <SimpleBar
                                style={{ maxHeight: '300px' }}
                                className='p-4'
                            >
                                <div className='w-25 w-sm-50 pt-3 mx-auto'>
                                    <img
                                        src={bell}
                                        className='img-fluid'
                                        alt='user-pic'
                                    />
                                </div>
                                <div className='text-center pb-5 mt-2'>
                                    <h6 className='fs-18 fw-semibold lh-base'>
                                        Hey! You have no new messages
                                    </h6>
                                </div>
                            </SimpleBar>
                        </TabPane>
                        <TabPane tabId='3' className='p-4'>
                            <div className='w-25 w-sm-50 pt-3 mx-auto'>
                                <img
                                    src={bell}
                                    className='img-fluid'
                                    alt='user-pic'
                                />
                            </div>
                            <div className='text-center pb-5 mt-2'>
                                <h6 className='fs-18 fw-semibold lh-base'>
                                    Hey! You have no new notifications
                                </h6>
                            </div>
                        </TabPane>
                    </TabContent>
                </DropdownMenu>
            </Dropdown>
        </React.Fragment>
    )
}

export default NotificationDropdown

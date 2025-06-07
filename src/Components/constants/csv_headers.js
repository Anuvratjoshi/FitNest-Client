const ADMIN_USER_HEADERS = [
    { label: 'User Id', key: 'userId' },
    { label: 'Gym Id', key: 'gymId' },
    { label: 'Email', key: 'email' },
    { label: 'Gender', key: 'gender' },
    { label: 'First Name', key: 'firstName' },
    { label: 'Last Name', key: 'lastName' },
    { label: 'Phone', key: 'phone' },
    { label: 'Membership Is Active', key: 'membership.isActive' },
    { label: 'Membership Auto Renew', key: 'membership.autoRenew' },
]

const ADMIN_USER_BY_LAST_LOGIN_HEADERS = [
    { label: 'User Id', key: 'userId' },
    { label: 'Gym Id', key: 'gymId' },
    { label: 'Email', key: 'email' },
    { label: 'Gender', key: 'gender' },
    { label: 'First Name', key: 'firstName' },
    { label: 'Last Name', key: 'lastName' },
    { label: 'Phone', key: 'phone' },
    { label: 'Days Since Last Login', key: 'daysSinceLastLogin' },
    { label: 'Membership Is Active', key: 'membership.isActive' },
]

export { ADMIN_USER_HEADERS, ADMIN_USER_BY_LAST_LOGIN_HEADERS }

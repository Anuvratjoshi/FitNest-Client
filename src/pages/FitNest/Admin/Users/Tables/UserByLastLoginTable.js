import React, { useMemo } from 'react'
import { CardBody, CardHeader } from 'reactstrap'
import TableContainer from '../../../../../Components/Common/TableContainerReactTable'
import { maskMongoId } from '../../../../../helpers/general_helper'
import { ADMIN_USER_BY_LAST_LOGIN_HEADERS } from '../../../../../Components/constants/csv_headers'
const UserByLastLoginTable = ({
    actionClickHandler,
    usersByLastLogin,
    u_b_l_l_loading,
}) => {
    const userByLastLoginColumns = useMemo(
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
                Header: 'Days Since Last Login',
                accessor: cellProps => (
                    <span className='text-danger fw-bold'>
                        {cellProps.daysSinceLastLogin}
                    </span>
                ),
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
        ],
        [],
    )
    return (
        <>
            <CardHeader>
                <h4 className='card-title mb-0 flex-grow-1'>
                    USER ACTIVE (
                    <span className='mx-2 text-warning'>{'> 30 D'}</span>)
                </h4>
            </CardHeader>
            <CardBody>
                <div style={{ overflowX: 'auto' }}>
                    <TableContainer
                        columns={userByLastLoginColumns || []}
                        data={usersByLastLogin || []}
                        isPagination={true}
                        isGlobalFilter={true}
                        iscustomPageSize={false}
                        isBordered={false}
                        customPageSize={5}
                        loading={u_b_l_l_loading}
                        className='custom-header-css table align-middle table-nowrap'
                        tableClassName='table-centered align-middle table-nowrap mb-0'
                        theadClassName='text-muted table-light'
                        SearchPlaceholder='Search...'
                        downloadCSV={true}
                        csv={{
                            data: usersByLastLogin || [],
                            headers: ADMIN_USER_BY_LAST_LOGIN_HEADERS,
                            filename: 'Users_By_Last_Login.csv',
                        }}
                    />
                </div>
            </CardBody>
        </>
    )
}

export default UserByLastLoginTable

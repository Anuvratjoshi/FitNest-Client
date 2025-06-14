import React, { useMemo } from 'react'
import { CardBody, CardHeader } from 'reactstrap'
import TableFilter from '../../../../../../Components/Common/TableFilter'
import TableContainer from '../../../../../../Components/Common/TableContainerReactTable'
import { ADMIN_USER_HEADERS } from '../../../../../../Components/constants/csv_headers'
import { usersMembershipStatusFilter } from '../../../../../../common/data/filterData'
import { maskMongoId } from '../../../../../../helpers/general_helper'

const UserByMembershipStatusTable = ({
    fetchUsersByMembershipStatus,
    selectedFilter,
    filteredUsers,
    actionClickHandler,
    f_u_loading,
}) => {
    // #### Table Columns ####
    const membershipStatusColumn = useMemo(
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
        ],
        [],
    )
    return (
        <>
            <CardHeader>
                <div className='d-flex justify-content-between align-items-center'>
                    <h4 className='card-title mb-0 flex-grow-1 text-uppercase'>
                        USER TABLE (
                        {
                            <span className='text-warning mx-2'>
                                {`${selectedFilter} MEMBERSHIP`}
                            </span>
                        }
                        )
                    </h4>
                    <TableFilter
                        filters={usersMembershipStatusFilter}
                        selectedValues={{
                            membershipStatus: selectedFilter,
                        }}
                        onChange={(key, value) => {
                            if (key === 'membershipStatus') {
                                fetchUsersByMembershipStatus(value)
                            }
                        }}
                    />
                </div>
            </CardHeader>
            <CardBody>
                <div style={{ overflowX: 'auto' }}>
                    <TableContainer
                        columns={membershipStatusColumn || []}
                        data={filteredUsers || []}
                        isPagination={true}
                        isGlobalFilter={true}
                        iscustomPageSize={false}
                        isBordered={false}
                        customPageSize={5}
                        loading={f_u_loading}
                        className='custom-header-css table align-middle table-nowrap'
                        tableClassName='table-centered align-middle table-nowrap mb-0'
                        theadClassName='text-muted table-light'
                        SearchPlaceholder='Search...'
                        downloadCSV={true}
                        csv={{
                            data: filteredUsers || [],
                            headers: ADMIN_USER_HEADERS,
                            filename: 'Membership_Status.csv',
                        }}
                    />
                </div>
            </CardBody>
        </>
    )
}

export default UserByMembershipStatusTable

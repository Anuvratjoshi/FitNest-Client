import React, { useMemo } from 'react'
import { CardBody, CardHeader } from 'reactstrap'
import TableContainer from '../../../../../../Components/Common/TableContainerReactTable'
import { maskMongoId } from '../../../../../../helpers/general_helper'
import { ADMIN_USER_HEADERS } from '../../../../../../Components/constants/csv_headers'

const UserTable = ({ actionClickHandler, allUsers, a_u_loading }) => {
    const userTableColumns = useMemo(
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
        <>
            <CardHeader>
                <h4 className='card-title mb-0 flex-grow-1'>USER TABLE</h4>
            </CardHeader>
            <CardBody>
                <div style={{ overflowX: 'auto' }}>
                    <TableContainer
                        columns={userTableColumns || []}
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
                        downloadCSV={true}
                        csv={{
                            data: allUsers || [],
                            headers: ADMIN_USER_HEADERS,
                            filename: 'Users.csv',
                        }}
                    />
                </div>
            </CardBody>
        </>
    )
}

export default UserTable

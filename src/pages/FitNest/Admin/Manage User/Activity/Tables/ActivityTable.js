import React, { useMemo } from 'react'
import { CardBody, CardHeader } from 'reactstrap'
import TableContainer from '../../../../../../Components/Common/TableContainerReactTable'
import { ADMIN_MANAGE_USERS_ACTIVITY } from '../../../../../../Components/constants/csv_headers'
import { maskMongoId } from '../../../../../../helpers/general_helper'
import moment from 'moment'

const ActivityTable = ({ data, loading, pageSize }) => {
    // #### Table Columns ####
    const activityLogsColumn = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: cellProps => (
                    <span className='fw-semibold text-primary'>
                        {maskMongoId(cellProps._id)}
                    </span>
                ),
                disableFilters: true,
                filterable: false,
            },
            {
                Header: 'Description',
                accessor: 'description',
                disableFilters: true,
                filterable: false,
            },
            {
                Header: 'Date',
                accessor: cellProps => (
                    <span>
                        {moment(cellProps.timestamp).format(
                            'YYYY-MM-DD HH:mm:ss',
                        )}
                    </span>
                ),
                disableFilters: true,
                filterable: false,
            },
            {
                Header: 'Level',
                accessor: cellProps => (
                    <span
                        className={
                            cellProps.level == 'info'
                                ? 'badge rounded-pill fs-6 text-info bg-info-subtle'
                                : cellProps.level == 'error'
                                ? 'badge rounded-pill fs-6 text-danger bg-danger-subtle'
                                : 'badge rounded-pill fs-6 text-warning bg-warning-subtle'
                        }
                    >
                        {cellProps.level}
                    </span>
                ),
                disableFilters: true,
                filterable: false,
            },
            {
                Header: 'Origin',
                accessor: cellProps => <span>{cellProps.origin}</span>,
                disableFilters: true,
                filterable: false,
            },
            {
                Header: 'Group',
                accessor: cellProps => (
                    <span className='badge rounded-pill bg-info-subtle text-info fs-6'>
                        {cellProps.group}
                    </span>
                ),
                disableFilters: true,
                filterable: false,
            },
        ],
        [],
    )
    return (
        <React.Fragment>
            <CardHeader>
                <div className='d-flex justify-content-between align-items-center'>
                    <h4 className='card-title mb-0 flex-grow-1 text-uppercase'>
                        Activity Logs
                    </h4>
                </div>
            </CardHeader>
            <CardBody>
                <div style={{ overflowX: 'auto' }}>
                    <TableContainer
                        columns={activityLogsColumn || []}
                        data={data || []}
                        isPagination={true}
                        isGlobalFilter={true}
                        iscustomPageSize={false}
                        isBordered={false}
                        customPageSize={pageSize}
                        loading={loading}
                        className='custom-header-css table align-middle table-nowrap'
                        tableClassName='table-centered align-middle table-nowrap mb-0'
                        theadClassName='text-muted table-light'
                        SearchPlaceholder='Search...'
                        downloadCSV={true}
                        csv={{
                            data: data,
                            headers: ADMIN_MANAGE_USERS_ACTIVITY,
                            filename: 'Admin_Manageuser_Activitylogs.csv',
                        }}
                    />
                </div>
            </CardBody>
        </React.Fragment>
    )
}

export default ActivityTable

// #### IMPORTS #####
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
    useTable,
    useGlobalFilter,
    useAsyncDebounce,
    useSortBy,
    useFilters,
    useExpanded,
    usePagination,
    useRowSelect,
} from 'react-table'
import { Table, Row, Col, Button, Input, CardBody } from 'reactstrap'
import { DefaultColumnFilter } from './filters'
import { Link } from 'react-router-dom'

// #### GLOBAL FILTER COMPONENT #####
function GlobalFilter({ globalFilter, setGlobalFilter, SearchPlaceholder }) {
    const [value, setValue] = React.useState(globalFilter)

    // Debounced handler for better performance on user input
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <React.Fragment>
            <CardBody>
                <form>
                    <Row className='g-3'>
                        <Col>
                            <div className='search-box me-2 mb-2 d-inline-block col-12'>
                                <input
                                    onChange={e => {
                                        setValue(e.target.value)
                                        onChange(e.target.value)
                                    }}
                                    id='search-bar-0'
                                    type='text'
                                    className='form-control search /'
                                    placeholder={SearchPlaceholder}
                                    value={value || ''}
                                />
                                <i className='bx bx-search-alt search-icon'></i>
                            </div>
                        </Col>
                    </Row>
                </form>
            </CardBody>
        </React.Fragment>
    )
}

// #### MAIN TABLE CONTAINER COMPONENT #####
const TableContainer = ({
    columns,
    data,
    isPagination,
    isGlobalSearch,
    isGlobalFilter,
    customPageSize,
    tableClass,
    theadClass,
    trClass,
    thClass,
    divClass,
    SearchPlaceholder,
}) => {
    // ##### HOOK: Initializes react-table with features #####
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state,
        preGlobalFilteredRows,
        setGlobalFilter,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            defaultColumn: { Filter: DefaultColumnFilter },
            initialState: {
                pageIndex: 0,
                pageSize: customPageSize,
                selectedRowIds: 0,
                sortBy: [{ desc: true }], // Default sorting
            },
        },
        useGlobalFilter,
        useFilters,
        useSortBy,
        useExpanded,
        usePagination,
        useRowSelect,
    )

    // ##### Renders up/down arrows for sorting #####
    const generateSortingIndicator = column => {
        return column.isSorted ? (
            column.isSortedDesc ? (
                <span>&#8593;</span>
            ) : (
                <span>&#8595;</span>
            )
        ) : (
            ''
        )
    }

    // ##### Change handler for "Show X" select #####
    const onChangeInSelect = event => {
        setPageSize(Number(event.target.value))
    }

    // ##### Change handler for page number input (if needed) #####
    const onChangeInInput = event => {
        const page = event.target.value ? Number(event.target.value) - 1 : 0
        gotoPage(page)
    }

    return (
        <Fragment>
            {/* ##### Search / Filter Row ##### */}
            {(isGlobalSearch || isGlobalFilter) && (
                <Row className='mb-3 align-items-center'>
                    {isGlobalSearch && (
                        <Col md={1}>
                            <select
                                className='form-select'
                                value={pageSize}
                                onChange={onChangeInSelect}
                            >
                                {[10, 20, 30, 40, 50].map(pageSize => (
                                    <option key={pageSize} value={pageSize}>
                                        Show {pageSize}
                                    </option>
                                ))}
                            </select>
                        </Col>
                    )}
                    {isGlobalFilter && (
                        <Col xs='12' md='3' className='ms-auto text-end'>
                            <GlobalFilter
                                preGlobalFilteredRows={preGlobalFilteredRows}
                                globalFilter={state.globalFilter}
                                setGlobalFilter={setGlobalFilter}
                                SearchPlaceholder={SearchPlaceholder}
                            />
                        </Col>
                    )}
                </Row>
            )}

            {/* ##### Table Rendering ##### */}
            <div className={`table-responsive ${divClass || ''}`}>
                <Table hover {...getTableProps()} className={tableClass}>
                    <thead className={theadClass}>
                        {headerGroups.map(headerGroup => {
                            const headerGroupProps =
                                headerGroup.getHeaderGroupProps()
                            const { key, ...rest } = headerGroupProps
                            return (
                                <tr className={trClass} key={key} {...rest}>
                                    {headerGroup.headers.map(column => (
                                        <th
                                            key={column.id}
                                            className={thClass}
                                            {...column.getSortByToggleProps()}
                                        >
                                            {column.render('Header')}
                                            {generateSortingIndicator(column)}
                                        </th>
                                    ))}
                                </tr>
                            )
                        })}
                    </thead>

                    <tbody {...getTableBodyProps()}>
                        {page.map(row => {
                            prepareRow(row)
                            const rowProps = row.getRowProps()
                            const { key, ...rest } = rowProps
                            return (
                                <tr key={key} {...rest}>
                                    {row.cells.map(cell => {
                                        const cellProps = cell.getCellProps()
                                        const { key: cellKey, ...cellRest } =
                                            cellProps
                                        return (
                                            <td key={cellKey} {...cellRest}>
                                                {cell.render('Cell')}
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>

            {/* ##### Pagination Section ##### */}
            {isPagination && (
                <Row className='align-items-center g-3 mb-3'>
                    <Col xs='12' sm='6' className='text-start text-sm-start'>
                        <div className='text-muted'>
                            Showing
                            <span className='fw-semibold ms-1'>
                                {page.length}
                            </span>{' '}
                            of{' '}
                            <span className='fw-semibold'>{data.length}</span>{' '}
                            Results
                        </div>
                    </Col>
                    <Col xs='12' sm='6' className='text-end'>
                        <ul className='pagination pagination-separated pagination-md justify-content-end mb-0'>
                            {/* Previous Button */}
                            <li
                                className={
                                    !canPreviousPage
                                        ? 'page-item disabled'
                                        : 'page-item'
                                }
                            >
                                <Link
                                    to='#'
                                    className='page-link'
                                    onClick={previousPage}
                                >
                                    Previous
                                </Link>
                            </li>

                            {/* Page Buttons */}
                            {pageOptions.map((item, key) => (
                                <React.Fragment key={key}>
                                    <li className='page-item'>
                                        <Link
                                            to='#'
                                            className={
                                                pageIndex === item
                                                    ? 'page-link active'
                                                    : 'page-link'
                                            }
                                            onClick={() => gotoPage(item)}
                                        >
                                            {item + 1}
                                        </Link>
                                    </li>
                                </React.Fragment>
                            ))}

                            {/* Next Button */}
                            <li
                                className={
                                    !canNextPage
                                        ? 'page-item disabled'
                                        : 'page-item'
                                }
                            >
                                <Link
                                    to='#'
                                    className='page-link'
                                    onClick={nextPage}
                                >
                                    Next
                                </Link>
                            </li>
                        </ul>
                    </Col>
                </Row>
            )}
        </Fragment>
    )
}

// #### PROPTYPES FOR VALIDATION #####
TableContainer.propTypes = {
    preGlobalFilteredRows: PropTypes.any,
}

// #### EXPORT TABLE COMPONENT #####
export default TableContainer

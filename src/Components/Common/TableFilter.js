import React from 'react'
import {
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    ButtonGroup,
} from 'reactstrap'

const TableFilter = ({ filters = [], selectedValues = {}, onChange }) => {
    return (
        <ButtonGroup className='mx-3'>
            {filters.map(filter => (
                <UncontrolledButtonDropdown key={filter.label}>
                    <span className='fs-18 ri ri-filter-3-line text-info bg-info-subtle rounded btn btn-md'></span>
                    <DropdownToggle
                        tag='button'
                        className='btn btn-info'
                        split
                    />
                    <DropdownMenu>
                        {filter.options.map((option, idx) => (
                            <DropdownItem
                                key={idx}
                                onClick={() =>
                                    onChange(
                                        filter.key,
                                        option.value || option.label,
                                    )
                                }
                                className={
                                    selectedValues[filter.key] ===
                                    (option.value || option.label)
                                        ? 'bg-info text-white'
                                        : ''
                                }
                            >
                                {option.label}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </UncontrolledButtonDropdown>
            ))}
        </ButtonGroup>
    )
}

export default TableFilter

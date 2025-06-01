import React, { useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import withRouter from '../../Components/Common/withRouter'
import { Collapse } from 'reactstrap'
import navdata from '../LayoutMenuData'
import { withTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'

const VerticalLayout = props => {
    const navData = navdata().props.children

    /*
layout settings
*/
    const selectLayoutState = state => state.Layout
    const selectLayoutProperties = createSelector(
        selectLayoutState,
        layout => ({
            leftsidbarSizeType: layout.leftsidbarSizeType,
            sidebarVisibilitytype: layout.sidebarVisibilitytype,
            layoutType: layout.layoutType,
        }),
    )
    // Inside your component
    const { leftsidbarSizeType, sidebarVisibilitytype, layoutType } =
        useSelector(selectLayoutProperties)

    //vertical and semibox resize events
    const resizeSidebarMenu = useCallback(() => {
        const windowSize = document.documentElement.clientWidth

        const layout = document.documentElement.getAttribute('data-layout')
        const hamburgerIcon = document.querySelector('.hamburger-icon')

        if (windowSize >= 1025) {
            if (layout === 'vertical' || layout === 'semibox') {
                document.documentElement.setAttribute(
                    'data-sidebar-size',
                    leftsidbarSizeType,
                )
            }

            if (
                sidebarVisibilitytype === 'show' ||
                layoutType === 'vertical' ||
                layoutType === 'twocolumn'
            ) {
                if (hamburgerIcon) hamburgerIcon.classList.remove('open')
            } else {
                if (hamburgerIcon) hamburgerIcon.classList.add('open')
            }
        } else if (windowSize < 1025 && windowSize > 767) {
            document.body.classList.remove('twocolumn-panel')

            if (layout === 'vertical' || layout === 'semibox') {
                document.documentElement.setAttribute('data-sidebar-size', 'sm')
            }

            if (hamburgerIcon) hamburgerIcon.classList.add('open')
        } else if (windowSize <= 767) {
            document.body.classList.remove('vertical-sidebar-enable')

            if (layout !== 'horizontal') {
                document.documentElement.setAttribute('data-sidebar-size', 'lg')
            }

            if (hamburgerIcon) hamburgerIcon.classList.add('open')
        }
    }, [leftsidbarSizeType, sidebarVisibilitytype, layoutType])

    useEffect(() => {
        window.addEventListener('resize', resizeSidebarMenu, true)
        return () =>
            window.removeEventListener('resize', resizeSidebarMenu, true)
    }, [resizeSidebarMenu])

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })

        const initMenu = () => {
            const pathName =
                process.env.PUBLIC_URL + props.router.location.pathname
            const ul = document.getElementById('navbar-nav')

            if (!ul) return // guard clause

            const items = ul.getElementsByTagName('a')
            const itemsArray = [...items]
            removeActivation(itemsArray)

            const matchingMenuItem = itemsArray.find(
                x => x.pathname === pathName,
            )
            if (matchingMenuItem) activateParentDropdown(matchingMenuItem)
        }

        if (props.layoutType === 'vertical') {
            initMenu()
        }
    }, [props.router.location.pathname, props.layoutType])

    function activateParentDropdown(item) {
        if (!item) return
        item.classList.add('active')

        let parentCollapseDiv = item.closest('.collapse.menu-dropdown')

        if (parentCollapseDiv) {
            const parentToggle = parentCollapseDiv.parentElement?.children[0]
            parentCollapseDiv.classList.add('show')
            if (parentToggle) {
                parentToggle.classList.add('active')
                parentToggle.setAttribute('aria-expanded', 'true')
            }

            const ancestorCollapse =
                parentCollapseDiv.parentElement?.closest('.collapse')
            if (ancestorCollapse) {
                ancestorCollapse.classList.add('show')

                const ancestorToggle = ancestorCollapse.previousElementSibling
                if (ancestorToggle) ancestorToggle.classList.add('active')

                const ancestorOfAncestor = ancestorToggle?.closest('.collapse')
                if (ancestorOfAncestor) {
                    ancestorOfAncestor.classList.add('show')
                    const toggle = ancestorOfAncestor.previousElementSibling
                    if (toggle) toggle.classList.add('active')
                }
            }
        }
    }

    const removeActivation = items => {
        const actiItems = items.filter(x => x.classList.contains('active'))

        actiItems.forEach(item => {
            if (item.classList.contains('menu-link')) {
                item.setAttribute('aria-expanded', false)
                if (item.nextElementSibling) {
                    item.nextElementSibling.classList.remove('show')
                }
            }

            if (item.classList.contains('nav-link')) {
                if (item.nextElementSibling) {
                    item.nextElementSibling.classList.remove('show')
                }
                item.setAttribute('aria-expanded', false)
            }

            item.classList.remove('active')
        })
    }

    return (
        <React.Fragment>
            {(navData || []).map((item, key) => (
                <React.Fragment key={key}>
                    {item.isHeader ? (
                        <li className='menu-title'>
                            <span data-key='t-menu'>{props.t(item.label)}</span>
                        </li>
                    ) : item.subItems ? (
                        <li className='nav-item'>
                            <Link
                                onClick={item.click}
                                className='nav-link menu-link'
                                to={item.link || '/#'}
                                data-bs-toggle='collapse'
                            >
                                <i className={item.icon}></i>
                                <span data-key='t-apps'>
                                    {props.t(item.label)}
                                </span>
                                {item.badgeName && (
                                    <span
                                        className={`badge badge-pill bg-${item.badgeColor}`}
                                        data-key='t-new'
                                    >
                                        {item.badgeName}
                                    </span>
                                )}
                            </Link>
                            <Collapse
                                className='menu-dropdown'
                                isOpen={item.stateVariables}
                                id='sidebarApps'
                            >
                                <ul className='nav nav-sm flex-column'>
                                    {(item.subItems || []).map(
                                        (subItem, key) => (
                                            <React.Fragment key={key}>
                                                {!subItem.isChildItem ? (
                                                    <li className='nav-item'>
                                                        <Link
                                                            to={
                                                                subItem.link ||
                                                                '/#'
                                                            }
                                                            className='nav-link'
                                                        >
                                                            {props.t(
                                                                subItem.label,
                                                            )}
                                                            {subItem.badgeName && (
                                                                <span
                                                                    className={`badge badge-pill bg-${subItem.badgeColor}`}
                                                                    data-key='t-new'
                                                                >
                                                                    {
                                                                        subItem.badgeName
                                                                    }
                                                                </span>
                                                            )}
                                                        </Link>
                                                    </li>
                                                ) : (
                                                    <li className='nav-item'>
                                                        <Link
                                                            onClick={
                                                                subItem.click
                                                            }
                                                            className='nav-link'
                                                            to='/#'
                                                            data-bs-toggle='collapse'
                                                        >
                                                            {props.t(
                                                                subItem.label,
                                                            )}
                                                            {subItem.badgeName && (
                                                                <span
                                                                    className={`badge badge-pill bg-${subItem.badgeColor}`}
                                                                    data-key='t-new'
                                                                >
                                                                    {
                                                                        subItem.badgeName
                                                                    }
                                                                </span>
                                                            )}
                                                        </Link>
                                                        <Collapse
                                                            className='menu-dropdown'
                                                            isOpen={
                                                                subItem.stateVariables
                                                            }
                                                            id='sidebarEcommerce'
                                                        >
                                                            <ul className='nav nav-sm flex-column'>
                                                                {(
                                                                    subItem.childItems ||
                                                                    []
                                                                ).map(
                                                                    (
                                                                        childItem,
                                                                        key,
                                                                    ) => (
                                                                        <React.Fragment
                                                                            key={
                                                                                key
                                                                            }
                                                                        >
                                                                            {!childItem.childItems ? (
                                                                                <li className='nav-item'>
                                                                                    <Link
                                                                                        to={
                                                                                            childItem.link ||
                                                                                            '/#'
                                                                                        }
                                                                                        className='nav-link'
                                                                                    >
                                                                                        {props.t(
                                                                                            childItem.label,
                                                                                        )}
                                                                                    </Link>
                                                                                </li>
                                                                            ) : (
                                                                                <li className='nav-item'>
                                                                                    <Link
                                                                                        to='/#'
                                                                                        className='nav-link'
                                                                                        onClick={
                                                                                            childItem.click
                                                                                        }
                                                                                        data-bs-toggle='collapse'
                                                                                    >
                                                                                        {props.t(
                                                                                            childItem.label,
                                                                                        )}
                                                                                    </Link>
                                                                                    <Collapse
                                                                                        className='menu-dropdown'
                                                                                        isOpen={
                                                                                            childItem.stateVariables
                                                                                        }
                                                                                        id='sidebaremailTemplates'
                                                                                    >
                                                                                        <ul className='nav nav-sm flex-column'>
                                                                                            {(
                                                                                                childItem.childItems ||
                                                                                                []
                                                                                            ).map(
                                                                                                (
                                                                                                    subChildItem,
                                                                                                    key,
                                                                                                ) => (
                                                                                                    <li
                                                                                                        className='nav-item'
                                                                                                        key={
                                                                                                            key
                                                                                                        }
                                                                                                    >
                                                                                                        <Link
                                                                                                            to={
                                                                                                                subChildItem.link
                                                                                                            }
                                                                                                            className='nav-link'
                                                                                                            data-key='t-basic-action'
                                                                                                        >
                                                                                                            {props.t(
                                                                                                                subChildItem.label,
                                                                                                            )}
                                                                                                        </Link>
                                                                                                    </li>
                                                                                                ),
                                                                                            )}
                                                                                        </ul>
                                                                                    </Collapse>
                                                                                </li>
                                                                            )}
                                                                        </React.Fragment>
                                                                    ),
                                                                )}
                                                            </ul>
                                                        </Collapse>
                                                    </li>
                                                )}
                                            </React.Fragment>
                                        ),
                                    )}
                                </ul>
                            </Collapse>
                        </li>
                    ) : (
                        <li className='nav-item'>
                            <Link
                                className='nav-link menu-link'
                                to={item.link || '/#'}
                            >
                                <i className={item.icon}></i>
                                <span>{props.t(item.label)}</span>
                                {item.badgeName && (
                                    <span
                                        className={`badge badge-pill bg-${item.badgeColor}`}
                                        data-key='t-new'
                                    >
                                        {item.badgeName}
                                    </span>
                                )}
                            </Link>
                        </li>
                    )}
                </React.Fragment>
            ))}
        </React.Fragment>
    )
}

VerticalLayout.propTypes = {
    location: PropTypes.object,
    t: PropTypes.any,
}

export default withRouter(withTranslation()(VerticalLayout))

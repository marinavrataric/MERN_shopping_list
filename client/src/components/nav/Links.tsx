import React, { useState, useContext } from 'react'
import { Nav, NavItem, Navbar, NavbarBrand, NavbarToggler, Collapse, Container } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import Register from '../Register'
import Login from '../Login'
import Logout from '../Logout'

function Links() {

    const { modalRegister, setModalRegister, modalLogin, setModalLogin, state, dispatch, modalLogout, setModalLogout } = useContext(AppContext)

    const [isCollapsed, setIsCollapsed] = useState(false)

    const toggleCollapse = () => setIsCollapsed(!isCollapsed)
    const toggleModalReg = () => setModalRegister(!modalRegister)
    const toggleModalLogin = () => !state.isAuthenticated && setModalLogin(!modalLogin)
    const toggleModalLogout = () => state.isAuthenticated && setModalLogout(!modalLogout)

    return (
        <Navbar color='dark' dark expand="sm">
            <Container>
                <NavbarBrand className="mr-auto">React App</NavbarBrand>
                <NavbarToggler onClick={toggleCollapse} />
                <Collapse isOpen={isCollapsed} navbar>
                    <Nav className="ml-auto">
                        <NavItem>
                            <NavLink to='/' id='link'>Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to='/' id='link' onClick={toggleModalReg}>Register</NavLink>
                            <Register />
                        </NavItem>
                        <NavItem>
                            <NavLink to='/' id='link' onClick={toggleModalLogin}>Log in</NavLink>
                            <Login />
                        </NavItem>
                        <NavItem>
                            <NavLink to='/' id='link' onClick={toggleModalLogout}>Log out</NavLink>
                            <Logout />
                        </NavItem>
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    )
}

export default Links

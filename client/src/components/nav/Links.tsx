import React, { useState, useContext, useEffect } from 'react'
import { Nav, NavItem, Navbar, NavbarBrand, NavbarToggler, Collapse, Container } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import Register from '../Register'
import Login from '../Login'
import Logout from '../Logout'

function Links() {

    const { modalRegister, setModalRegister, modalLogin, setModalLogin, state, modalLogout, setModalLogout } = useContext(AppContext)

    const [isCollapsed, setIsCollapsed] = useState(false)
    const [name, setname] = useState('')

    const toggleCollapse = () => setIsCollapsed(!isCollapsed)
    const toggleModalReg = () => setModalRegister(!modalRegister)
    const toggleModalLogin = () => (!state.isAuthenticated) && setModalLogin(!modalLogin)
    const toggleModalLogout = () => state.isAuthenticated && setModalLogout(!modalLogout)

    useEffect(() => {
        state.user && setname(state.user.name)
    }, [state])

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
                            <NavLink to='/' id='link' onClick={toggleModalLogin}>
                                {state.isAuthenticated ? `Welcome ${name}` : 'Log in'}
                            </NavLink>
                            <Login />
                        </NavItem>
                        <NavItem>
                            <NavLink to='/' id='link' onClick={toggleModalLogout}> {state.isAuthenticated && 'Log out'}</NavLink>
                            <Logout />
                        </NavItem>
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    )
}

export default Links

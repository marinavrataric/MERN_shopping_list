import React, { useState, useContext } from 'react'
import { Nav, NavItem, Navbar, NavbarBrand, NavbarToggler, Collapse, Container } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import Register from '../Register'
import Login from '../Login'

function Links() {

    const { modalRegister, setModalRegister, modalLogin, setModalLogin } = useContext(AppContext)

    const [isCollapsed, setIsCollapsed] = useState(false)

    const toggleCollapse = () => setIsCollapsed(!isCollapsed)
    const toggleModalReg = () => setModalRegister(!modalRegister)
    const toggleModalLogin = () => setModalLogin(!modalLogin)
    

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
                            <NavLink to='/' id='link' onClick={toggleModalLogin}>Login</NavLink>
                            <Login />
                        </NavItem>
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    )
}

export default Links

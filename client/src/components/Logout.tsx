import React, { useContext } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalFooter
} from 'reactstrap'
import { AppContext } from './context/AppContext'

function Logout() {

    const { modalLogout, setModalLogout, dispatch, state } = useContext(AppContext)

    const toggle = () => setModalLogout(!modalLogout)

    const handleLogout = (e: any) => {
        e.preventDefault()

        if (state.isAuthenticated) {
            dispatch({ type: 'LOGOUT_SUCCESS' })
            setModalLogout(false)
        }
    }

    return (
        <Modal isOpen={modalLogout} toggle={toggle}>
            <ModalHeader>Are you sure you want to log out?</ModalHeader>
            <ModalFooter>
                <Button color='success' onClick={handleLogout}>Log out</Button>
                <Button onClick={() => setModalLogout(false)}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

export default Logout
import React, { useState, useContext, useEffect } from 'react'
import {
    FormGroup,
    Form,
    Label,
    Input,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Alert
} from 'reactstrap'
import { AppContext } from './context/AppContext'
import axios from "../../../../../../Documents/React projekti/loginfull/client/node_modules/axios"

function Register() {

    const { modalRegister, setModalRegister, dispatch, state } = useContext(AppContext)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState<null | string>(null)

    const toggle = () => setModalRegister(!modalRegister)

    const handleRegister = (e: any) => {
        e.preventDefault()

        const config: any = { header: { 'Content-Type': 'application/json' } }
        const body = { name, email, password }

        axios
            .post('/api/users', body, config)
            .then(res => dispatch({ type: 'REGISTER_SUCCESS', payload: res.data }))
            .catch(err => dispatch({ type: 'REGISTER_FAIL', payload: err.response.data }))
    }

    useEffect(() => {
        if(state.msg !== undefined) setMsg(state.msg)
        else setMsg(null)

        //if registered close modal
        if(state.isAuthenticated) setModalRegister(false)
    }, [state])

    return (
        <Modal isOpen={modalRegister} toggle={toggle}>
            <ModalHeader>Register here</ModalHeader>
            <ModalBody>
                <Form>
                    {msg ? <Alert color='danger'>{state.msg}</Alert> : null}
                    <FormGroup>
                        <Label>Full Name</Label>
                        <Input type='text' onChange={(e: any) => setName(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Email</Label>
                        <Input type='text' onChange={(e: any) => setEmail(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Password</Label>
                        <Input type='password' onChange={(e: any) => setPassword(e.target.value)} />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color='success' onClick={handleRegister}>Register</Button>
                <Button onClick={() => setModalRegister(false)}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

export default Register
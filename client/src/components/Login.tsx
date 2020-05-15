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

function Login() {

    const { modalLogin, setModalLogin, state, dispatch } = useContext(AppContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState<null | string>(null)

    const toggle = () => setModalLogin(!modalLogin)

    const handleLogin = (e: any) => {
        e.preventDefault()

        const config: any = { header: { 'Content-Type': 'application/json' } }
        const body = { email: email, password: password }

        axios
            .post('/api/auth', body, config)
            .then((res) => {
                dispatch({ type: 'LOGIN_SUCCESS', payload: res.data })
            })
            .catch(err => {
                dispatch({ type: 'LOGIN_FAIL', payload: err.response.data })
            })
    }

    useEffect(() => {
        if (state.msg !== undefined) setMsg(state.msg)
        else setMsg(null)

        // if auth close modal
        if (state.isAuthenticated) setModalLogin(false)
    }, [state])

    return (
        <Modal isOpen={modalLogin} toggle={toggle}>
            <ModalHeader>Login here</ModalHeader>
            <ModalBody>
                <Form>
                    {msg ? <Alert color='danger'>{state.msg}</Alert> : null}
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
                <Button color='success' onClick={handleLogin}>Login</Button>
                <Button onClick={() => setModalLogin(false)}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

export default Login
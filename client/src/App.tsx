import React, { useState, useEffect, useReducer } from 'react'
import Navigation from './components/nav/Navigation'
import { AppContext } from './components/context/AppContext'
import axios from "../../../../../../Documents/React projekti/loginfull/client/node_modules/axios"

function App() {

    const [modalRegister, setModalRegister] = useState(false)
    const [modalLogin, setModalLogin] = useState(false)
    const [modalLogout, setModalLogout] = useState(false)

    const initState = {
        token: localStorage.getItem('token'),
        user: null,
        isAuthenticated: null,
        msg: null,
        msg_token: null
    }

    const [state, dispatch] = useReducer((state: any, action: any) => {
        switch (action.type) {
            case 'USER_LOADED':
                return {
                    ...state,
                    isAuthenticated: true,
                    ...action.payload
                }
            case 'REGISTER_SUCCESS':
            case 'LOGIN_SUCCESS':
                localStorage.setItem('token', action.payload.token)
                return {
                    ...state,
                    token: action.payload.token,
                    ...action.payload.user,
                    isAuthenticated: true,
                    msg: action.payload.msg,
                    msg_token: null
                }
            case 'LOGOUT_SUCCESS':
                localStorage.removeItem('token')
                return {
                    ...state,
                    token: null,
                    user: null,
                    isAuthenticated: false,
                }
            case 'LOGIN_FAIL':
            case 'REGISTER_FAIL':
                return {
                    ...state,
                    token: null,
                    user: null,
                    isAuthenticated: false,
                    msg: action.payload.msg,
                }
            case 'AUTH_ERROR':
                return {
                    ...state,
                    msg_token: action.payload
                }
            default:
                return state
        }
    }, initState)

    useEffect(() => {
        const token = localStorage.getItem('token')
        const config = {
            headers: { "x-auth-token": `${token}` }
        }
        axios
            .get('/api/auth/user', config)
            .then(res => dispatch({ type: 'USER_LOADED', payload: res.data }))
            .catch(err => dispatch({ type: 'AUTH_ERROR', payload: err.response.data.msg }))
    }, [state.isAuthenticated])

    return (
        <div>
            <AppContext.Provider value={{
                modalRegister, setModalRegister,
                modalLogin, setModalLogin,
                modalLogout, setModalLogout,
                state, dispatch
            }}>
                <Navigation />
            </AppContext.Provider>
        </div>
    )
}

export default App
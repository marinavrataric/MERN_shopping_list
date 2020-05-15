import { createContext } from "react";

export const AppContext = createContext({
    modalRegister: false,
    setModalRegister: (modalRegister: boolean) => { },
    modalLogin: false,
    setModalLogin: (modalLogin: boolean) => { },
    modalLogout: false,
    setModalLogout: (modalLogout: boolean) => { },
    state: {
       user: {},
       token: '',
       msg: '',
       isAuthenticated: false,
       msg_token: ''
    },
    dispatch: (state: {}) => { }
})
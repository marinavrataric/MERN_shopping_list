import { createContext } from "react";

export const AppContext = createContext({
    modalRegister: false,
    setModalRegister: (modalRegister: boolean) => {},
    modalLogin: false,
    setModalLogin: (modalLogin: boolean) => {}
})
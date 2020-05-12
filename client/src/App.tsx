import React, { useState } from 'react'
import Navigation from './components/nav/Navigation'
import { AppContext } from './components/context/AppContext'

function App() {

    const [modalRegister, setModalRegister] = useState(false)
    const [modalLogin, setModalLogin] = useState(false)

    return (
        <div>
            <AppContext.Provider value={{
                modalRegister, setModalRegister,
                modalLogin, setModalLogin
            }}>
                <Navigation />
            </AppContext.Provider>
        </div>
    )
}

export default App

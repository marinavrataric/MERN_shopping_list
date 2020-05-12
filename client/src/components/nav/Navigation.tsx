import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import Links from './Links'
import Routes from './Routes'

function Navigation() {
    return (
        <div>
            <Router>
                <Links />
                <Routes />
            </Router>
        </div>
    )
}

export default Navigation
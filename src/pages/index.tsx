import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Box } from '@mui/material'
import Dashbaord from './components/Dashbaord'

const index = () => {
    return (
        <div>
            <Navbar />
            <Dashbaord />
            <Footer />
        </div>
    )
}

export default index
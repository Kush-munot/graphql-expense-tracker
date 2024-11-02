import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Box } from '@mui/material'
import Dashbaord from './components/Dashbaord'

const index = () => {
    return (
        <div>
            <Navbar />
            {/* <Box sx={{marginTop: '5.57rem', height:'calc(100vh - 28.625rem)'}}> */}
            <Dashbaord />
            {/* </Box> */}
            <Footer />
        </div>
    )
}

export default index
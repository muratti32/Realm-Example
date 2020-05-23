import React from 'react'
import { ImageBackground } from 'react-native'
import Box from './Box'
import image from './images/header-bg.png'
const Bg = ({ children, ...props }) => {
    return (
        <Box 
        source={image}
        as={ImageBackground}
        style={{ width: '100%', height: 199 }}
        {...props}
        >
        {children}
        </Box>
            

    )
}

export default Bg

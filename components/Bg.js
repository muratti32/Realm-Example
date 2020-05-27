import React from 'react'
import { ImageBackground } from 'react-native'
import Box from './Box'
import {vars,colors} from '../global_vars'
const Bg = ({ children, ...props }) => {
    return (
        <Box 
        backgroundColor={colors.mavi}
        style={{ width: '100%', height: 199}}
        {...props}
        >
        {children}
        </Box>
            

    )
}

export default Bg

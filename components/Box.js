import { View } from 'react-native'
import styled from 'styled-components';

import {
    compose,
    color,
    size,
    space,
    border,
    flexbox,
    borderRadius,
    shadow
} from 'styled-system'

const Box = styled(View)(
    compose(
        flexbox,
        space,
        border,
        color,
        size,
        borderRadius,
        shadow

    )
)

export default Box;
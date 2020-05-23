import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import {
  position,
  compose,
  color,
  size,
  space,
  flexbox,
  layout,
  borderRadius,
  shadow
} from 'styled-system'

const Button = styled(TouchableOpacity)(
  compose(
    position,
    flexbox,
    space,
    color,
    size,
    layout,
    borderRadius,
    shadow
  )
)

Button.defaultProps = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center'
}

export default Button

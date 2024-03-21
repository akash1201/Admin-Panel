import {
    IconButton,
    Flex,
    useColorModeValue,
    Text,
} from '@chakra-ui/react'
import {
    FiMenu,
} from 'react-icons/fi'
const Navbar = ({ onOpen, ...rest }) => {
    return (
        <Flex
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent="flex-start"
            {...rest}>
        </Flex>
    )
}
export default Navbar
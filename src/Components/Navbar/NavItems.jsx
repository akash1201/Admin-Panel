import {
    Box,
    Flex,
    Icon,
} from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
const NavItem = ({ icon, link, children, ...rest }) => {
    const location = useLocation();
    console.log(location.pathname)
    return (
        <Link to={`${link}`}
            as="a"
            href="#"
            style={{ textDecoration: 'none' }}
            _focus={{ boxShadow: 'none' }}>
            <Flex
                align="center"
                transition="all 0.2s linear"
                p="3"
                mx="4"
                role="group"
                cursor="pointer"
                bg={location.pathname === `${link}` ? 'cyan.400' : ''}
                color={location.pathname === `${link}` ? 'white' : ''}
                _hover={{
                    bg: location.pathname !== `${link}` ? 'gray.100' : ''
                }}
                {...rest}>
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"

                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    )
}

export default NavItem
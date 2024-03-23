import NavItem from "../Navbar/NavItems"
import { Box, CloseButton, Flex, useColorModeValue, Text } from '@chakra-ui/react'
import { FiHome,  FiStar, FiUser } from 'react-icons/fi'
const LinkItems = [
    { name: 'Home', icon: FiHome, link: '/' },
    { name: 'Users', icon: FiUser, link: '/users' },
    { name: 'Posts', icon: FiStar, link: '/posts' },
    { name: 'Events', icon: FiStar, link: '/events' },
]
const SidebarContent = ({ onClose, ...rest }) => {
    return (
        <Box
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    Admin Panel
                </Text>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {LinkItems.map((item) => (
                <NavItem key={item.name} icon={item.icon} link={item?.link}>
                    {item.name}
                </NavItem>
            ))}
        </Box>
    )
}

export default SidebarContent
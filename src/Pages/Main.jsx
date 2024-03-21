import MobileNav from "../Components/Navbar/MobileNav";
import Navbar from "../Components/Navbar/Navbar";
import SidebarContent from "../Components/Sidebar/SidebarContent";
import AllRoutes from "../Routes/AllRoutes";
import "../styles.css";
import {
    Box,
    useColorModeValue,
    Drawer,
    DrawerContent,
    useDisclosure,
} from '@chakra-ui/react'
const Main = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')} >
            <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }}>
                <Navbar display={{ base: 'none', md: 'flex' }} onOpen={onOpen} />
                <AllRoutes />
            </Box>
        </Box >
    );
}

export default Main






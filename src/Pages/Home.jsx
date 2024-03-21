import {
  chakra,
  Box,
  Flex,
  Image,
  Container,
  SimpleGrid
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { addTocart } from "../Redux/CartSlice";
import {
  FiShoppingCart
} from 'react-icons/fi'
const Home = () => {
  const data = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <Container maxW="7xl" p={{ base: 5, md: 12 }} margin="0 auto">
      <SimpleGrid
        gridTemplateColumns={["1fr", "1fr 1fr", "1fr 1fr 1fr "]}
        spacing={4}
      >
        {data.items.map((el, index) => (
          <Flex key={index} position="relative" bg="#edf3f8" alignItems="center" justifyContent="center" >
            <Box h={80} w={80} display="flex" alignItems="center" justifyContent="center" flexDirection="column" p={8} bg="white" _dark={{ bg: "gray.800" }} shadow="lg" rounded="lg" >
              <Image h="100%" w="100%" fit="cover" src={el.img} alt="NIKE AIR" />
            </Box>
            <chakra.button position="absolute" border='1px solid #dedede' top="2" right="7" px={2} py={1} bg="white" fontSize="xs" color="gray.900" fontWeight="bold" rounded="lg" textTransform="uppercase" _hover={{ bg: "gray.200" }} onClick={() => dispatch(addTocart(el))} >
              <FiShoppingCart />
            </chakra.button>
          </Flex>
        ))
        }
      </SimpleGrid >
    </Container >
  );
};

export default Home;

import {
  chakra,
  Box,
  Flex,
  Image,
  Container,
  SimpleGrid,
  Button
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { addTocart } from "../Redux/CartSlice";
import {
  FiShoppingCart
} from 'react-icons/fi'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import { useGetUsersMutation } from "../Redux/apis/mainApi";
import { useState } from "react";
import { useEffect } from "react";
const Home = () => {
  


  const dispatch = useDispatch();

  const [page, setPage] = useState(() => 1);
  const [pageLimit, setPageLimit] = useState(() => 10);

  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  
  const [
    getUsers,
    {
      data,
      isLoading,
      isSuccess,
      error,
      reset
    }
  ] = useGetUsersMutation();

  const fetchUsers = () => {
    getUsers({pageNo: page, pageLimit: pageLimit})
  }

  useEffect(() => {
    fetchUsers();
  }, [page, pageLimit]);

  useEffect(() => {
    if(isSuccess){
      console.log(data)
      setUsers(data?.data?.users);
      setTotal(data?.data?.total);
      reset();
    }else if(error){
      reset();
    }
  }, [isSuccess, error])

  return (
    <Container maxW="7xl" p={{ base: 5, md: 12 }} margin="0 auto">
       <TableContainer >
  <Table variant='simple' border="1px" borderColor="gray.200">
    {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
    <Thead>
      <Tr>
        <Th>Sl No</Th>
        <Th>Name</Th>
        <Th >Email</Th>
        <Th >Role</Th>
        <Th >Status</Th>
      </Tr>
    </Thead>
    <Tbody>

      {
        users?.map((item ,index) => (
          <Tr key={index+1} borderBottom="1px" borderColor="red">
          <Td>{index+1}</Td>
          <Td>{`${item?.firstName || ''} ${item?.lastName || ''}`}</Td>
          <Td>{item?.email || ''}</Td>
          <Td>{item?.role == 1 ? 'Admin' : 'User'}</Td>
          <Td>{item?.isActive == 1 ? 'Active' : 'Inactive'}</Td>
        </Tr>
        ))
      }

     
    
    </Tbody>
  
  </Table>
</TableContainer>

<Box>
                  <Flex gap="10px">
                    <Button
                      onClick={() => {
                        if (page > 1) {
                          setPage((prev) => prev - 1);
                        }
                      }}
                      disabled={page <= 1}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M10.3658 2.19925L9.33333 1.16675L3.5 7.00008L9.33333 12.8334L10.3658 11.8009L5.565 7.00008L10.3658 2.19925Z"
                          fill="black"
                        />
                      </svg>
                    </Button>
                    <Button
                      onClick={() => {
                        if (page <= parseInt(total/pageLimit)) {
                          setPage((prev) => prev + 1);
                        }
                      }}
                      disabled={page >= parseInt(total/pageLimit)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M3.63417 11.8009L4.66667 12.8334L10.5 7.00008L4.66667 1.16675L3.63417 2.19925L8.435 7.00008L3.63417 11.8009Z"
                          fill="black"
                        />
                      </svg>
                    </Button>
                  </Flex>
                </Box>
    </Container >
  );
};

export default Home;

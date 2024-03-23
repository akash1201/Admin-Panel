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
        import { useGetUsersMutation, useGetPostsMutation } from "../Redux/apis/mainApi";
        import { useState } from "react";
        import { useEffect } from "react";
        import { useNavigate } from 'react-router-dom'
import { getTitle } from "../helpers/utils";
        const Posts = () => {
          
        
        
          const dispatch = useDispatch();
         const navigate = useNavigate();
        
          const [page, setPage] = useState(() => 1);
          const [pageLimit, setPageLimit] = useState(() => 10);
        
          const [posts, setPosts] = useState([]);
          const [total, setTotal] = useState(0);
          
          const [
            getPosts,
            {
              data,
              isLoading,
              isSuccess,
              error,
              reset
            }
          ] = useGetPostsMutation();
        
          const fetchPosts = () => {
          getPosts({pageNo: page, pageLimit: pageLimit})
          }
        
          useEffect(() => {
          fetchPosts();
          }, [page, pageLimit]);
        
          useEffect(() => {
            if(isSuccess){
              console.log(data)
              setPosts(data?.data?.posts);
              setTotal(data?.data?.total);
              reset();
            }else if(error){
              reset();
            }
          }, [isSuccess, error])

          const navigateToPostDetails = (post) => {
                    navigate(`/add-post/${post?._id}`)
          }
        
          return (
            <Container maxW="7xl" p={{ base: 5, md: 12 }} margin="0 auto">
                    <Flex justifyContent={'right'} alignItems='right' mb='10px'>
                              <Box>
                                        <Button
                                          background={'#0BC5EA'}
                                          color='white'
                                          onClick={(e) => {
                                                  navigate('/add-post')
                                          }}
                                        >New post</Button>
                              </Box>

                    </Flex>
               <TableContainer >
          <Table variant='simple' border="1px" borderColor="gray.200">
          
            <Thead>
              <Tr>
                <Th>Sl No</Th>
                <Th>Title</Th>
                <Th >Status</Th>
                <Th >Action</Th>
              </Tr>
            </Thead>
            <Tbody>
                    
        
              {
                posts?.map((item ,index) => (
                  <Tr key={index+1} borderBottom="1px" cursor={'pointer'} onClick={() => navigateToPostDetails(item)}>
                  <Td>{index+1}</Td>
                  <Td>{getTitle(item?.description)}</Td>
                  <Td>{'Active'}</Td>
                  <Td>{'Coming soon'}</Td>
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
        
        export default Posts;
        
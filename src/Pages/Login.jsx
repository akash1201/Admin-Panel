'use client'

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    FormErrorMessage,
    useToast
} from '@chakra-ui/react'
import { Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setter } from '../helpers/storageHelpers';

import * as Yup from "yup";
import { useLoginUserMutation } from '../Redux/apis/authApi';
import { updateUser } from '../Redux/AuthSlice';

const Login = () => {

    const toast = useToast();
    const dispatch = useDispatch();

    const [
        loginUser,
        {
            data,
            isLoading,
            isSuccess,
            error,
            reset
        }
    ] = useLoginUserMutation();

    const initialValues = {
        email: "",
        password: "",
      };
    

    const SigninSchema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid Email")
          .required("Please enter your email address"),
        password: Yup.string().required("Please enter your password"),
      });

      const onSubmit = (values) => {
        loginUser({
            "email": values?.email,
            "password": values?.password
        })
      }

      useEffect(() => {
        if(isSuccess){
            console.log(data)
            setter('user', JSON.stringify(data?.data));
            dispatch(updateUser(data?.data))
            toast({
                title: "Success!!",
                description: `Welcome ${data?.data?.name || ''}`,
                status: "success",
                duration: 4500,
                isClosable: true,
            })

          reset();
        }else if(error){
            console.log(error);
            toast({
                title: "Err!!",
                description: error?.data?.message || 'Something went wrong!',
                status: "error",
                duration: 4500,
                isClosable: true,
            })
            reset();
        }
      }, [isSuccess, error])



    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            width="100%"
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>

                <Box
                    w="50vh"
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                <Formik
                initialValues={initialValues}
                enableReinitialize
                validationSchema={SigninSchema}
                onSubmit={onSubmit}
            >
            {({ errors, touched, values, setFieldValue }) => (
                 <Form>
                     <Stack spacing={4}>
                  <FormControl id="email" isInvalid={errors?.email}>
                      <FormLabel>Email address</FormLabel>
                      <Input type="email" value={values?.email} onChange={(e) => {setFieldValue('email', e?.target?.value)}}/>
                      {errors?.email && <FormErrorMessage>{errors?.email}</FormErrorMessage>}
                  </FormControl>
                  <FormControl id="password" isInvalid={errors?.password}>
                      <FormLabel>Password</FormLabel>
                      <Input type="password" value={values?.password} onChange={(e) => {setFieldValue('password', e?.target?.value)}}/>
                      {errors?.password && <FormErrorMessage>{errors?.password}</FormErrorMessage>}
                  </FormControl>
                  <Stack spacing={10}>
                      {/* <Stack
                          direction={{ base: 'column', sm: 'row' }}
                          align={'start'}
                          justify={'space-between'}>
                          <Checkbox>Remember me</Checkbox>
                          <Text color={'blue.400'}>Forgot password?</Text>
                      </Stack> */}
                      <Button
                          bg={'blue.400'}
                          color={'white'}
                          type='submit'
                          _hover={{
                              bg: 'blue.500',
                          }}
                          isDisabled={isLoading}
                          isLoading={isLoading}
                          >
                          Sign in
                      </Button>
                  </Stack>
              </Stack>
                 </Form>
            )}
            </Formik>
                  
                </Box>
            </Stack>
        </Flex>
    )
}

export default Login
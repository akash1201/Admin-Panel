import {
          chakra,
          Box,
          Flex,
          Image,
          Container,
          SimpleGrid,
          Button,
          FormControl,
          FormLabel,
          Input,
          FormErrorMessage,
          useToast
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { Form, Formik } from 'formik';
import * as Yup from "yup";

import ContentInput from "../Components/RichTextEditor/ContentInput";
import { useState } from "react";
import { useRef } from "react";
import { useCreatePostMutation, useGetPostMutation, useGetPostsMutation } from "../Redux/apis/mainApi";
import { useEffect } from "react";
import { useNavigate, useSearchParams, useParams } from 'react-router-dom'
       
        const AddPost = () => {

          const toast = useToast();

          const { postId } = useParams();

          const navigate = useNavigate();

          const [initialValues, setinitialValues] = useState({
                    description: {},
                  });
                  let editorJs = useRef(null);
                  let formRef = useRef(null);

                  const [
                    createPost,
                    {
                              data,
                              isSuccess,
                              error,
                              isLoading,
                              reset
                    }
                  ] = useCreatePostMutation();
                
            
                const SigninSchema = Yup.object().shape({
                    title: Yup.object(),
                    description: Yup.object(),
                  });
            
                  const onSubmit = async (values) => {
                   let data = await editorJs?.current?.save();
                   if(data?.blocks?.length == 0){
                    toast({
                              title: "Err!!",
                              description: 'Post cannot be empty',
                              status: "error",
                              duration: 4500,
                              isClosable: true,
                          })
                   }else{
                         let obj = {
                              description: data
                          }
                          if(postId){
                              obj['id'] = postId;
                          }
                          createPost(obj);
                   }
                  }


                  useEffect(() => {
                    if(isSuccess){
                              toast({
                                        title: "Err!!",
                                        description: 'Post created',
                                        status: "success",
                                        duration: 4500,
                                        isClosable: true,
                                    })
                              navigate('/posts')
                      reset();
                    }else if(error){
                      reset();
                    }
                  }, [isSuccess, error])

                  //get post details

                  const [
                    getPostDetails,
                    {
                              data: postDetails,
                              isLoading: postLoading,
                              error: postError,
                              isSuccess: postSuccess,
                              reset: postReset
                    }
                  ] = useGetPostMutation();

                  const [details, setDetails] = useState(null);

                  useEffect(() => {
                    if(postId){
                              getPostDetails({
                                        id: postId
                              })
                    }
                  }, [postId]);

                  useEffect(() => {
                    if(postSuccess){
                              postReset();
                              setDetails(postDetails?.data?.post);
                    }
                  }, [postSuccess, postError])



                  //get post details

          
        
          return (
            <Container maxW="7xl" p={{ base: 5, md: 12 }} margin="0 auto">
                    <Formik
                initialValues={initialValues}
                enableReinitialize
                validationSchema={SigninSchema}
                onSubmit={onSubmit}
                innerRef={formRef}
            >
            {({ errors, touched, values, setFieldValue }) => (
                 <Form>
                     <FormControl id="title" isInvalid={errors?.description}>
                              <ContentInput editorJs={editorJs} details={details}/>
                              {errors?.description && <FormErrorMessage>{errors?.description}</FormErrorMessage>}
                     </FormControl>
                     <Flex>
                              <Box margin='0 auto'>
                                        <Button
                                         type={'submit'}
                                         background={'#0BC5EA'}
                                         color='white'
                                         isDisabled={isLoading}
                                         isLoading={isLoading}
                                        >{postId ? 'Update' : 'Post'}</Button>
                              </Box>
                     </Flex>
                 </Form>
            )}
            </Formik>
                  
            </Container >
          );
        };
        
        export default AddPost;
        
import React, { useEffect, useContext } from 'react'
import { FaCheck } from 'react-icons/fa';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { useMutation } from '@tanstack/react-query';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Button from '../components/Button';
import Input from '../components/Input';
import Footer from '../sections/Footer';
import HeaderSub from '../sections/HeaderSub';
import Section from '../sections/Section';
import { axiosHttpClient } from '../api/api';
import AuthContext from '../contexts/AuthContext';


interface MyFormValues {
    username: string;
    password: string;
}

const LogIn = () => {

    const navigate = useNavigate();
    //@ts-ignore
    const { auth } = useContext(AuthContext);

    // object validation form
    const SignInSchema = Yup.object({
        username: Yup.string().required(),
        password: Yup.string().required()
    });

    // form fields initializer
    const initialValues: MyFormValues = { username: '', password: '' };

    const mutation = useMutation(async (login: MyFormValues) => {
        return await axiosHttpClient.post(`/auth/signin/`, login
        );
    },
        ({
            onSuccess: async (data) => {

                localStorage.setItem('token', JSON.stringify(data.data));
                window.location.replace("/appointment");
                toast.success("You have been successfully logged in!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    progress: undefined
                });

            },
            onError: (error, variable) => {
                //@ts-ignore
                toast.error(error.response.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    progress: undefined
                });
            }
        }));


    return (
        <div className="flex flex-col h-screen">
            <HeaderSub />

            <main className='grow' >

                <Section title='Enter your log in info'>
                    <div className="w-full pt-6 flex md:flex-row flex-col content-center justify-center">
                        {/* container start */}
                        <div className='text-left flex-1 text-slate-500'>
                            <p className='mb-2'><FaCheck className="inline" /> Access your appointments</p>
                            <p className='mb-2'><FaCheck className="inline" /> View your appointment history</p>
                            <p className='mb-2'><FaCheck className="inline" /> Manage all your current and future appointments in a single place</p>
                        </div>

                        {/* Formik stuff */}
                        <Formik
                            initialValues={initialValues}
                            validationSchema={SignInSchema}
                            onSubmit={async (values) => {
                                await mutation.mutateAsync({
                                    username: values.username,
                                    password: values.password
                                });
                            }}>

                            {({ errors, touched }) => (

                                <Form className='text-center flex flex-1 flex-col mx-1 mt-5 md:mt-0'>
                                    <Input
                                        placeholder='Enter your username'
                                        type={"text"}
                                        name={"username"}
                                        className="border-[1px] border-slate-400 border-solid p-3 mb-1 text-center"
                                        touch={touched.username}
                                        error={errors.username}
                                        errMessage={errors.username}
                                    />

                                    <Input
                                        placeholder='Enter your password'
                                        type={"password"}
                                        name={"password"}
                                        className="border-[1px] border-slate-400 border-solid p-3 mb-2 text-center"
                                        touch={touched.password}
                                        error={errors.password}
                                        errMessage={errors.password}
                                    />

                                    <div className="flex flex-col gap-2 justify-center content-center">
                                        <Button title={'Log In'} type='submit' />
                                        <Link to={'/register'} className={"w-full flex-1 hover:text-blue-500"}>Create an account</Link>
                                    </div>

                                </Form>
                            )}

                        </Formik>
                        {/* container ends */}
                    </div>

                </Section>
            </main>
            <Footer />
        </div>
    )
}

export default LogIn;
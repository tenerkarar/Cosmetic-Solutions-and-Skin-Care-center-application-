import react from 'react'
import { FaCheck } from 'react-icons/fa';
import Button from '../components/Button';
import Footer from '../sections/Footer';
import HeaderSub from '../sections/HeaderSub';
import Section from '../sections/Section';

import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Input from '../components/Input';
import { useMutation } from '@tanstack/react-query';
import { axiosHttpClient } from '../api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface formShape {
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    password: string;
    repeat_password: string;
    phone: string;
    address: string;
    city: string;
    zip: string;
    state: string;
}

const Register = () => {

    const mutation = useMutation(async (signUpUser: formShape) => {
        return await axiosHttpClient.post(`/auth/signup`, signUpUser);
    }, {
        onSuccess: (data) => {
            toast.success("Your account has been successfully created!");
        },
        onError: (error) => {
            //@ts-ignore
            toast.error(error.response.data.message, {
                position: toast.POSITION.TOP_RIGHT
            })
        }
    });

    const validationSchema = Yup.object({
        firstname: Yup.string().required(),
        lastname: Yup.string().required(),
        email: Yup.string().email().required(),
        username: Yup.string().required(),

        password: Yup.string().required('No password provided.')
            .min(8, 'Password is too short - should be 8 chars minimum.')
            .matches(/(?=.*[a-z])+(?=.*[A-Z])+(?=.*[0-9])+/, 'Invalid password! at least 1 Uppercase letter, 1 lowercase letter and 1 digit'),
        repeat_password: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),

        phone: Yup.number().min(10, `Phone # can't have less than 10 digits`).required(),
        address: Yup.string().required(),
        city: Yup.string().required(),
        zip: Yup.number().min(5).required(),
        state: Yup.string().required()
    });

    // init 
    const initialValues: formShape = {
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        repeat_password: '',
        phone: '',
        address: '',
        city: '',
        zip: '',
        state: ''
    };



    return (
        <div className="flex flex-col h-screen">
            <HeaderSub />

            <main className="grow">
                <Section title={`Create a free account`}>
                    <div className="w-full pt-6 flex flex-row content-center justify-center">

                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={async (values, { resetForm }) => {
                                console.log(values);
                                await mutation.mutateAsync({
                                    firstname: values.firstname,
                                    lastname: values.lastname,
                                    username: values.username,
                                    email: values.email,
                                    password: values.password,
                                    repeat_password: values.repeat_password,
                                    phone: values.phone,
                                    address: values.address,
                                    city: values.city,
                                    zip: values.zip,
                                    state: values.state
                                });
                            }}>

                            {({ errors, touched }) => (

                                <Form className='text-center flex flex-1 md:px-20 flex-col mx-1 '>
                                    <div className={"flex md:flex-row flex-col w-full content-between justify-between gap-2 md:gap-2"}>

                                        <Input
                                            placeholder='Firstname'
                                            type={"text"}
                                            name={"firstname"}
                                            error={errors.firstname}
                                            touch={touched.firstname}
                                            errMessage={errors.firstname}
                                        />

                                        <Input
                                            placeholder='Lastname'
                                            type={"text"}
                                            name={"lastname"}
                                            error={errors.lastname}
                                            touch={touched.lastname}
                                            errMessage={errors.lastname}
                                        />

                                    </div>

                                    <Input
                                        placeholder='Email'
                                        type={"email"}
                                        name={"email"}
                                        error={errors.email}
                                        touch={touched.email}
                                        errMessage={errors.email}
                                    />

                                    <Input
                                        placeholder='Username'
                                        type={"text"}
                                        name={"username"}
                                        error={errors.username}
                                        touch={touched.username}
                                        errMessage={errors.username}
                                    />

                                    <div className={"flex md:flex-row flex-col content-between justify-between gap-2 md:gap-2"}>

                                        <Input
                                            placeholder='Enter your password'
                                            type={"password"}
                                            name={"password"}
                                            error={errors.password}
                                            touch={touched.password}
                                            errMessage={errors.password}
                                        />

                                        <Input
                                            placeholder='Re-Enter your password'
                                            type={"password"}
                                            name={"repeat_password"}
                                            error={errors.repeat_password}
                                            touch={touched.repeat_password}
                                            errMessage={errors.repeat_password}
                                        />
                                    </div>

                                    <Input
                                        placeholder='Phone number'
                                        type={"tel"}
                                        name={"phone"}
                                        error={errors.phone}
                                        touch={touched.phone}
                                        errMessage={errors.phone}
                                    />

                                    <Input
                                        placeholder='Address'
                                        type={"text"}
                                        name={"address"}
                                        error={errors.address}
                                        touch={touched.address}
                                        errMessage={errors.address}
                                    />

                                    <div className={"flex md:flex-row flex-col content-between justify-between gap-2 md:gap-2"}>
                                        <Input
                                            placeholder='City'
                                            type={"text"}
                                            name={"city"}
                                            error={errors.city}
                                            touch={touched.city}
                                            errMessage={errors.city}
                                        />

                                        <Input
                                            placeholder='Zip code'
                                            type={"text"}
                                            name={"zip"}
                                            error={errors.zip}
                                            touch={touched.zip}
                                            errMessage={errors.zip}
                                        />

                                    </div>

                                    <Field
                                        placeholder='State'
                                        name={"state"}
                                        as='select'
                                        className="border-[1px] border-slate-400 border-solid p-3 mb-1 text-center"
                                    >

                                        {/* start states */}
                                        <option value="AL">Alabama</option>
                                        <option value="AK">Alaska</option>
                                        <option value="AZ">Arizona</option>
                                        <option value="AR">Arkansas</option>
                                        <option value="CA">California</option>
                                        <option value="CO">Colorado</option>
                                        <option value="CT">Connecticut</option>
                                        <option value="DE">Delaware</option>
                                        <option value="DC">District Of Columbia</option>
                                        <option value="FL">Florida</option>
                                        <option value="GA">Georgia</option>
                                        <option value="HI">Hawaii</option>
                                        <option value="ID">Idaho</option>
                                        <option value="IL">Illinois</option>
                                        <option value="IN">Indiana</option>
                                        <option value="IA">Iowa</option>
                                        <option value="KS">Kansas</option>
                                        <option value="KY">Kentucky</option>
                                        <option value="LA">Louisiana</option>
                                        <option value="ME">Maine</option>
                                        <option value="MD">Maryland</option>
                                        <option value="MA">Massachusetts</option>
                                        <option value="MI">Michigan</option>
                                        <option value="MN">Minnesota</option>
                                        <option value="MS">Mississippi</option>
                                        <option value="MO">Missouri</option>
                                        <option value="MT">Montana</option>
                                        <option value="NE">Nebraska</option>
                                        <option value="NV">Nevada</option>
                                        <option value="NH">New Hampshire</option>
                                        <option value="NJ">New Jersey</option>
                                        <option value="NM">New Mexico</option>
                                        <option value="NY">New York</option>
                                        <option value="NC">North Carolina</option>
                                        <option value="ND">North Dakota</option>
                                        <option value="OH">Ohio</option>
                                        <option value="OK">Oklahoma</option>
                                        <option value="OR">Oregon</option>
                                        <option value="PA">Pennsylvania</option>
                                        <option value="RI">Rhode Island</option>
                                        <option value="SC">South Carolina</option>
                                        <option value="SD">South Dakota</option>
                                        <option value="TN">Tennessee</option>
                                        <option value="TX">Texas</option>
                                        <option value="UT">Utah</option>
                                        <option value="VT">Vermont</option>
                                        <option value="VA">Virginia</option>
                                        <option value="WA">Washington</option>
                                        <option value="WV">West Virginia</option>
                                        <option value="WI">Wisconsin</option>
                                        <option value="WY">Wyoming</option>
                                        {/* end states */}

                                    </Field>
                               
                                    <Button title='Create account' type='submit' />

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

export default Register;
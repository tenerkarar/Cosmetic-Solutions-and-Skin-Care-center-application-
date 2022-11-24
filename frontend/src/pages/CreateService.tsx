import React, { useEffect, useState, useContext } from 'react'
import { FaCalendarDay, FaClock, FaPlusCircle, FaTrash, FaRegWindowClose, FaClosedCaptioning } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Modal from 'react-modal';
import * as Yup from 'yup';

import AppointmentCard from '../components/AppointmentCard';
import Footer from '../sections/Footer';
import HeaderSub from '../sections/HeaderSub';
import Section from '../sections/Section';

import AuthContext from '../contexts/AuthContext';

import { axiosHttpClient } from '../api/api';
import { Field, Form, Formik, FormikHelpers, FormikValues } from 'formik';
import Input from '../components/Input';
import Button from '../components/Button';
import InputAs from '../components/InputAs';
import { toast } from 'react-toastify';
import ServiceCard from '../components/ServiceCard';
import IService from '../interfaces/IService';


interface IForm {
    name: string;
    description: string;
    price: number;
    points: number;
}


const CreateService = () => {

    Modal.setAppElement('#root');
    //@ts-ignore
    const { auth } = useContext(AuthContext);
    const queryClient = useQueryClient();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [serviceCount, setServiceCount] = useState<number>(0);

    // Get all the current user services
    const getServices = useQuery(['services'], async () => await axiosHttpClient.get('/service/'), {
        onSuccess: (data) => {
            setServiceCount(data.data.length);
        }
    });



    const newServiceMutation = useMutation(async (data: IForm) => await axiosHttpClient.post(`/service/add`,
        {
            name: data.name,
            description: data.description,
            price: data.price,
            points: data.points
        }), {
        onSuccess: (data) => {
            queryClient.invalidateQueries(['services']);
            toast.success(data.data.message);
        },
        onError: (error) => {
            //@ts-ignore
            toast.error(error.response.data.message);
        }
    });


    // form fields initializer
    const initialValues: IForm = { name: '', description: '', price: 0.0, points: 0 };
    // schema
    const formSchema = Yup.object({
        name: Yup.string().required(),
        description: Yup.string().required(),
        price: Yup.number().min(1).required(),
        points: Yup.number().required()
    });


    return (

        <div className="flex flex-col h-screen">
            <HeaderSub />

            <main className="grow">
                <Section title='Create a new service'>

                    <div className="flex flex-col w-full content-center justify-center">
                        <FaPlusCircle size={76} className={"text-slate-600 hover:text-slate-800 transition-all duration-300 self-center cursor-pointer"} onClick={() => setIsModalOpen(!isModalOpen)} />
                    </div>
                </Section>

                {/* <Section title={`${auth.user.firstname}, You have ${uncompleted.length} uncompleted appointments`}> */}
                <Section title={`All available services`}>

                    <h1 className={`mb-3`} >{`There are ${serviceCount} services available`}</h1>

                    <div className="flex flex-col w-full content-center justify-center">

                        {
                            getServices.isLoading ? <div>loading ...</div> :
                                getServices.isError ? <div>Error</div> :
                                    getServices.data.data < 1 ? <h2 className='p-6 w-1/2 self-center bg-slate-100 font-bold text-slate-400'>You have no appointment yet!</h2> :
                                        getServices.data.data.map(
                                            (serviceItem: IService) => <ServiceCard
                                                key={serviceItem.service_id}
                                                service_id={serviceItem.service_id}
                                                name={serviceItem.name}
                                                description={serviceItem.description}
                                                price={serviceItem.price}
                                                points={serviceItem.points} />

                                        )
                        }
                    </div>
                </Section>
            </main>

            {/* Modal start */}
            <Modal
                isOpen={isModalOpen}
                style={{
                    overlay: {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.75)'
                    },
                    content: {
                        position: 'relative',
                        width: '500px',
                        left: '-4px',
                        minHeight: '300px',
                        height: 'auto',
                        background: '#fff',
                        overflow: 'auto',
                        WebkitOverflowScrolling: 'touch',
                        borderRadius: '4px',
                        outline: 'none',
                        padding: '20px',
                        textAlign: 'center'
                    }
                }}
            >

                <FaPlusCircle
                    size={26}
                    className={"text-slate-600 rotate-45 hover:text-slate-800 transition-all duration-300 self-center cursor-pointer"}
                    onClick={() => setIsModalOpen(!isModalOpen)}
                />
                {/* <FaRegWindowClose size={25} onClick={() => setIsModalOpen(!isModalOpen)} className={' cursor-pointer'} /> */}
                <h1 className=' font-semibold text-lg mb-4 text-slate-500'>Add a new services</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={formSchema}
                    onSubmit={async (values) => {
                        // console.log(values);
                        newServiceMutation.mutateAsync({
                            name: values.name,
                            description: values.description,
                            price: values.price,
                            points: values.points
                        });

                        values.name = '';
                        values.description = '';
                        values.price = 0;
                        values.points = 0;

                        setTimeout(() => {
                            setIsModalOpen(false);
                        }, 200);
                    }}
                >

                    {({ errors, touched }) => (

                        <Form>
                            <Input
                                type={'text'}
                                name={'name'}
                                errMessage={errors.name}
                                error={errors.name}
                                touch={errors.name}
                                placeholder={"Name"}
                            />

                            <InputAs
                                as={'textarea'}
                                name={'description'}
                                errMessage={errors.description}
                                error={errors.description}
                                touch={errors.description}
                                placeholder={"Describe this new service"}
                            />

                            <Input
                                type={'text'}
                                name={'price'}
                                errMessage={errors.price}
                                error={errors.price}
                                touch={errors.price}
                                placeholder={"Price"}
                            />

                            <Input
                                type={'number'}
                                name={'points'}
                                errMessage={errors.points}
                                error={errors.points}
                                touch={errors.points}
                                placeholder={"Points"}
                            />

                            <Button title={'Save'} type={'submit'} className={'w-full'} />

                        </Form>
                    )}
                </Formik>

                {/* formik ends */}
            </Modal>
            {/* Modal end */}
            <Footer />
        </div>

        // Modal
    )
}

export default CreateService;
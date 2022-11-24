import React, { useEffect, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../sections/Footer';
import HeaderSub from '../sections/HeaderSub';
import Section from '../sections/Section';

import { useQueries, useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { axiosHttpClient } from '../api/api';
import IService from '../interfaces/IService';
import ServiceCard from '../components/ServiceCard';
import { FaPlusCircle, FaRegWindowClose } from 'react-icons/fa';
import * as Modal from 'react-modal';
import { Formik, Form } from 'formik';
import Button from '../components/Button';
import Input from '../components/Input';
import InputAs from '../components/InputAs';

import * as Yup from 'yup';
import { toast } from 'react-toastify';



type rs = { price: number; points: number }


const AppointmentDetail = () => {

    const urlParams = useParams();
    const queryClient = useQueryClient();
    Modal.setAppElement('#root');

    const [results, setResults] = useState<rs>({ points: 0, price: 0 });
    const [serviceList, setServiceList] = useState<IService[]>([]);
    //@ts-ignore
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const addServiceMutation = useMutation(async (id: number) => await axiosHttpClient.post(`/service/${urlParams.id}`,
        {
            service_id: id
        }), {
        onSuccess: (data) => {
            queryClient.invalidateQueries(['appointment-services']);
            toast.success(data.data.message);
        },
        onError: (error) => {
            //@ts-ignore
            toast.error(error.response.data.message);
        }
    });

    // get services that belongs to this appointment
    const getServices = useQuery(
        ['appointment-services'],
        async () => axiosHttpClient.get(`/service/${urlParams.id}`), {
        onSuccess: (data) => {
            setResults(calculateSubDetail(data.data));
        }
    }
    );


    // Get all available services
    const getAllAvailableServices = useQuery(
        ['allAvailableServices'],
        async () => axiosHttpClient.get(`/service/`), {
        onSuccess: (data) => {
            setServiceList(data.data);

        },
        onError: (error) => {
            //@ts-ignore
            toast.error(error.response.data.message);
        }
    }
    );

    // init values
    const initialValues = { serviceLoad: '' };

    // formSchema
    const formSchema = Yup.object({
        serviceLoad: Yup.number().min(1, 'Please select an item').required("Service field is required")
    });

    /** 
     * @description
     * calculate the price and point
     * @return
     * an object is returned with the total points and total cost
     * price, points
    */
    const calculateSubDetail = (arr: IService[]): rs => {

        let result: rs = { price: 0.0, points: 0 };

        if (arr.length > 0) {
            arr.forEach((item: IService) => {
                result.price += Number(item.price);
                result.points += Number(item.points);
            });
        }
        return result;
    }


    return (
        <div className="flex flex-col h-screen">
            <HeaderSub />

            <main className='grow' >
                <Section title='Add service'>

                    <div className='bg-slate-100 p-6'>

                        <div>You can add a service to this appointment below</div>
                        <div className="flex flex-col w-full content-center justify-center">
                            <FaPlusCircle size={76} className={"text-slate-600 hover:text-slate-800 transition-all duration-300 self-center cursor-pointer"} onClick={() => setIsModalOpen(!isModalOpen)} />
                        </div>

                    </div>
                </Section>

                <Section title={`Appointment detail`}>
                    <div>
                        {
                            getServices.isError ? <p>Something went wrong</p> :
                                getServices.isLoading ? <p>Loading ...</p> :
                                    getServices.data.data.length <= 0 ? <p>This appointment has no service yet!</p> :
                                        getServices.data.data.map(
                                            (service: IService) => <ServiceCard
                                                key={service.service_id}
                                                service_id={service.service_id}
                                                name={service.name}
                                                description={service.description}
                                                price={service.price}
                                                points={service.points}
                                                appointment_id={service.appointment_id}
                                            />)
                        }

                    </div>

                    <div>
                        <div>The total cost is <span className='font-semibold text-slate-500'>${results.price} </span></div>
                        <div>You will gain <span className='font-semibold text-slate-500'>{results.points}</span> points for this appointment, once cleared</div>
                    </div>
                </Section>

            </main>

            <Footer />


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
                <h1 className=' font-semibold text-lg mb-4 text-slate-500'>Add a service to appointment</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={formSchema}
                    onSubmit={async (values) => {
                        addServiceMutation.mutateAsync(Number(values.serviceLoad));
                        setTimeout(() => {
                            setIsModalOpen(false);
                        }, 500);

                    }}
                >

                    {({ errors, touched }) => (

                        <Form>
                            <div>Available Services</div>

                            <InputAs
                                as={'select'}
                                name={'serviceLoad'}
                                errMessage={errors.serviceLoad}
                                error={errors.serviceLoad}
                                touch={errors.serviceLoad}
                            >
                                <option selected disabled></option>

                                {
                                    serviceList.map((serviceItem: IService) => <option
                                        key={serviceItem.service_id}
                                        value={serviceItem.service_id}> {serviceItem.name} | ${serviceItem.price}
                                    </option>)
                                }



                            </InputAs>

                            <Button title={'Save'} type={'submit'} className={'w-full'} />

                        </Form>
                    )}
                </Formik>

                {/* formik ends */}
            </Modal>
            {/* Modal end */}
        </div>
    )
}

export default AppointmentDetail;
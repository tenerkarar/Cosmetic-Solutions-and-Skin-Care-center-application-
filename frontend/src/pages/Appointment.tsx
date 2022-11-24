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



interface IForm {
    time: string;
    date: string;
    note: string;
}


const Appointment = () => {

    Modal.setAppElement('#root');
    //@ts-ignore
    const { auth } = useContext(AuthContext);
    // Get all the current user appointments
    const getAppointments = useQuery(['appointments'], () => axiosHttpClient.get('/appointment/'));
    //@ts-ignore
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const queryClient = useQueryClient();

    const newAppointMutation = useMutation(async (data: IForm) => await axiosHttpClient.post(`/appointment/`,
        {
            note: data.note,
            time: data.time,
            date: data.date
        }), {
        onSuccess: (data) => {
            queryClient.invalidateQueries(['appointments']);
            toast.success(data.data.message);
        },
        onError: (error) => {
            //@ts-ignore
            toast.error(error.response.data.message);
        }
    });


    // form fields initializer
    const initialValues: IForm = { date: '', time: '', note: '' };
    // schema
    const formSchema = Yup.object({
        date: Yup.string().required(),
        time: Yup.string().required(),
        note: Yup.string().required()
    });


    return (

        <div className="flex flex-col h-screen">
            <HeaderSub />

            <main className="grow">
                <Section title='Make an appointment'>

                    <div className="flex flex-col w-full content-center justify-center">
                        <FaPlusCircle size={76} className={"text-slate-600 hover:text-slate-800 transition-all duration-300 self-center cursor-pointer"} onClick={() => setIsModalOpen(!isModalOpen)} />
                    </div>
                </Section>

                {/* <Section title={`${auth.user.firstname}, You have ${uncompleted.length} uncompleted appointments`}> */}
                <Section title={`${auth.user.firstname}! Below are your appointments`}>

                    <div className="flex flex-col w-full content-center justify-center">

                        {
                            getAppointments.isLoading ? <div>loading ...</div> :
                                getAppointments.isError ? <div>Error</div> :
                                    getAppointments.data.data < 1 ? <h2 className='p-6 w-1/2 self-center bg-slate-100 font-bold text-slate-400'>You have no appointment yet!</h2> :
                                        getAppointments.data.data.map(
                                            (appointment: any) => <AppointmentCard
                                                key={appointment.appointment_id}
                                                id={appointment.appointment_id}
                                                date={appointment.date}
                                                time={appointment.time}
                                                service_count={Number(appointment.services_count)}
                                                completed={appointment.complete}
                                            >{appointment.note}</AppointmentCard>

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
                <h1 className=' font-semibold text-lg mb-4 text-slate-500'>Add a new Appointment</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={formSchema}
                    onSubmit={async (values) => {
                        // console.log(values);
                        newAppointMutation.mutateAsync({ note: values.note, date: values.date, time: values.time });

                        values.date = '';
                        values.note = '';
                        values.time = '';

                        setTimeout(() => {
                            setIsModalOpen(false);
                        }, 500);
                    }}
                >

                    {({ errors, touched }) => (

                        <Form>
                            <div>Appointment time</div>
                            <Input type={'time'} name={'time'} errMessage={errors.time} error={errors.time} touch={errors.time} />
                            <div>Appointment date</div>
                            <Input type={'date'} name={'date'} errMessage={errors.date} error={errors.date} touch={errors.date} />
                            <div>Note</div>
                            <InputAs as={'textarea'}
                                name={'note'}
                                errMessage={errors.note}
                                error={errors.note}
                                touch={errors.note}
                                placeholder={'Put a note to remind yourself or let us know if you need something specific here!'} />

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

export default Appointment;
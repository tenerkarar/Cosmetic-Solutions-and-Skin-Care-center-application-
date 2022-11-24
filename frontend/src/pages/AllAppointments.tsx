import React, {useState} from 'react';
import Footer from '../sections/Footer';
import HeaderSub from '../sections/HeaderSub';
import Section from '../sections/Section';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosHttpClient } from '../api/api';
import AdminAppointmentCard from '../components/AdminAppointmentCard';
import IAdminAppointment from '../interfaces/IAdminAppointment';


const AllAppointments = () => {

    const [responseError, setResponseError] = useState('');
    const getAppointments = useQuery(['appointments-all'],
        () => axiosHttpClient.get('/appointment/all'), {
            onSuccess: (data) => { },
            onError: (error) => {
                //@ts-ignore
                setResponseError(error.response.data.message);
            }
        });

    return (
        <div className="flex flex-col h-screen">
            <HeaderSub />

            <main className='grow' >
                <Section title="Customers's appointments">

                    <div className="flex flex-col w-full content-center justify-center">

                        {
                            getAppointments.isLoading ? <div>loading ...</div> :
                                getAppointments.isError ? <div className={'p-4 text-red-500 bg-red-100 w-[400px] self-center font-semibold'}>{ responseError }</div> :
                                    getAppointments.data.data < 1 ? <h2 className='p-6 w-1/2 self-center bg-slate-100 font-bold text-slate-400'>You have no appointment yet!</h2> :
                                        getAppointments.data.data.map(
                                            (appointment: IAdminAppointment) => <AdminAppointmentCard
                                                key={appointment.appointment_id}
                                                appointment_id={appointment.appointment_id}
                                                date={appointment.date}
                                                time={appointment.time}
                                                services_count={Number(appointment.services_count)}
                                                complete={appointment.complete}
                                                firstname={appointment.firstname}
                                                lastname={appointment.lastname}
                                                cost={appointment.cost}
                                                note={appointment.note}
                                                user_id={appointment.user_id} />
                                        )
                        }

                    </div>

                </Section>
            </main>

            <Footer />
        </div>
    )
}

export default AllAppointments;
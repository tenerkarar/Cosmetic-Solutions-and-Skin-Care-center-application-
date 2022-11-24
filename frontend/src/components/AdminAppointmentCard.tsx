import React from 'react';
import { FaPlusCircle, FaRetweet } from 'react-icons/fa';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import IAdminAppointment from '../interfaces/IAdminAppointment';
import { axiosHttpClient } from '../api/api';
import { toast } from 'react-toastify';

const AdminAppointmentCard: React.FC<IAdminAppointment> = (props) => {

    const queryClient = useQueryClient();
    // delete current service from current appointment
    const deleteServiceMutation = useMutation(
        async () => await axiosHttpClient.delete(`/appointment/${props.appointment_id}`),
        {
            onSuccess: (data) => {
                toast.success(data.data.message);
                queryClient.invalidateQueries(['appointments-all']);
            },
            onError: (error) => {
                //@ts-ignore
                toast.error(error.response.data.message);
            }
        });
    
        const toggleServiceMutation = useMutation(
            async () => await axiosHttpClient.patch(`/appointment/toggle/${props.appointment_id}`),
            {
                onSuccess: (data) => {
                    toast.success(data.data.message);
                    queryClient.invalidateQueries(['appointments-all']);
                },
                onError: (error) => {
                    //@ts-ignore
                    toast.error(error.response.data.message);
                }
            });

    return (
        <div className="flex flex-col w-full bg-slate-300 min-h-min p-4 mb-1 gap-5">

            <div className="flex sm:flex-row flex-col justify-between">
                <div className='sm:text-left text-center'>
                    <p>Customer</p>
                    <div className='font-semibold text-slate-500'>{props.firstname} {props.lastname}</div>
                </div>

                <div>
                    <div>Scheduled</div>
                    <div className='font-semibold text-slate-500'>{props.time}<br /> {props.date}</div>
                </div>

                <div>
                    <div>Status</div>
                    <div className='font-semibold text-slate-500'>{props.complete ? 'Done' : 'incomplete'}</div>
                </div>

                <div>
                    <div>Services</div>
                    <div className='font-semibold text-slate-500'>{props.services_count}</div>
                </div>

                <div className='sm:text-right text-center'>
                    <div>Cost</div>
                    <div className='font-semibold text-slate-500'>${props.cost ?? 0}</div>
                </div>
            </div>

            <div className='flex flex-col bg-slate-200 p-3'>
                <div>
                    <p className='font-semibold text-slate-500 text-center'>Note</p>
                    <div className='sm:text-justify text-center'>{props.note}</div>
                </div>

                <div className={'flex flex-row justify-center gap-2'}>
                    <FaPlusCircle
                        size={26}
                        className={"text-slate-600 rotate-45 hover:text-slate-800 transition-all duration-300 self-center cursor-pointer"}
                        onClick={() => deleteServiceMutation.mutateAsync()}
                    />

                    <p>Update status </p>
                    <FaRetweet
                        
                        size={26}
                        className={"text-slate-600 hover:text-slate-800 transition-all duration-300 self-center cursor-pointer"}
                        onClick={() => toggleServiceMutation.mutateAsync()}
                    />

                    {/* <div>{props.complete ? 'Complete' : 'Incomplete'}</div> */}

                </div>
            </div>

        </div>
    )
}

export default AdminAppointmentCard;
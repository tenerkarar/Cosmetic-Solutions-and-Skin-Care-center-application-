import React, {useContext} from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import IService from '../interfaces/IService';
import { axiosHttpClient } from '../api/api';
import { toast } from 'react-toastify';

import AuthContext from '../contexts/AuthContext';

const ServiceCard: React.FC<IService> = (props) => {

    //@ts-ignore
    const { auth } = useContext(AuthContext);

    const queryClient = useQueryClient();
    // delete current service from current appointment

    const deleteServiceMutation = useMutation(
        async () => await axiosHttpClient.delete(`/service/${props.appointment_id}`, { data: { service_id: props.service_id } }),
        {
            onSuccess: (data) => {
                toast.success(data.data.message);
                queryClient.invalidateQueries(['appointment-services']);
            },
            onError: (error) => {
                 //@ts-ignore
                toast.error(error.response.data.message);
            }
        });
    
        const deleteServiceMutationAdmin = useMutation(
            async () => await axiosHttpClient.delete(`/service/admin/${props.service_id}`, { data: { service_id: props.service_id } }),
            {
                onSuccess: (data) => {
                    toast.success(data.data.message);
                    queryClient.invalidateQueries(['appointment-services']);
                    queryClient.invalidateQueries(['services']);
                },
                onError: (error) => {
                     //@ts-ignore
                    toast.error(error.response.data.message);
                }
        });

    return (
        <div className="flex flex-col w-full bg-slate-600 min-h-min p-4 mb-1 gap-5">


            <div className="flex flex-row justify-between">
                <div className='text-left'>
                    <p>Service name</p>
                    <div className='font-semibold text-slate-200'>{props.name}</div>
                </div>

                <div>
                    <div>Price</div>
                    <div className='font-semibold text-slate-200'>${props.price}</div>
                </div>

                <div className='text-right'>
                    <div>Points</div>
                    <div className='font-semibold text-slate-200'>{props.points}</div>
                </div>
            </div>

            <div className='flex flex-col bg-slate-200 p-3'>
                <div>
                    <p className='font-semibold text-slate-200 text-center'>Description</p>
                    <div className='text-justify'>{props.description}</div>
                </div>
                <FaPlusCircle
                    size={26}
                    className={"text-slate-600 rotate-45 hover:text-slate-800 transition-all duration-300 self-center cursor-pointer"}
                    onClick={
                        () => auth?.user?.role == 'admin' ? deleteServiceMutationAdmin.mutateAsync() : deleteServiceMutation.mutateAsync()
                    }
                />
            </div>

        </div>
    )
}

export default ServiceCard;
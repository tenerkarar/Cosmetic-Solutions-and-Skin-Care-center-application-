import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { FaCalendarAlt, FaCalendarDay, FaClock, FaInfoCircle, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { axiosHttpClient } from '../api/api';

interface IAppointmentCard {
    id: number;
    date: string;
    time: string;
    completed: boolean;
    service_count: number;
    children?: React.ReactNode;
}

const AppointmentCard: React.FC<IAppointmentCard> = (props) => {

    const queryClient = useQueryClient();

    const mutation = useMutation(async (id: number) => await axiosHttpClient.delete('/appointment/' + props.id), {
        onSuccess: (data) => {
            queryClient.invalidateQueries(['appointments']);
            //@ts-ignore
            toast.success(data.data.message);
        },
        onError: (error) => {
            //@ts-ignore
            toast.error(error.response.data.message);
        }
    });

    return props.completed ? (
        <div className="flex flex-col w-full my-2 p-5 bg-pink-800 text-white rounded-md">
            <div className="flex flex-row justify-between mb-3">
                <div className="font-bold hidden sm:inline">
                    <span >Status: {props.completed ? `completed` : `incomplete`} </span>
                    <span>| services: {props.service_count}</span>
                </div>
                <p className="font-bold"><FaCalendarDay className='inline' /> {props.date}</p>
                <p className="font-bold"><FaClock className='inline' /> {props.time}</p>
            </div>
            <div className="p-0 justify-start content-start text-left">
                {props.children}
            </div>

            <div className={"flex flex-row mt-2 gap-4"}>
                <div className={"flex flex-row h-3 w-3 bg-white p-4 rounded-[68px] text-center"}>
                    <p className="font-semibold text-pink-500 relative top-[-11px] right-1 ">{props.service_count}</p>
                </div>
                <div className='hover:cursor-pointer self-center' ><FaTrash onClick={async () => mutation.mutateAsync(props.id)} /></div>
                <Link to={`/appointment-detail/${props.id}`} className='hover:cursor-pointer self-center' ><FaInfoCircle/></Link>
            </div>
        </div>
    ) : (
        <div className="flex flex-col w-full my-2 p-5 bg-slate-500 text-white rounded-md">
            <div className="flex flex-row justify-between mb-3">
                <div className="font-bold hidden sm:inline">
                    <span >Status: {props.completed ? `completed` : `incomplete`} </span>
                    <span>| services: {props.service_count}</span>
                </div>
                <p className="font-bold"><FaCalendarDay className='inline' /> {props.date}</p>
                <p className="font-bold"><FaClock className='inline' /> {props.time}</p>
            </div>
            <div className="p-0 justify-start content-start text-left">
                {props.children}
            </div>

            <div className={"flex flex-row mt-2 content-center gap-4"}>
                <div className={"flex flex-row h-3 w-3 bg-white p-4 rounded-[68px] text-center gap-4 content-center"}>
                    <p className="font-semibold text-slate-500 relative top-[-11px] right-1 ">{props.service_count}</p>
                </div>
                    <div className='hover:cursor-pointer self-center' ><FaTrash onClick={async () => mutation.mutateAsync(props.id)} /></div>
                    <Link to={`/appointment-detail/${props.id}`} className='hover:cursor-pointer self-center' ><FaInfoCircle/></Link>
            </div>
        </div>
    );
}

export default AppointmentCard;
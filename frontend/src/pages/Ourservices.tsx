import React, { useState } from 'react';
import Footer from '../sections/Footer';
import HeaderSub from '../sections/HeaderSub';
import Section from '../sections/Section';
import ServiceCardDisplay from '../components/ServiceCardDisplay';

import img from '../assets/images/pexels-service.jpeg';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosHttpClient } from '../api/api';
import IService from '../interfaces/IService';


const Ourservices: React.FC<any> = () => {

    const queryClient = useQueryClient();

    const [serviceCount, setServiceCount] = useState<number>(0);
    
     // Get all the current user services
     const getServices = useQuery(['services'], async () => await axiosHttpClient.get('/service/'), {
        onSuccess: (data) => {
            setServiceCount(data.data.length);
        }
    });

    return  (<div className="flex flex-col h-screen">
    <HeaderSub />
    <main className="w-full grow">

        <Section title='Our services'>
            
                
                <div className='flex flex-wrap flex-cols shrink-2 gap-3 max-w-[800px] h-auto'>

                {
                            getServices.isLoading ? <div>loading ...</div> :
                                getServices.isError ? <div>Error</div> :
                                    getServices.data.data < 1 ? <h2 className='p-6 w-1/2 self-center bg-slate-100 font-bold text-slate-400'>You have no appointment yet!</h2> :
                                        getServices.data.data.map(
                                            (serviceItem: IService) => <ServiceCardDisplay
                                                key={serviceItem.service_id}
                                                title={serviceItem.name}>
                                                {
                                                    serviceItem.description
                                                }
                                                </ServiceCardDisplay>
                                        )
                        }

                </div>
                
        </Section>

    </main>
    <Footer />
</div>)
}

export default Ourservices;
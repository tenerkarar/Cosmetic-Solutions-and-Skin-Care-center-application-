import React, { ReactNode } from 'react';

import Button from './Button';

interface IServiceCardDisplay {
    title: string;
    children: ReactNode;
    image?: string;
}

// bg-slate-200
//bg-[image:var('${props.image}')]

const ServiceCardDisplay: React.FC<IServiceCardDisplay> = (props) => {

    return (
        <div
            className={`flex-col shrink-0 w-fit max-w-full text-slate-200 md:w-[394px] h-90 p-4 bg-pink-900 bg-[url(props.image)]`}
        >

            <h2 className="font-bold text-lg mb-2 z-10">{ props.title}</h2>
            <p className="z-10">
                {props.children}
            </p>

            <Button title={'More'}></Button>

            {/* <div style={{
                position: 'absolute',
                WebkitFilter: 'opacity(.4) saturate(2)',
                backgroundImage: `url(${props.image})`,
                backgroundSize: 'cover',
                width: '224px',
                height: '300px',
                zIndex: 2
            }}>

            </div> */}
        </div>
    )
}

export default ServiceCardDisplay;
import React from 'react';

interface ISection {
    title?: string,
    isDark?: boolean,
    children: React.ReactNode
}

const Section: React.FC<ISection> = (props) => {

    return props.isDark ? (
        <section className={`flex w-full min-h-max py-5 bg-pink-900 text-slate-300`}>
            <div className="w-[800px] mx-auto text-center px-5 md:px-0">
                {props.title && <h2 className="my-3 font-extrabold text-2xl text-center">{props.title}</h2>}
                {props.children}
            </div>
        </section>
    ) :
        (
            <section className={`flex w-full min-h-max py-5`}>
                <div className="w-[800px] mx-auto text-center px-5 md:px-0 ">
                    {props.title && <h2 className="my-3 font-extrabold text-2xl text-center text-pink-600">{props.title}</h2>}
                    {props.children}
                </div>
            </section>
        )
}

export default Section;
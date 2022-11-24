import React from 'react'
import { FaEject } from 'react-icons/fa';
import Footer from '../sections/Footer';
import HeaderSub from '../sections/HeaderSub';
import Section from '../sections/Section';

const NotFound = () => {

    return (
        <div className="flex flex-col h-screen">
            <HeaderSub />
            <main className="grow">
                <Section>
                    <div >
                        <h2 className={"font-extrabold text-9xl "}>404</h2>
                        <p className={"font-medium text-2xl"}>
                            <p>{ }</p>
                            The page is not found, Make sure you have te correct url!
                        </p>

                    </div>
                </Section>
            </main>
            <Footer />
        </div>
    )
}

export default NotFound;
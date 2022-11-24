import React from 'react'
import { FaPhone } from 'react-icons/fa';
import Footer from '../sections/Footer';

import HeaderSub from '../sections/HeaderSub';
import Section from '../sections/Section';

const Contact = () => {

    return (
        <div className="flex flex-col h-screen">
            <HeaderSub />

            <main className="grow">
                <Section title='Ways to contact us'>
                    <div className='text-left'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque quidem error facere sequi iste consectetur deleniti maiores, libero quaerat, eius qui animi nemo officia quos repudiandae aliquam odio molestias porro?
                    </div>
                </Section>

                <Section>
                    <div>
                        <p>Phone 1: 718 9544197 </p>
                        <p>Email:tenerkarar@gmail.com</p>   
                    </div>
                </Section>

                <Section>
                    <iframe className="w-full"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2967.4801825878417!2d-91.72628888455674!3d41.94702007921669!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87e4f902affbc17d%3A0xdcd546af0923e1ce!2s3110+Michelle+Ct+SW+APT+8%2C+Cedar+Rapids%2C+IA+52404!5e0!3m2!1sen!2sus!4v1563403679065!5m2!1sen!2sus"
                        width="500"
                        height="450"></iframe>
                </Section>
                
            </main>
            <Footer />
        </div>
    )
}

export default Contact;
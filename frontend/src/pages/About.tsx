import React from 'react'
import Footer from '../sections/Footer';
import Header from '../sections/Header';
import HeaderSub from '../sections/HeaderSub';
import Section from '../sections/Section';

const About = () => {

    return (
        <div className="flex flex-col h-screen">
            <HeaderSub />
            <main className="w-full grow">

                <Section title='Our history'>
                    <p className="text-justify">
                   
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas facilis necessitatibus numquam dolore doloremque doloribus enim quisquam deserunt laboriosam labore itaque eveniet, quod, repellat in natus est. Hic, ipsum dolorem!

                    </p>  
                </Section>

            </main>
            <Footer />
        </div>
    )
}

export default About;
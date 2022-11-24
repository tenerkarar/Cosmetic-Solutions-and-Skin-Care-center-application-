import React from "react";
import Header from "../sections/Header";
import HeaderSub from '../sections/HeaderSub'
import Section from "../sections/Section";

// Images import
import img2 from '../assets/images/2.jpg';
import img3 from '../assets/images/3.jpg';
import img1 from '../assets/images/1.jpg';
import img4 from '../assets/images/4.jpg';
import img5 from '../assets/images/5.jpg';

import ImageCard from "../components/ImageCard";
import Footer from "../sections/Footer";

import hero from '../assets/images/face.jpg';
import Carousel from "nuka-carousel";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="flex flex-col">
            {/* <Header /> */}
            <Header />

            <main className="w-full grow">
                <Section title={"Cosmetic Solutions Laser"}>

                    <div className="flex md:flex-row flex-col content-center justify-center mb-[-20px]">
                        <img src={hero} width="350" className="self-center md:self-start" />
                        <div className="text-justify self-center">
                            <p className="pb-2">
                                You might think that acne is something you have to suffer through as a teenager, but not only does acne develop outside of adolescence, but you don’t have to put up with it. The team of medically trained and licensed beauty experts at Cosmetic Solutions in Cedar Rapids, Iowa, offer a variety of medical-grade treatments to clear your skin and reduce acne scarring. If you want clear, healthy skin, call or make an appointment online today.
                            </p>
                            <Link to={"#"} className="mt-2 hover:text-blue-500">| Read more</Link>
                        </div>
                    </div>
                </Section>

                {/*  image section */}
                <Section title={"Excellent service"} isDark >

                    {/* <div className="flex flex-wrap justify-between content-between w-full"> */}

                    <Carousel autoplay>
                        <ImageCard
                            title="Razor 310"
                            textPreview="Cool stuff of this current year"
                            img={img1}
                        />

                        <ImageCard
                            title="Razor 310"
                            textPreview="Cool stuff of this current year"
                            img={img2}
                        />

                        <ImageCard
                            title="Razor 310"
                            textPreview="Cool stuff of this current year"
                            img={img3}
                        />

                        <ImageCard
                            title="Razor 310"
                            textPreview="Cool stuff of this current year"
                            img={img4}
                        />

                        <ImageCard
                            title="Razor 310"
                            textPreview="Cool stuff of this current year"
                            img={img5}
                        />

                    </Carousel>


                    {/* </div> */}

                </Section>

                <Section title={"Acne Q & A"}>
                    <p className="text-justify">
                        What is acne?
                        Acne is a skin condition that develops when your pores become clogged with excess sebum — an oily substance produced by your skin — and dead skin cells. The clogged pore develops a whitehead or a blackhead, and if bacteria is trapped in the poor, it may become infected. This infection causes the raised red bump you recognize as a pimple.

                        Acne can develop anywhere on your body, but most people develop pimples on their face, back, chest, and shoulders.
                    </p>
                </Section>

                <Section>
                    <p className="text-justify">
                        We offer children haircuts for all kids ten years of age and younger.
                        If you’re wondering if your child’s temper will permit a haircut, you can rest easy. Our specialists know how to work with kids. Some kids tolerate haircuts just fine and will sit still, even as the clippers start buzzing. Other kids get upset at the sight of the scissors and the sensation of the hair-styling clippers. You can rest assured that we are experts at providing your child with the best haircut while tending to his or her every need and ensuring a memorable haircut experience.
                    </p>
                </Section>

                <Section title={"What causes acne?"} isDark>
                    <p className="text-justify">

                        There are a lot of old wives’ tales about what causes acne, like chocolate, greasy food, and caffeine. However, in reality, acne is caused by your genetics and hormones. As adolescents go through puberty, they have higher levels of androgens — the male sex hormones — which can lead to extra sebum production. You might also develop acne because of hormones in your birth control or hormonal imbalances caused by issues like polycystic ovary syndrome or thyroid dysfunction.

                        Bacteria are another contributing factor to acne. Bacteria thrive in warm, moist locations, and a clogged pore meets those requirements. Keeping your face clean with appropriate products and avoiding touching your face can reduce the bacteria on your skin.
                    </p>
                </Section>
            </main>

            <Footer />
        </div>

    );
};

export default Home;

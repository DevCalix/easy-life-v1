// import BannerCarousel from '@/Layouts/Accueil/BannerCarousel';
import DevenirVendeur from '@/Layouts/Accueil/DevenirVendeur';
import Faqs from '@/Layouts/Accueil/Faqs';
import Footer from '@/Layouts/Accueil/Footer';
import Hero from '@/Layouts/Accueil/Hero';
import MobileAppSection from '@/Layouts/Accueil/MobileAppSection';
import Navbar from '@/Layouts/Accueil/Navbar';
import PodcastSection from '@/Layouts/Accueil/PodcastSection';
import ServicesSection from '@/Layouts/Accueil/Services';
import TestimonialsSection from '@/Layouts/Accueil/TestimonialsSection';
import { Head } from '@inertiajs/react';
import PromoBan from '@/Layouts/Accueil/PromoBan';

export default function Welcome({ banners = [], ligne1 = [], ligne2 = [], ligne3 = [], gauche = [], droite = [] }) {


    return (
        <>
            <Head title="Accueil" />
            <Navbar/>
            <PromoBan
                ligne1={ligne1}
                ligne2={ligne2}
                ligne3={ligne3}
                gauche={gauche}
                droite={droite}
            />
            {/* <BannerCarousel banners={banners} /> */}
            <Hero/>
            <PodcastSection/>
            <ServicesSection/>
            <DevenirVendeur/>
            <div className='container-fluid'>
                <MobileAppSection/>
                <TestimonialsSection/>
                <Faqs/>
            </div>
            <Footer/>
        </>
    );
}

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
import { Head, usePage } from '@inertiajs/react';
import PromoBan from '@/Layouts/Accueil/PromoBan';
import HomeSections from '@/Layouts/Accueil/HomeSections';
import TopVendeurSection from '@/Layouts/Accueil/TopVendeurSection';

export default function Welcome({ banners = [], ligne1 = [], ligne2 = [], ligne3 = [], gauche = [], droite = [], sections = [],topVendeurs = [], submenus = [] }) {
    
    return (
        <>
            <Head title="Accueil" />
            <Navbar submenus={submenus}/>
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
            <TopVendeurSection topVendeurs={topVendeurs} />
            <HomeSections sections={sections} />

            <Footer/>
        </>
    );
}

import BannerCarousel from "@/Layouts/Accueil/BannerCarousel";
import PromoBan from "@/Layouts/Accueil/PromoBan";
import MarketBan from "@/Layouts/Supermarche/global/MarketBan";
import MarketBestOffers from "@/Layouts/Supermarche/global/MarketBestOffers";
import MarketCategoryCarousel from "@/Layouts/Supermarche/global/MarketCategoryCarousel";
import MarketFooter from "@/Layouts/Supermarche/global/MarketFooter";
import MarketNavbar from "@/Layouts/Supermarche/global/MarketNavbar";
import NearbyMarketsCarousel from "@/Layouts/Supermarche/global/NearbyMarketsCarousel";
import NouveauSurEasyLife from "@/Layouts/Supermarche/global/NouveauSurEasyLife";
import PopularProducts from "@/Layouts/Supermarche/global/PopularProducts";
import { Head } from "@inertiajs/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SupermarcheAccueil({
        produitsPopulaires = [],
        bestOffers = [],
        nouveauxProduits = [],
        categories = [],
        stores = [],
        ligne1 = [],
        ligne2 = [],
        ligne3 = [],
        gauche = [],
        droite = []
    })
{


    return(
        <>
            <Head title="Accueil"/>
            <MarketNavbar/>
            <PromoBan
                ligne1={ligne1}
                ligne2={ligne2}
                ligne3={ligne3}
                gauche={gauche}
                droite={droite}
            />
            {/* <MarketBan/> */}
            {/* <BannerCarousel banners={banners} /> */}
            <MarketCategoryCarousel categories={categories}/>
            <MarketBestOffers bestOffers={bestOffers}/>
            <PopularProducts produitsPopulaires={produitsPopulaires} />
            <NearbyMarketsCarousel stores={stores}/>
            <NouveauSurEasyLife nouveauxProduits={nouveauxProduits}/>
            <MarketFooter/>
            <ToastContainer/>
        </>
    )
}

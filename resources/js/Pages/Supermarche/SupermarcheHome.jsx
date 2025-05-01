import MarketBestOffers from "@/Layouts/Supermarche/global/MarketBestOffers";
import MarketCategoryCarousel from "@/Layouts/Supermarche/global/MarketCategoryCarousel";
import MarketFooter from "@/Layouts/Supermarche/global/MarketFooter";
import MarketNavbar from "@/Layouts/Supermarche/global/MarketNavbar";
import NearbyMarketsCarousel from "@/Layouts/Supermarche/global/NearbyMarketsCarousel";
import NouveauSurEasyLife from "@/Layouts/Supermarche/global/NouveauSurEasyLife";
import PopularProducts from "@/Layouts/Supermarche/global/PopularProducts";

export default function Supermarche(){
    return(
        <>
            <MarketNavbar/>
            <MarketBar/>
            <MarketCategoryCarousel/>
            <MarketBestOffers/>
            <PopularProducts/>
            <NearbyMarketsCarousel/>
            <NouveauSurEasyLife/>
            <MarketFooter/>
        </>
    );
};

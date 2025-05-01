import PromoBan from "@/Layouts/Accueil/PromoBan";
import BanniereResto from "@/Layouts/Restaurant/global/BanniereResto";
import CategorieResto from "@/Layouts/Restaurant/global/CategorieResto";
import Meilleuresoffres from "@/Layouts/Restaurant/global/Meilleuresoffres";
import NavBarResto from "@/Layouts/Restaurant/global/NavBarResto";
import PiedDePageResto from "@/Layouts/Restaurant/global/PiedDePageResto";
import RepasPopulaires from "@/Layouts/Restaurant/global/RepasPopulaires";
import ReserverTable from "@/Layouts/Restaurant/global/ReserverTable";
// import RestaurantProche from "@/Layouts/Restaurant/global/RestaurantProche";
import RestoPopulaire from "@/Layouts/Restaurant/global/RestoPopulaire";
import { Head } from "@inertiajs/react";

export default function AccueilResto({ categories = [], meilleuresOffres = [], restaurantsPopulaires = [], repasPopulaires = [], ligne1 = [], ligne2 = [], ligne3 = [], gauche = [], droite = [] })
{
    return(
        <>
            <Head title="Accueil"/>
            <NavBarResto/>
            {/* <BanniereResto/> */}
            <PromoBan
                ligne1={ligne1}
                ligne2={ligne2}
                ligne3={ligne3}
                gauche={gauche}
                droite={droite}
            />
            <CategorieResto categories={categories}/>
            <ReserverTable/>
            <Meilleuresoffres meilleuresOffres ={ meilleuresOffres }/>
            <RestoPopulaire restaurantsPopulaires={restaurantsPopulaires}/>
            <RepasPopulaires repasPopulaires={repasPopulaires}/>
            {/* <RestaurantProche/> */}
            <PiedDePageResto/>
        </>
    )
}

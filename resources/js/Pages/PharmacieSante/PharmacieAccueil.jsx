import PromoBan from "@/Layouts/Accueil/PromoBan";
import CategoriesCarousel from "@/Layouts/PharmacieSante/CategoriesCarousel";
import InscriptionDocteurSection from "@/Layouts/PharmacieSante/InscriptionDocteurSection";
import MedicamentsUrgents from "@/Layouts/PharmacieSante/MedicamentsUrgents";
import PharmaBan from "@/Layouts/PharmacieSante/PharmaBan";
// import PharmaBan from "@/Layouts/PharmacieSante/PharmaBan";
import PharmacieDeGarde from "@/Layouts/PharmacieSante/PharmacieDeGarde";
import PharmacieFooter from "@/Layouts/PharmacieSante/PharmacieFooter";
import PharmaciesProches from "@/Layouts/PharmacieSante/PharmaciesProches";
import PharmaNavbar from "@/Layouts/PharmacieSante/PharmaNavbar";
import PrendreRendezVous from "@/Layouts/PharmacieSante/PrendreRendezVous";

export default function PharmacieAccueil({pharmacieDeGarde =[],medicamentsUrgents =[], pharmacies = [], categories = [], medecins = [], ligne1 = [], ligne2 = [], ligne3 = [], gauche = [], droite = []}){
    return(
        <>
            <PharmaNavbar/>
            <PharmaBan/>
            <PromoBan
                ligne1={ligne1}
                ligne2={ligne2}
                ligne3={ligne3}
                gauche={gauche}
                droite={droite}
            />
            <CategoriesCarousel categories={categories} />
            <MedicamentsUrgents medicamentsUrgents={medicamentsUrgents}/>
            {/* <PrendreRendezVous medecins={medecins}/> */}
            <PharmacieDeGarde pharmacieDeGarde = {pharmacieDeGarde}/>
            <PharmaciesProches pharmacies = {pharmacies}/>
            <PrendreRendezVous medecins={medecins}/>

            {/* Section pour l'inscription des docteurs */}
            <InscriptionDocteurSection/>

            <PharmacieFooter/>
        </>
    )
}

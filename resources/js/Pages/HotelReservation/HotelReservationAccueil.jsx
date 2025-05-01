import CityAccommodations from "@/Layouts/HotelReservationAccueil/CityAccommodations"
import CoupDeCoeurSection from "@/Layouts/HotelReservationAccueil/CoupDeCoeurSection"
import HotelCarousel from "@/Layouts/HotelReservationAccueil/HotelCarousel"
import HotelFooter from "@/Layouts/HotelReservationAccueil/HotelFooter"
import HotelReservationNavbar from "@/Layouts/HotelReservationAccueil/HotelReservationNavbar"
import HotelSearchSection from "@/Layouts/HotelReservationAccueil/HotelSearchSection"
import MapHotelsSection from "@/Layouts/HotelReservationAccueil/MapHotelsSection"
import PromotionsSection from "@/Layouts/HotelReservationAccueil/PromotionsSection"

export default function ReservationHotelAccueil({topHotels =[], topChambres = [], promotions = [], accommodations = [],})
{
    return(
        <>
            <HotelReservationNavbar/>
            <HotelCarousel topHotels = {topHotels}/>
            <HotelSearchSection/>
            <CityAccommodations accommodations={accommodations}/>
            <MapHotelsSection/>
            <CoupDeCoeurSection topChambres={topChambres}/>
            <PromotionsSection promotions={promotions}/>
            <HotelFooter/>
        </>
    )
}

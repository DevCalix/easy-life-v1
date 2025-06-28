<?php

// @formatter:off
// phpcs:ignoreFile
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Admin newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Admin newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Admin query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Admin whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Admin whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Admin whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Admin whereUserId($value)
 */
	class Admin extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string|null $phone_number
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ContactInfo newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ContactInfo newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ContactInfo query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ContactInfo whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ContactInfo whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ContactInfo wherePhoneNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ContactInfo whereUpdatedAt($value)
 */
	class ContactInfo extends \Eloquent {}
}

namespace App\Models\Global{
/**
 * 
 *
 * @property int $id
 * @property string|null $title
 * @property string|null $message
 * @property string|null $cover_popup
 * @property int $delay
 * @property bool $is_active
 * @property string|null $redirect_url
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Popup newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Popup newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Popup query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Popup whereCoverPopup($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Popup whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Popup whereDelay($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Popup whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Popup whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Popup whereMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Popup whereRedirectUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Popup whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Popup whereUpdatedAt($value)
 */
	class Popup extends \Eloquent {}
}

namespace App\Models\Global{
/**
 * 
 *
 * @property int $id
 * @property string|null $image
 * @property string|null $lien
 * @property string $emplacement
 * @property bool $statut
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PromoBan newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PromoBan newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PromoBan query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PromoBan whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PromoBan whereEmplacement($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PromoBan whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PromoBan whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PromoBan whereLien($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PromoBan whereStatut($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PromoBan whereUpdatedAt($value)
 */
	class PromoBan extends \Eloquent {}
}

namespace App\Models\Global{
/**
 * 
 *
 * @property int $id
 * @property string|null $promo_banner
 * @property string|null $redirect_url
 * @property int $statut
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PromoBanner newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PromoBanner newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PromoBanner query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PromoBanner whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PromoBanner whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PromoBanner wherePromoBanner($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PromoBanner whereRedirectUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PromoBanner whereStatut($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PromoBanner whereUpdatedAt($value)
 */
	class PromoBanner extends \Eloquent {}
}

namespace App\Models\Global{
/**
 * 
 *
 * @property int $id
 * @property string $section
 * @property string $nom_produit
 * @property float|null $prix
 * @property float|null $prix_promotion
 * @property float|null $pourcentage_promotion
 * @property string $image
 * @property string $lien_redirection
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SectionAccueil newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SectionAccueil newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SectionAccueil query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SectionAccueil whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SectionAccueil whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SectionAccueil whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SectionAccueil whereLienRedirection($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SectionAccueil whereNomProduit($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SectionAccueil wherePourcentagePromotion($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SectionAccueil wherePrix($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SectionAccueil wherePrixPromotion($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SectionAccueil whereSection($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SectionAccueil whereUpdatedAt($value)
 */
	class SectionAccueil extends \Eloquent {}
}

namespace App\Models\HotelReservation{
/**
 * 
 *
 * @property int $id
 * @property int $ht_hotel_id
 * @property int $user_id
 * @property float $note
 * @property string|null $commentaire
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\HotelReservation\HtHotel $hotel
 * @property-read \App\Models\User $utilisateur
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtAvis newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtAvis newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtAvis query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtAvis whereCommentaire($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtAvis whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtAvis whereHtHotelId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtAvis whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtAvis whereNote($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtAvis whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtAvis whereUserId($value)
 */
	class HtAvis extends \Eloquent {}
}

namespace App\Models\HotelReservation{
/**
 * 
 *
 * @property int $id
 * @property int $ht_hotel_id
 * @property string $numero_chambre
 * @property string $type
 * @property string $prix_par_nuit
 * @property int $capacite
 * @property int $lits_disponibles
 * @property string|null $description
 * @property int $est_disponible
 * @property string|null $image_principale
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\HotelReservation\HtEquipement> $equipements
 * @property-read int|null $equipements_count
 * @property-read \App\Models\HotelReservation\HtHotel $hotel
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\HotelReservation\HtImage> $images
 * @property-read int|null $images_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\HotelReservation\HtPromotion> $promotions
 * @property-read int|null $promotions_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\HotelReservation\HtReservation> $reservations
 * @property-read int|null $reservations_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtChambre newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtChambre newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtChambre query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtChambre whereCapacite($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtChambre whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtChambre whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtChambre whereEstDisponible($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtChambre whereHtHotelId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtChambre whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtChambre whereImagePrincipale($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtChambre whereLitsDisponibles($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtChambre whereNumeroChambre($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtChambre wherePrixParNuit($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtChambre whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtChambre whereUpdatedAt($value)
 */
	class HtChambre extends \Eloquent {}
}

namespace App\Models\HotelReservation{
/**
 * 
 *
 * @property int $id
 * @property string $nom
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\HotelReservation\HtChambre> $chambres
 * @property-read int|null $chambres_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\HotelReservation\HtHotel> $hotels
 * @property-read int|null $hotels_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtEquipement newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtEquipement newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtEquipement query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtEquipement whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtEquipement whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtEquipement whereNom($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtEquipement whereUpdatedAt($value)
 */
	class HtEquipement extends \Eloquent {}
}

namespace App\Models\HotelReservation{
/**
 * 
 *
 * @property int $id
 * @property string $nom
 * @property string $type_etablissement
 * @property string $adresse
 * @property string|null $numero_appartement_etage
 * @property string $ville
 * @property string $pays_region
 * @property string $telephone
 * @property string $email
 * @property string|null $description
 * @property string|null $repas_offerts
 * @property string|null $parking
 * @property string|null $horaires_arrivee_de
 * @property string|null $horaires_arrivee_a
 * @property string|null $horaires_depart_de
 * @property string|null $horaires_depart_a
 * @property int $accepte_enfants
 * @property string|null $accepte_animaux
 * @property int $fumer
 * @property float $note
 * @property string|null $image_principale
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\HotelReservation\HtAvis> $avis
 * @property-read int|null $avis_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\HotelReservation\HtChambre> $chambres
 * @property-read int|null $chambres_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\HotelReservation\HtEquipement> $equipements
 * @property-read int|null $equipements_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\HotelReservation\HtImage> $images
 * @property-read int|null $images_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\HotelReservation\HtHotelMeta> $metas
 * @property-read int|null $metas_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\HotelReservation\HtPromotion> $promotions
 * @property-read int|null $promotions_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\HotelReservation\HtService> $services
 * @property-read int|null $services_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtHotel newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtHotel newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtHotel query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtHotel whereAccepteAnimaux($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtHotel whereAccepteEnfants($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtHotel whereAdresse($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtHotel whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtHotel whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtHotel whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtHotel whereFumer($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtHotel whereHorairesArriveeA($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtHotel whereHorairesArriveeDe($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtHotel whereHorairesDepartA($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtHotel whereHorairesDepartDe($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtHotel whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtHotel whereImagePrincipale($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtHotel whereNom($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtHotel whereNote($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtHotel whereNumeroAppartementEtage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtHotel whereParking($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtHotel wherePaysRegion($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtHotel whereRepasOfferts($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtHotel whereTelephone($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtHotel whereTypeEtablissement($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtHotel whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtHotel whereVille($value)
 */
	class HtHotel extends \Eloquent {}
}

namespace App\Models\HotelReservation{
/**
 * 
 *
 * @property int $id
 * @property int $ht_hotel_id
 * @property string $cle
 * @property string $valeur
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\HotelReservation\HtHotel $hotel
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtHotelMeta newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtHotelMeta newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtHotelMeta query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtHotelMeta whereCle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtHotelMeta whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtHotelMeta whereHtHotelId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtHotelMeta whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtHotelMeta whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtHotelMeta whereValeur($value)
 */
	class HtHotelMeta extends \Eloquent {}
}

namespace App\Models\HotelReservation{
/**
 * 
 *
 * @property int $id
 * @property string $url
 * @property int|null $ht_hotel_id
 * @property int|null $ht_chambre_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\HotelReservation\HtChambre|null $chambre
 * @property-read \App\Models\HotelReservation\HtHotel|null $hotel
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtImage newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtImage newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtImage query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtImage whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtImage whereHtChambreId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtImage whereHtHotelId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtImage whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtImage whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtImage whereUrl($value)
 */
	class HtImage extends \Eloquent {}
}

namespace App\Models\HotelReservation{
/**
 * 
 *
 * @property int $id
 * @property int $ht_hotel_id
 * @property int|null $ht_chambre_id
 * @property string $pourcentage_reduction
 * @property string $date_debut
 * @property string $date_fin
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\HotelReservation\HtChambre|null $chambre
 * @property-read \App\Models\HotelReservation\HtHotel|null $hotel
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtPromotion newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtPromotion newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtPromotion query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtPromotion whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtPromotion whereDateDebut($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtPromotion whereDateFin($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtPromotion whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtPromotion whereHtChambreId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtPromotion whereHtHotelId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtPromotion whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtPromotion wherePourcentageReduction($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtPromotion whereUpdatedAt($value)
 */
	class HtPromotion extends \Eloquent {}
}

namespace App\Models\HotelReservation{
/**
 * 
 *
 * @property int $id
 * @property int $ht_hotel_id
 * @property int $ht_chambre_id
 * @property int|null $user_id
 * @property string $date_arrivee
 * @property string $date_depart
 * @property int $nombre_personnes
 * @property string $prix
 * @property string $numero_piece
 * @property string|null $piece_identite
 * @property string $nom
 * @property string $email
 * @property string $telephone
 * @property string|null $raison_sejour
 * @property string $statut
 * @property string $reservation_key
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\HotelReservation\HtChambre|null $chambre
 * @property-read string $prix_total
 * @property-read \App\Models\HotelReservation\HtHotel|null $hotel
 * @property-read \App\Models\User|null $utilisateur
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtReservation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtReservation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtReservation query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtReservation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtReservation whereDateArrivee($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtReservation whereDateDepart($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtReservation whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtReservation whereHtChambreId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtReservation whereHtHotelId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtReservation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtReservation whereNom($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtReservation whereNombrePersonnes($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtReservation whereNumeroPiece($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtReservation wherePieceIdentite($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtReservation wherePrix($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtReservation whereRaisonSejour($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtReservation whereReservationKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtReservation whereStatut($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtReservation whereTelephone($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtReservation whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtReservation whereUserId($value)
 */
	class HtReservation extends \Eloquent {}
}

namespace App\Models\HotelReservation{
/**
 * 
 *
 * @property int $id
 * @property string $nom
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\HotelReservation\HtHotel> $hotels
 * @property-read int|null $hotels_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtService newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtService newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtService query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtService whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtService whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtService whereNom($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|HtService whereUpdatedAt($value)
 */
	class HtService extends \Eloquent {}
}

namespace App\Models\Managers{
/**
 * 
 *
 * @property int $id
 * @property int $user_id
 * @property int $st_categories_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\PharmacieSante\StCategorie|null $categorie
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PharmaCategorieUser newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PharmaCategorieUser newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PharmaCategorieUser query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PharmaCategorieUser whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PharmaCategorieUser whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PharmaCategorieUser whereStCategoriesId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PharmaCategorieUser whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PharmaCategorieUser whereUserId($value)
 */
	class PharmaCategorieUser extends \Eloquent {}
}

namespace App\Models\Managers{
/**
 * 
 *
 * @property int $id
 * @property int $user_id
 * @property int $categorie_repas_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Restaurant\CategorieRepas|null $categorie
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RestauCategorieUser newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RestauCategorieUser newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RestauCategorieUser query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RestauCategorieUser whereCategorieRepasId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RestauCategorieUser whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RestauCategorieUser whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RestauCategorieUser whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RestauCategorieUser whereUserId($value)
 */
	class RestauCategorieUser extends \Eloquent {}
}

namespace App\Models\Managers{
/**
 * 
 *
 * @property-read \App\Models\Supermarche\Categorie|null $categorie
 * @property-read \App\Models\User|null $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SpCategoryUser newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SpCategoryUser newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SpCategoryUser query()
 */
	class SpCategoryUser extends \Eloquent {}
}

namespace App\Models\Managers{
/**
 * 
 *
 * @property int $id
 * @property int $user_id
 * @property string $service_type
 * @property int $service_id
 * @property string $code_marchand
 * @property string $role
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, UserService> $gestionnaires
 * @property-read int|null $gestionnaires_count
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $service
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserService newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserService newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserService query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserService whereCodeMarchand($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserService whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserService whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserService whereRole($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserService whereServiceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserService whereServiceType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserService whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserService whereUserId($value)
 */
	class UserService extends \Eloquent {}
}

namespace App\Models\PharmacieSante{
/**
 * 
 *
 * @property int $id
 * @property int $st_pharmacie_id
 * @property string $cle
 * @property string $valeur
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\PharmacieSante\StPharmacie|null $pharmacie
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PharmacieMeta newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PharmacieMeta newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PharmacieMeta query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PharmacieMeta whereCle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PharmacieMeta whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PharmacieMeta whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PharmacieMeta whereStPharmacieId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PharmacieMeta whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PharmacieMeta whereValeur($value)
 */
	class PharmacieMeta extends \Eloquent {}
}

namespace App\Models\PharmacieSante{
/**
 * 
 *
 * @property int $id
 * @property int $user_id
 * @property string $expire_at
 * @property string $type_abonnement
 * @property int $rdv_restants
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StAbonneVip newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StAbonneVip newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StAbonneVip query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StAbonneVip whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StAbonneVip whereExpireAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StAbonneVip whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StAbonneVip whereRdvRestants($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StAbonneVip whereTypeAbonnement($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StAbonneVip whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StAbonneVip whereUserId($value)
 */
	class StAbonneVip extends \Eloquent {}
}

namespace App\Models\PharmacieSante{
/**
 * 
 *
 * @property int $id
 * @property int $user_id
 * @property int $st_pharmacie_id
 * @property string $note
 * @property string $commentaire
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\PharmacieSante\StPharmacie|null $pharmacie
 * @property-read \App\Models\User|null $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StAvis newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StAvis newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StAvis query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StAvis whereCommentaire($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StAvis whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StAvis whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StAvis whereNote($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StAvis whereStPharmacieId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StAvis whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StAvis whereUserId($value)
 */
	class StAvis extends \Eloquent {}
}

namespace App\Models\PharmacieSante{
/**
 * 
 *
 * @property int $id
 * @property string $nom
 * @property string $slug
 * @property string|null $description
 * @property string|null $image_principale
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\PharmacieSante\StMedicament> $medicaments
 * @property-read int|null $medicaments_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StCategorie newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StCategorie newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StCategorie query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StCategorie whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StCategorie whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StCategorie whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StCategorie whereImagePrincipale($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StCategorie whereNom($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StCategorie whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StCategorie whereUpdatedAt($value)
 */
	class StCategorie extends \Eloquent {}
}

namespace App\Models\PharmacieSante{
/**
 * 
 *
 * @property int $id
 * @property int $user_id
 * @property string|null $transaction_ref
 * @property string|null $montant_total
 * @property string $nom_client
 * @property string $email_client
 * @property string $telephone_client
 * @property array<array-key, mixed>|null $produits
 * @property string $statut
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\PharmacieSante\StDetailCommande> $details
 * @property-read int|null $details_count
 * @property-read \App\Models\PharmacieSante\StPharmacie|null $pharmacie
 * @property-read \App\Models\User|null $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StCommande newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StCommande newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StCommande query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StCommande whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StCommande whereEmailClient($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StCommande whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StCommande whereMontantTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StCommande whereNomClient($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StCommande whereProduits($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StCommande whereStatut($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StCommande whereTelephoneClient($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StCommande whereTransactionRef($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StCommande whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StCommande whereUserId($value)
 */
	class StCommande extends \Eloquent {}
}

namespace App\Models\PharmacieSante{
/**
 * 
 *
 * @property int $id
 * @property int $st_commande_id
 * @property int $st_medicament_id
 * @property int $quantite
 * @property string $prix
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\PharmacieSante\StCommande|null $commande
 * @property-read \App\Models\PharmacieSante\StMedicament|null $medicament
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StDetailCommande newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StDetailCommande newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StDetailCommande query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StDetailCommande whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StDetailCommande whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StDetailCommande wherePrix($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StDetailCommande whereQuantite($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StDetailCommande whereStCommandeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StDetailCommande whereStMedicamentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StDetailCommande whereUpdatedAt($value)
 */
	class StDetailCommande extends \Eloquent {}
}

namespace App\Models\PharmacieSante{
/**
 * 
 *
 * @property int $id
 * @property string $nom
 * @property string $adresse
 * @property string $telephone
 * @property string|null $carte
 * @property string|null $image_principale
 * @property float $note
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\PharmacieSante\StImage> $images
 * @property-read int|null $images_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\PharmacieSante\StMedecin> $medecins
 * @property-read int|null $medecins_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StHopital newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StHopital newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StHopital query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StHopital whereAdresse($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StHopital whereCarte($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StHopital whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StHopital whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StHopital whereImagePrincipale($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StHopital whereNom($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StHopital whereNote($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StHopital whereTelephone($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StHopital whereUpdatedAt($value)
 */
	class StHopital extends \Eloquent {}
}

namespace App\Models\PharmacieSante{
/**
 * 
 *
 * @property int $id
 * @property string $url
 * @property int|null $st_medicament_id
 * @property int|null $st_pharmacie_id
 * @property int|null $st_hopital_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\PharmacieSante\StHopital|null $hopital
 * @property-read \App\Models\PharmacieSante\StMedicament|null $medicament
 * @property-read \App\Models\PharmacieSante\StPharmacie|null $pharmacie
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StImage newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StImage newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StImage query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StImage whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StImage whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StImage whereStHopitalId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StImage whereStMedicamentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StImage whereStPharmacieId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StImage whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StImage whereUrl($value)
 */
	class StImage extends \Eloquent {}
}

namespace App\Models\PharmacieSante{
/**
 * 
 *
 * @property int $id
 * @property string $nom
 * @property string $user_id
 * @property string $specialite
 * @property string $adresse
 * @property string $telephone
 * @property string|null $email
 * @property string|null $carte
 * @property string|null $image_principale
 * @property string|null $note
 * @property string $type
 * @property int|null $nombre_d_annee_experience
 * @property string|null $a_propos
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\PharmacieSante\StRdvMedical> $rdvs
 * @property-read int|null $rdvs_count
 * @property-read \App\Models\User|null $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StMedecin newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StMedecin newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StMedecin query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StMedecin whereAPropos($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StMedecin whereAdresse($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StMedecin whereCarte($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StMedecin whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StMedecin whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StMedecin whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StMedecin whereImagePrincipale($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StMedecin whereNom($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StMedecin whereNombreDAnneeExperience($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StMedecin whereNote($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StMedecin whereSpecialite($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StMedecin whereTelephone($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StMedecin whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StMedecin whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StMedecin whereUserId($value)
 */
	class StMedecin extends \Eloquent {}
}

namespace App\Models\PharmacieSante{
/**
 * 
 *
 * @property int $id
 * @property string $nom
 * @property string $slug
 * @property string $description
 * @property string $image_principale
 * @property string $prix
 * @property int $ordonnance_requise
 * @property int $medicament_urgent
 * @property int $st_pharmacie_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\PharmacieSante\StCategorie> $categories
 * @property-read int|null $categories_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\PharmacieSante\StDetailCommande> $details
 * @property-read int|null $details_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\PharmacieSante\StImage> $images
 * @property-read int|null $images_count
 * @property-read \App\Models\PharmacieSante\StPharmacie|null $pharmacie
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\PharmacieSante\StPromotion> $promotions
 * @property-read int|null $promotions_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\PharmacieSante\StStock> $stocks
 * @property-read int|null $stocks_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\PharmacieSante\StVariationMedicament> $variations
 * @property-read int|null $variations_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StMedicament newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StMedicament newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StMedicament query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StMedicament whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StMedicament whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StMedicament whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StMedicament whereImagePrincipale($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StMedicament whereMedicamentUrgent($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StMedicament whereNom($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StMedicament whereOrdonnanceRequise($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StMedicament wherePrix($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StMedicament whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StMedicament whereStPharmacieId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StMedicament whereUpdatedAt($value)
 */
	class StMedicament extends \Eloquent {}
}

namespace App\Models\PharmacieSante{
/**
 * 
 *
 * @property int $id
 * @property int $user_id
 * @property int|null $st_commande_id
 * @property int $st_medicament_id
 * @property string $fichier_ordonnance
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\PharmacieSante\StCommande|null $commande
 * @property-read \App\Models\PharmacieSante\StMedicament|null $medicament
 * @property-read \App\Models\User|null $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StOrdonnance newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StOrdonnance newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StOrdonnance query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StOrdonnance whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StOrdonnance whereFichierOrdonnance($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StOrdonnance whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StOrdonnance whereStCommandeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StOrdonnance whereStMedicamentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StOrdonnance whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StOrdonnance whereUserId($value)
 */
	class StOrdonnance extends \Eloquent {}
}

namespace App\Models\PharmacieSante{
/**
 * 
 *
 * @property int $id
 * @property int $user_id
 * @property int $st_medicament_id
 * @property int|null $st_variation_medicament_id
 * @property int $quantite
 * @property string $prix_unitaire
 * @property string $total
 * @property int $ordonnance_requise
 * @property int $ordonnance_upload
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\PharmacieSante\StMedicament|null $medicament
 * @property-read \App\Models\User|null $user
 * @property-read \App\Models\PharmacieSante\StVariationMedicament|null $variation
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StPanier newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StPanier newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StPanier query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StPanier whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StPanier whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StPanier whereOrdonnanceRequise($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StPanier whereOrdonnanceUpload($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StPanier wherePrixUnitaire($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StPanier whereQuantite($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StPanier whereStMedicamentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StPanier whereStVariationMedicamentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StPanier whereTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StPanier whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StPanier whereUserId($value)
 */
	class StPanier extends \Eloquent {}
}

namespace App\Models\PharmacieSante{
/**
 * 
 *
 * @property int $id
 * @property string $nom
 * @property string $adresse
 * @property string $heures_ouverture
 * @property string $telephone
 * @property string|null $lien_carte
 * @property string $image_principale
 * @property string|null $note
 * @property int $pharmacie_de_garde
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\PharmacieSante\StAvis> $avis
 * @property-read int|null $avis_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\PharmacieSante\StCommande> $commandes
 * @property-read int|null $commandes_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\PharmacieSante\StImage> $images
 * @property-read int|null $images_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\PharmacieSante\StMedicament> $medicaments
 * @property-read int|null $medicaments_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\PharmacieSante\PharmacieMeta> $metas
 * @property-read int|null $metas_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\PharmacieSante\StStock> $stocks
 * @property-read int|null $stocks_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StPharmacie newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StPharmacie newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StPharmacie query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StPharmacie whereAdresse($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StPharmacie whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StPharmacie whereHeuresOuverture($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StPharmacie whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StPharmacie whereImagePrincipale($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StPharmacie whereLienCarte($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StPharmacie whereNom($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StPharmacie whereNote($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StPharmacie wherePharmacieDeGarde($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StPharmacie whereTelephone($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StPharmacie whereUpdatedAt($value)
 */
	class StPharmacie extends \Eloquent {}
}

namespace App\Models\PharmacieSante{
/**
 * 
 *
 * @property int $id
 * @property int $st_medicament_id
 * @property string $reduction
 * @property string $date_debut
 * @property string $date_fin
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\PharmacieSante\StMedicament|null $medicament
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StPromotion newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StPromotion newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StPromotion query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StPromotion whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StPromotion whereDateDebut($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StPromotion whereDateFin($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StPromotion whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StPromotion whereReduction($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StPromotion whereStMedicamentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StPromotion whereUpdatedAt($value)
 */
	class StPromotion extends \Eloquent {}
}

namespace App\Models\PharmacieSante{
/**
 * 
 *
 * @property int $id
 * @property int $user_id
 * @property int $st_medecin_id
 * @property string|null $date
 * @property string|null $heure
 * @property string|null $message
 * @property string $statut
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\PharmacieSante\StMedecin|null $medecin
 * @property-read \App\Models\User|null $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StRdvMedical newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StRdvMedical newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StRdvMedical query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StRdvMedical whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StRdvMedical whereDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StRdvMedical whereHeure($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StRdvMedical whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StRdvMedical whereMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StRdvMedical whereStMedecinId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StRdvMedical whereStatut($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StRdvMedical whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StRdvMedical whereUserId($value)
 */
	class StRdvMedical extends \Eloquent {}
}

namespace App\Models\PharmacieSante{
/**
 * 
 *
 * @property int $id
 * @property int $st_pharmacie_id
 * @property int $st_medicament_id
 * @property int $quantite
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\PharmacieSante\StMedicament|null $medicament
 * @property-read \App\Models\PharmacieSante\StPharmacie|null $pharmacie
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StStock newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StStock newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StStock query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StStock whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StStock whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StStock whereQuantite($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StStock whereStMedicamentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StStock whereStPharmacieId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StStock whereUpdatedAt($value)
 */
	class StStock extends \Eloquent {}
}

namespace App\Models\PharmacieSante{
/**
 * 
 *
 * @property int $id
 * @property int $st_medicament_id
 * @property string $type_variation
 * @property string $valeur_variation
 * @property string|null $prix
 * @property string|null $image_variation
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\PharmacieSante\StMedicament|null $medicament
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StVariationMedicament newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StVariationMedicament newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StVariationMedicament query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StVariationMedicament whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StVariationMedicament whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StVariationMedicament whereImageVariation($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StVariationMedicament wherePrix($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StVariationMedicament whereStMedicamentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StVariationMedicament whereTypeVariation($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StVariationMedicament whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|StVariationMedicament whereValeurVariation($value)
 */
	class StVariationMedicament extends \Eloquent {}
}

namespace App\Models\Restaurant{
/**
 * 
 *
 * @property int $id
 * @property string $nom
 * @property string $slug
 * @property string|null $description
 * @property string|null $image
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Restaurant\Repas> $repas
 * @property-read int|null $repas_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $utilisateurs
 * @property-read int|null $utilisateurs_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CategorieRepas newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CategorieRepas newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CategorieRepas query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CategorieRepas whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CategorieRepas whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CategorieRepas whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CategorieRepas whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CategorieRepas whereNom($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CategorieRepas whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CategorieRepas whereUpdatedAt($value)
 */
	class CategorieRepas extends \Eloquent {}
}

namespace App\Models\Restaurant{
/**
 * 
 *
 * @property int $id
 * @property int $commande_id
 * @property int $repas_id
 * @property int|null $variation_id
 * @property int $quantite
 * @property string $prix_unitaire
 * @property string $prix_total
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Restaurant\RepasCommande $commande
 * @property-read \App\Models\Restaurant\Repas $repas
 * @property-read \App\Models\Restaurant\VariationRepas|null $variation
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DetailCommandeRepas newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DetailCommandeRepas newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DetailCommandeRepas query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DetailCommandeRepas whereCommandeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DetailCommandeRepas whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DetailCommandeRepas whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DetailCommandeRepas wherePrixTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DetailCommandeRepas wherePrixUnitaire($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DetailCommandeRepas whereQuantite($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DetailCommandeRepas whereRepasId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DetailCommandeRepas whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DetailCommandeRepas whereVariationId($value)
 */
	class DetailCommandeRepas extends \Eloquent {}
}

namespace App\Models\Restaurant{
/**
 * 
 *
 * @property int $id
 * @property int $repas_id
 * @property string $url_image
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Restaurant\Repas|null $repas
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ImageSecondaireRepas newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ImageSecondaireRepas newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ImageSecondaireRepas query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ImageSecondaireRepas whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ImageSecondaireRepas whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ImageSecondaireRepas whereRepasId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ImageSecondaireRepas whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ImageSecondaireRepas whereUrlImage($value)
 */
	class ImageSecondaireRepas extends \Eloquent {}
}

namespace App\Models\Restaurant{
/**
 * 
 *
 * @property int $id
 * @property string $repasId
 * @property int $restaurant_id
 * @property string $nom
 * @property string $slug
 * @property string|null $description
 * @property string $prix
 * @property int|null $reduction
 * @property string|null $prix_reduit
 * @property string|null $rating
 * @property int|null $est_populaire
 * @property string|null $photo
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $categorie_repas_id
 * @property-read \App\Models\Restaurant\CategorieRepas|null $categorie
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Restaurant\ImageSecondaireRepas> $imagesSecondairesRepas
 * @property-read int|null $images_secondaires_repas_count
 * @property-read \App\Models\Restaurant\Restaurant|null $restaurant
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Restaurant\Tagrepas> $tags
 * @property-read int|null $tags_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Restaurant\VariationRepas> $variations
 * @property-read int|null $variations_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Repas newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Repas newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Repas query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Repas whereCategorieRepasId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Repas whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Repas whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Repas whereEstPopulaire($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Repas whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Repas whereNom($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Repas wherePhoto($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Repas wherePrix($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Repas wherePrixReduit($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Repas whereRating($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Repas whereReduction($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Repas whereRepasId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Repas whereRestaurantId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Repas whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Repas whereUpdatedAt($value)
 */
	class Repas extends \Eloquent {}
}

namespace App\Models\Restaurant{
/**
 * 
 *
 * @property int $id
 * @property string $reference
 * @property int|null $utilisateur_id
 * @property string $nom_client
 * @property string $email_client
 * @property string $telephone_client
 * @property string $montant_total
 * @property string $statut
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Restaurant\DetailCommandeRepas> $details
 * @property-read int|null $details_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Restaurant\RepasCommandePanier> $repas
 * @property-read int|null $repas_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RepasCommande newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RepasCommande newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RepasCommande query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RepasCommande whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RepasCommande whereEmailClient($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RepasCommande whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RepasCommande whereMontantTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RepasCommande whereNomClient($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RepasCommande whereReference($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RepasCommande whereStatut($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RepasCommande whereTelephoneClient($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RepasCommande whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RepasCommande whereUtilisateurId($value)
 */
	class RepasCommande extends \Eloquent {}
}

namespace App\Models\Restaurant{
/**
 * 
 *
 * @property int $id
 * @property int|null $user_id
 * @property string|null $session_id
 * @property int $repas_id
 * @property int|null $variation_id
 * @property int $quantite
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Restaurant\Repas|null $repas
 * @property-read \App\Models\Restaurant\VariationRepas|null $variation
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RepasCommandePanier newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RepasCommandePanier newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RepasCommandePanier query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RepasCommandePanier whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RepasCommandePanier whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RepasCommandePanier whereQuantite($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RepasCommandePanier whereRepasId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RepasCommandePanier whereSessionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RepasCommandePanier whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RepasCommandePanier whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RepasCommandePanier whereVariationId($value)
 */
	class RepasCommandePanier extends \Eloquent {}
}

namespace App\Models\Restaurant{
/**
 * 
 *
 * @property int $id
 * @property string $random_id
 * @property string $nom
 * @property string $adresse
 * @property string|null $coordonnees_map
 * @property string|null $numero_telephone
 * @property string|null $horaires_ouverture
 * @property string|null $rating
 * @property string|null $photo_restaurant
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Restaurant\RestaurantMeta> $metas
 * @property-read int|null $metas_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Restaurant\Repas> $repas
 * @property-read int|null $repas_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Restaurant\RestoReservation> $reservations
 * @property-read int|null $reservations_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Restaurant newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Restaurant newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Restaurant query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Restaurant whereAdresse($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Restaurant whereCoordonneesMap($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Restaurant whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Restaurant whereHorairesOuverture($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Restaurant whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Restaurant whereNom($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Restaurant whereNumeroTelephone($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Restaurant wherePhotoRestaurant($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Restaurant whereRandomId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Restaurant whereRating($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Restaurant whereUpdatedAt($value)
 */
	class Restaurant extends \Eloquent {}
}

namespace App\Models\Restaurant{
/**
 * 
 *
 * @property int $id
 * @property int $restaurant_id
 * @property string $cle
 * @property string $valeur
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Restaurant\Restaurant|null $restaurant
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RestaurantMeta newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RestaurantMeta newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RestaurantMeta query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RestaurantMeta whereCle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RestaurantMeta whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RestaurantMeta whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RestaurantMeta whereRestaurantId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RestaurantMeta whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RestaurantMeta whereValeur($value)
 */
	class RestaurantMeta extends \Eloquent {}
}

namespace App\Models\Restaurant{
/**
 * 
 *
 * @property int $id
 * @property int $restaurant_id
 * @property int $user_id
 * @property string $nom_client
 * @property string|null $numero_telephone
 * @property string $date_reservation
 * @property string $heure_reservation
 * @property int $nombre_personnes
 * @property string $statut
 * @property string|null $commentaire
 * @property string $cle_reservation
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Restaurant\Restaurant|null $restaurant
 * @property-read \App\Models\User|null $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RestoReservation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RestoReservation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RestoReservation query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RestoReservation whereCleReservation($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RestoReservation whereCommentaire($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RestoReservation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RestoReservation whereDateReservation($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RestoReservation whereHeureReservation($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RestoReservation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RestoReservation whereNomClient($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RestoReservation whereNombrePersonnes($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RestoReservation whereNumeroTelephone($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RestoReservation whereRestaurantId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RestoReservation whereStatut($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RestoReservation whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|RestoReservation whereUserId($value)
 */
	class RestoReservation extends \Eloquent {}
}

namespace App\Models\Restaurant{
/**
 * 
 *
 * @property int $id
 * @property string $nom
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Restaurant\Repas> $repas
 * @property-read int|null $repas_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tagrepas newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tagrepas newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tagrepas query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tagrepas whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tagrepas whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tagrepas whereNom($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tagrepas whereUpdatedAt($value)
 */
	class Tagrepas extends \Eloquent {}
}

namespace App\Models\Restaurant{
/**
 * 
 *
 * @property int $id
 * @property int $repas_id
 * @property string $type_variation
 * @property string $valeur_variation
 * @property string $prix
 * @property string|null $image_variation
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Restaurant\Repas|null $repas
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VariationRepas newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VariationRepas newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VariationRepas query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VariationRepas whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VariationRepas whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VariationRepas whereImageVariation($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VariationRepas wherePrix($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VariationRepas whereRepasId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VariationRepas whereTypeVariation($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VariationRepas whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VariationRepas whereValeurVariation($value)
 */
	class VariationRepas extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role whereUpdatedAt($value)
 */
	class Role extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string $title
 * @property string $url
 * @property int $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $formatted_url
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Submenu newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Submenu newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Submenu query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Submenu whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Submenu whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Submenu whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Submenu whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Submenu whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Submenu whereUrl($value)
 */
	class Submenu extends \Eloquent {}
}

namespace App\Models\Supermarche{
/**
 * 
 *
 * @property int $id
 * @property string $nom
 * @property string $slug
 * @property string|null $description
 * @property string|null $image_url
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Supermarche\Produit> $produits
 * @property-read int|null $produits_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $utilisateurs
 * @property-read int|null $utilisateurs_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Categorie newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Categorie newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Categorie query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Categorie whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Categorie whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Categorie whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Categorie whereImageUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Categorie whereNom($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Categorie whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Categorie whereUpdatedAt($value)
 */
	class Categorie extends \Eloquent {}
}

namespace App\Models\Supermarche{
/**
 * 
 *
 * @property int $id
 * @property string $reference
 * @property int|null $utilisateur_id
 * @property string $nom_client
 * @property string $email_client
 * @property string $telephone_client
 * @property string $montant_total
 * @property string $statut
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Supermarche\Produit> $produits
 * @property-read int|null $produits_count
 * @property-read \App\Models\User|null $utilisateur
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Commande newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Commande newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Commande query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Commande whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Commande whereEmailClient($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Commande whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Commande whereMontantTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Commande whereNomClient($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Commande whereReference($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Commande whereStatut($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Commande whereTelephoneClient($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Commande whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Commande whereUtilisateurId($value)
 */
	class Commande extends \Eloquent {}
}

namespace App\Models\Supermarche{
/**
 * 
 *
 * @property int $id
 * @property int $produit_id
 * @property string|null $url
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Supermarche\Produit|null $produit
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ImageSecondaire newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ImageSecondaire newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ImageSecondaire query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ImageSecondaire whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ImageSecondaire whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ImageSecondaire whereProduitId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ImageSecondaire whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ImageSecondaire whereUrl($value)
 */
	class ImageSecondaire extends \Eloquent {}
}

namespace App\Models\Supermarche{
/**
 * 
 *
 * @property int $id
 * @property int|null $user_id
 * @property string|null $session_id
 * @property int $produit_id
 * @property int|null $variation_id
 * @property int $quantite
 * @property string $prix_unitaire
 * @property string $prix_total
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Supermarche\Produit|null $produit
 * @property-read \App\Models\Supermarche\Variation|null $variation
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Panier newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Panier newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Panier query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Panier whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Panier whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Panier wherePrixTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Panier wherePrixUnitaire($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Panier whereProduitId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Panier whereQuantite($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Panier whereSessionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Panier whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Panier whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Panier whereVariationId($value)
 */
	class Panier extends \Eloquent {}
}

namespace App\Models\Supermarche{
/**
 * 
 *
 * @property int $id
 * @property int $store_id
 * @property string $nom
 * @property string $slug
 * @property string|null $description_courte
 * @property string|null $description
 * @property string $prix
 * @property string|null $image_principale
 * @property int $is_variable
 * @property string $statut
 * @property int|null $est_populaire
 * @property string|null $pourcentage_reduction
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Supermarche\Categorie> $categories
 * @property-read int|null $categories_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Supermarche\Commande> $commandes
 * @property-read int|null $commandes_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Supermarche\ImageSecondaire> $imagesSecondaires
 * @property-read int|null $images_secondaires_count
 * @property-read \App\Models\Supermarche\Store|null $store
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Supermarche\Tag> $tags
 * @property-read int|null $tags_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Supermarche\Variation> $variations
 * @property-read int|null $variations_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Produit forVendor($user)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Produit newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Produit newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Produit query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Produit whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Produit whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Produit whereDescriptionCourte($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Produit whereEstPopulaire($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Produit whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Produit whereImagePrincipale($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Produit whereIsVariable($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Produit whereNom($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Produit wherePourcentageReduction($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Produit wherePrix($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Produit whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Produit whereStatut($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Produit whereStoreId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Produit whereUpdatedAt($value)
 */
	class Produit extends \Eloquent {}
}

namespace App\Models\Supermarche{
/**
 * 
 *
 * @property-read string|null $image_url
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SmBanner newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SmBanner newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SmBanner query()
 */
	class SmBanner extends \Eloquent {}
}

namespace App\Models\Supermarche{
/**
 * 
 *
 * @property int $id
 * @property string $nom
 * @property string $adresse
 * @property string|null $coordonnees_map
 * @property string|null $numero_telephone
 * @property string|null $horaires_ouverture
 * @property string|null $rating
 * @property \Attribute $photo_store
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Managers\UserService> $gestionnaires
 * @property-read int|null $gestionnaires_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Supermarche\SupermarcheMeta> $metas
 * @property-read int|null $metas_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Supermarche\Produit> $produits
 * @property-read int|null $produits_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Store newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Store newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Store query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Store whereAdresse($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Store whereCoordonneesMap($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Store whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Store whereHorairesOuverture($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Store whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Store whereNom($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Store whereNumeroTelephone($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Store wherePhotoStore($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Store whereRating($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Store whereUpdatedAt($value)
 */
	class Store extends \Eloquent {}
}

namespace App\Models\Supermarche{
/**
 * 
 *
 * @property int $id
 * @property int $store_id
 * @property string $cle
 * @property string $valeur
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Supermarche\Store|null $hotel
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SupermarcheMeta newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SupermarcheMeta newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SupermarcheMeta query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SupermarcheMeta whereCle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SupermarcheMeta whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SupermarcheMeta whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SupermarcheMeta whereStoreId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SupermarcheMeta whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SupermarcheMeta whereValeur($value)
 */
	class SupermarcheMeta extends \Eloquent {}
}

namespace App\Models\Supermarche{
/**
 * 
 *
 * @property int $id
 * @property string $nom
 * @property string $slug
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Supermarche\Produit> $produits
 * @property-read int|null $produits_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tag newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tag newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tag query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tag whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tag whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tag whereNom($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tag whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tag whereUpdatedAt($value)
 */
	class Tag extends \Eloquent {}
}

namespace App\Models\Supermarche{
/**
 * 
 *
 * @property int $id
 * @property int $produit_id
 * @property string $type_variation
 * @property string $valeur_variation
 * @property string|null $prix_additionnel
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Supermarche\VariationImage> $images
 * @property-read int|null $images_count
 * @property-read \App\Models\Supermarche\Produit|null $produit
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Variation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Variation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Variation query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Variation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Variation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Variation wherePrixAdditionnel($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Variation whereProduitId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Variation whereTypeVariation($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Variation whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Variation whereValeurVariation($value)
 */
	class Variation extends \Eloquent {}
}

namespace App\Models\Supermarche{
/**
 * 
 *
 * @property int $id
 * @property int $variation_id
 * @property string|null $url
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Supermarche\Variation|null $variation
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VariationImage newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VariationImage newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VariationImage query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VariationImage whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VariationImage whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VariationImage whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VariationImage whereUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VariationImage whereVariationId($value)
 */
	class VariationImage extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string $section
 * @property string $nom
 * @property string|null $description
 * @property string $image
 * @property string $lien_redirection
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TopVendeur newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TopVendeur newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TopVendeur query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TopVendeur whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TopVendeur whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TopVendeur whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TopVendeur whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TopVendeur whereLienRedirection($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TopVendeur whereNom($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TopVendeur whereSection($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TopVendeur whereUpdatedAt($value)
 */
	class TopVendeur extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\PharmacieSante\StAbonneVip|null $abonneVip
 * @property-read \App\Models\Admin|null $admin
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Supermarche\Categorie> $categories
 * @property-read int|null $categories_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Restaurant\CategorieRepas> $categoriesRepas
 * @property-read int|null $categories_repas_count
 * @property-read \App\Models\PharmacieSante\StMedecin|null $medecin
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read \App\Models\UserProfile|null $profile
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\PharmacieSante\StRdvMedical> $rdvs
 * @property-read int|null $rdvs_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Managers\UserService> $services
 * @property-read int|null $services_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\PharmacieSante\StCategorie> $stCategories
 * @property-read int|null $st_categories_count
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUpdatedAt($value)
 */
	class User extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $user_id
 * @property string|null $numero
 * @property string|null $adresse
 * @property string|null $ville
 * @property string|null $pays
 * @property string|null $date_naissance
 * @property string|null $genre
 * @property string|null $bio
 * @property string|null $photo_profil
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProfile newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProfile newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProfile query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProfile whereAdresse($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProfile whereBio($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProfile whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProfile whereDateNaissance($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProfile whereGenre($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProfile whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProfile whereNumero($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProfile wherePays($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProfile wherePhotoProfil($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProfile whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProfile whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|UserProfile whereVille($value)
 */
	class UserProfile extends \Eloquent {}
}


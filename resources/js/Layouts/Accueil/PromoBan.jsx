import React from "react";
import { Link } from "@inertiajs/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation } from "swiper/modules";

export default function PromoBan({ ligne1 = [], ligne2 = [], ligne3 = [], gauche = [], droite = [] }) {
  return (
    <div className="container-fluid p-2">
      <div className="row justify-content-center align-items-center">
        {/* Image gauche (masquée en mobile) */}
        {gauche.length > 0 && (
          <div className="col-md-2 d-none d-md-block">
            <Link href={gauche[0].lien || "#"}>
              <img
                src={gauche[0].image}
                className="img-fluid w-100 h-100 object-fit-cover"
                alt="Gauche"
              />
            </Link>
          </div>
        )}

        {/* Carrousel du centre correspond à ligne_1 */}
        <div className="col-12 col-md-8">
          {ligne1.length > 0 ? (
            <div
              id="carouselCentral"
              className="carousel slide"
              data-bs-ride="carousel"
              data-bs-interval="4000"
            >
              <div className="carousel-inner rounded shadow-sm">
                {ligne1.map((item, index) => (
                  <div
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                    key={index}
                  >
                    <Link href={item.lien || "#"}>
                      <img
                        src={item.image}
                        className="d-block w-100"
                        alt={`Bannière ${index + 1}`}
                        style={{ objectFit: "cover" }}
                      />
                    </Link>
                  </div>
                ))}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselCentral"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Précédent</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselCentral"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Suivant</span>
              </button>
            </div>
          ) : (
            <div className="text-center py-4 bg-light rounded">
              <p>Aucune bannière disponible pour cette section</p>
            </div>
          )}
        </div>

        {/* Image droite (masquée en mobile) */}
        {droite.length > 0 && (
          <div className="col-md-2 d-none d-md-block">
            <Link href={droite[0].lien || "#"}>
              <img
                src={droite[0].image}
                className="img-fluid w-100 h-100 object-fit-cover"
                alt="Droite"
              />
            </Link>
          </div>
        )}
      </div>

      {/* Carrousel horizontal en bas avec Swiper correspond à ligne_2 */}
      {ligne2.length > 0 && (
        <div className="mt-4 px-2">
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={5}
            slidesPerView={3}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              992: { slidesPerView: 5 },
              1200: { slidesPerView: 6 },
            }}
          >
            {ligne2.map((item, index) => (
              <SwiperSlide key={index}>
                <Link href={item.lien || "#"} className="d-block text-center">
                  <img
                    src={item.image}
                    alt={`Bas ${index + 1}`}
                    className="img-fluid rounded shadow-sm"
                    style={{ objectFit: "cover" }}
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Carrousel horizontal en bas avec Swiper correspond à ligne_3 */}
      {ligne3.length > 0 && (
        <div className="mt-4 px-0">
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={5}
            slidesPerView={2}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 2 },
              992: { slidesPerView: 2 },
              1200: { slidesPerView: 2 },
            }}
          >
            {ligne3.map((item, index) => (
              <SwiperSlide key={index}>
                <Link href={item.lien || "#"} className="d-block text-center">
                  <img
                    src={item.image}
                    alt={`Bas ${index + 1}`}
                    className="img-fluid rounded shadow-sm"
                    style={{ objectFit: "cover" }}
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}

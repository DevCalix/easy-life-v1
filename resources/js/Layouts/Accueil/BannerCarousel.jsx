import React from "react";
import { Link, usePage } from "@inertiajs/react";

export default function BannerCarousel({ banners = [] }) {
    const { props } = usePage();
    const appUrl = props.appUrl;

    if (banners.length === 0) {
        return null;
    }

    return (
        <div id="carouselExampleIndicators" className="carousel slide my-1" data-bs-ride="carousel">
            <div className="carousel-indicators">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to={index}
                        className={index === 0 ? "active" : ""}
                        aria-current={index === 0 ? "true" : undefined}
                        aria-label={`Slide ${index + 1}`}
                    ></button>
                ))}
            </div>

            <div className="carousel-inner">
                {banners.map((banner, index) => (
                    <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                        <Link href={banner.redirect_url || "#"}>
                            <img
                                src={banner.promo_banner ? `${appUrl}${banner.promo_banner}` : "/images/default-banner.jpg"}
                                className="d-block w-100"
                                alt={`Bannière ${index + 1}`}
                                style={{objectFit: "cover" }}
                            />
                        </Link>
                    </div>
                ))}
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

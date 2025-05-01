export default function MobileAppSection() {
    return (
      <section className="mobile-app-section py-2" style={{ fontSize:"1rem" }}>
        <div className="container">
          <div className="row align-items-center justify-content-between">
            {/* Colonne texte */}
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="">
                <p className="text-uppercase text-primary montserrat1 fw-bold mb-3">Notre Application Mobile</p>
                <h2 className="mb-2 montserrat fw-bold montserrat-normal">Accédez à Tous Nos Services Depuis Votre Smartphone</h2>
                <p className="montserrat-normal">
                  Téléchargez l'application Easy Life et simplifiez votre quotidien où que vous soyez. Commandez, réservez, et gérez vos services en quelques clics. Profitez d'une expérience fluide et intuitive.
                </p>
                <div className="">
                  <a href="https://play.google.com/store/apps/details?id=com.appservices.easylifehome">
                  <img
                        src="/images/AppStore.png"
                        alt="Application Mobile"
                        className="img-fluid w-25"
                    />
                  </a>
                  <a href="https://play.google.com/store/apps/details?id=com.appservices.easylifehome">
                    <img
                        src="/images/Playstore.png"
                        alt="Application Mobile"
                        className="img-fluid w-25"
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* Colonne image */}
            <div className="col-lg-6">
              <div className="app-image-container position-relative">
                <img
                  src="./images/autres/dames_focus.webp"
                  alt="Application Mobile"
                  className="img-fluid rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

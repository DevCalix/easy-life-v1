import React from 'react';

const PodcastSection = () => {
  return (
    <section className="podcast-section py-1 bg-warning">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-auto">
            <div className="podcast-content montserrat-normal">
              <h6 className="fw-bold montserrat-normal mb-1">Nos Podcasts Inspirants</h6>
              <a
                href="https://blog.easylife5.com/podcast/"
                className="btn btn-primary btn-sm px-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-headphones me-2"></i>
                Écouter les podcasts
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PodcastSection;

export default function Faqs() {
    return (
      <section className="faq-section py-2">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center mb-4">
              <div className="text-uppercase">
                <p className="text-primary mb-2 montserrat-normal fw-bold">
                  Questions Que Vous
                </p>
                <h2 className="montserrat-normal fw-bold">Questions Fréquemment Posées</h2>
              </div>
            </div>
            <div className="col-lg-10">
              <div className="accordion" id="accordionFAQ">
                {faqs.map((faq, index) => (
                  <div className="accordion-item border-0 mb-3" key={`faq-${index}`}>
                    <h2 className="accordion-header" id={`heading-${index}`}>
                      <button
                        className="accordion-button bg-white shadow-sm rounded border-0 montserrat-normal fw-bold"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse-${index}`}
                        aria-expanded="false"
                        aria-controls={`collapse-${index}`}
                      >
                        {faq.question}
                      </button>
                    </h2>
                    <div
                      id={`collapse-${index}`}
                      className="accordion-collapse collapse"
                      aria-labelledby={`heading-${index}`}
                      data-bs-parent="#accordionFAQ"
                    >
                      <div className="accordion-body poppins-light">{faq.answer}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const faqs = [
    {
      question: "Comment fonctionne Easy Life ?",
      answer:
        "Easy Life vous permet de trouver facilement des services variés, des restaurants aux pharmacies, tout en simplifiant votre quotidien.",
    },
    {
      question: "Puis-je réserver un restaurant via Easy Life ?",
      answer:
        "Oui, vous pouvez explorer divers restaurants et effectuer des réservations directement via notre plateforme.",
    },
    {
      question: "Easy Life propose-t-il des services de transport ?",
      answer:
        "Oui, nous connectons également les utilisateurs avec des agences de transport pour répondre à vos besoins de déplacement.",
    },
    {
      question: "Comment puis-je contacter le service client d'Easy Life ?",
      answer:
        "Vous pouvez nous contacter via notre page de contact ou appeler notre service client disponible tous les jours.",
    },
    {
      question: "Y a-t-il des frais supplémentaires pour les réservations ?",
      answer:
        "Nous nous efforçons de ne pas imposer de frais supplémentaires. Les frais applicables sont clairement indiqués lors de la réservation.",
    },
  ];

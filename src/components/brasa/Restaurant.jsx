import '../../styles/brasa/restaurant.css'

export default function Restaurant() {
  return (
    <section
      className="brasa-section brasa-restaurant"
      id="casa"
    >
      <div className="brasa-section__heading">
        <div className="brasa-section__eyebrow">
          ONDE ESTAMOS
        </div>

        <h2>
          Uma mesa esperando por você.
        </h2>
      </div>

      <div className="brasa-restaurant__layout">
        <div className="brasa-restaurant__info">
          <p className="brasa-restaurant__intro">
            Um lugar para chegar sem pressa, comer bem
            e ficar mais um pouco.
          </p>

          <div className="brasa-restaurant__details">
            <div className="brasa-restaurant__detail">
              <span>ENDEREÇO</span>

              <strong>
                Praça do Ferreira, 120
              </strong>

              <strong>
                Centro — Fortaleza, CE
              </strong>
            </div>

            <div className="brasa-restaurant__detail">
              <span>HORÁRIOS</span>

              <strong>
                Ter — Qui · 18h — 23h
              </strong>

              <strong>
                Sex — Sáb · 18h — 00h
              </strong>
            </div>

            <div className="brasa-restaurant__detail">
              <span>CONTATO</span>

              <strong>
                (85) 3333-3333
              </strong>

              <strong>
                contato@brasa.com
              </strong>
            </div>
          </div>
        </div>

        <div className="brasa-restaurant__map">
          <iframe
            title="Localização da BRASA"
            src="https://www.google.com/maps?q=Pra%C3%A7a%20do%20Ferreira%2C%20Fortaleza%20-%20CE&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}
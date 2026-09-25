import '../../styles/brasa/hero.css'

export default function Hero() {
  return (
    <section
      className="brasa-hero"
      id="top"
      aria-labelledby="brasa-hero-title"
    >
      <div className="brasa-media brasa-media--hero">
        <video
          className="brasa-media__video"
          autoPlay
          muted
          loop
          playsInline
          poster="/media/hero-poster.jpg"
          aria-hidden="true"
        >
          <source src="/media/steakVideoHero.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="brasa-hero__veil" />

      <div className="brasa-hero__content">
        <p className="brasa-kicker">
          COZINHA BRASILEIRA CONTEMPORÂNEA
        </p>

        <h1 id="brasa-hero-title">
          BRASA
        </h1>

        <p className="brasa-hero__line">
          Brasil servido à mesa.
        </p>
      </div>

      <a
        className="brasa-scroll"
        href="#intro"
        aria-label="Conheça a BRASA"
      >
        <span>CONHEÇA</span>
        <span className="brasa-scroll__arrow" aria-hidden="true">
          ↓
        </span>
      </a>
    </section>
  )
}
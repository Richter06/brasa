import { experienceImages } from '../../data/brasa'

export default function Experience() {
  return (
    <section className="brasa-section" id="experiencia">
      <div className="brasa-section__eyebrow">05 / A EXPERIÊNCIA</div>
      <div className="brasa-experience__intro"><h2>Chegar. Sentar. Pedir. Comer. Ficar.</h2><p>Porque uma boa refeição começa antes do primeiro garfo.</p></div>
      <div className="brasa-experience__gallery">
        {experienceImages.map((item) => <figure className="brasa-experience__item" key={item.label}><div className="brasa-media brasa-media--experience" data-media-slot={item.image} /><figcaption>{item.label}</figcaption></figure>)}
      </div>
    </section>
  )
}

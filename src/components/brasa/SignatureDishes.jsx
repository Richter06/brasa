import { signatureDishes } from '../../data/brasa'

export default function SignatureDishes() {
  return (
    <section className="brasa-section" id="pratos">
      <div className="brasa-section__heading"><div className="brasa-section__eyebrow">02 / DA CASA</div><h2>Algumas coisas a gente faz questão de servir.</h2></div>
      <div className="brasa-dishes">
        {signatureDishes.map((dish) => (
          <article className="brasa-dish" key={dish.number}>
            <div className="brasa-dish__meta"><span>{dish.number}</span><span>{dish.price}</span></div>
            <div className="brasa-media brasa-media--dish" data-media-slot={dish.image} role="img" aria-label={dish.name} />
            <div className="brasa-dish__copy"><h3>{dish.name}</h3><p>{dish.description}</p></div>
          </article>
        ))}
      </div>
    </section>
  )
}

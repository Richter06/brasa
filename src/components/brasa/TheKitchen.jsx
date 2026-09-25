export default function TheKitchen() {
  return (
    <section className="brasa-kitchen" id="cozinha">
      <div className="brasa-kitchen__media brasa-media">
        <video className="brasa-media__video" autoPlay muted loop playsInline poster="/media/kitchen-poster.jpg" aria-hidden="true"><source src="/media/kitchen.mp4" type="video/mp4" /></video>
      </div>
      <div className="brasa-kitchen__content"><span>03 / COZINHA</span><strong>FOGO.</strong><strong>TEMPO.</strong><strong>INGREDIENTE.</strong><strong>PRATO.</strong></div>
    </section>
  )
}

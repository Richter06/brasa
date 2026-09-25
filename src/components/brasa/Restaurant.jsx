export default function Restaurant() {
  return (
    <section className="brasa-section" id="casa">
      <div className="brasa-section__eyebrow">06 / ONDE ESTAMOS</div>
      <div className="brasa-restaurant__layout">
        <div><h2>Uma mesa esperando por você.</h2><p>Endereço, horários e informações reais entram aqui quando o modelo receber os dados do restaurante.</p></div>
        <div className="brasa-restaurant__details"><div><span>ENDEREÇO</span><strong>Rua da Brasa, 120</strong><strong>Fortaleza — CE</strong></div><div><span>HORÁRIOS</span><strong>Ter — Qui · 18h — 23h</strong><strong>Sex — Sáb · 18h — 00h</strong></div></div>
      </div>
      <div className="brasa-media brasa-media--location" data-media-slot="location-photo" />
    </section>
  )
}

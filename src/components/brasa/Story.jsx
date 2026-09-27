import '../../styles/brasa/story.css'

export default function Story() {
  return (
    <section
      className="brasa-section brasa-story"
      id="historia"
    >
      <div className="brasa-story__media">
        <video
          className="brasa-story__video"
          src="/media/brasaVideo.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="Vídeo da BRASA"
        />
      </div>

      <div className="brasa-story__copy">
        <div className="brasa-section__eyebrow">
          A CASA
        </div>

        <h2>
          Começou com fogo.
        </h2>

        <p>
          A BRASA nasceu de uma vontade simples:
          fazer comida brasileira com calma, cuidado
          e muito sabor.
        </p>

        <p>
          A gente gosta de receber bem, de ver a mesa
          cheia e de deixar cada pessoa à vontade para
          ficar mais um pouco.
        </p>

        <p>
          No fim, é isso que queremos fazer por aqui:
          cozinhar coisas boas e criar momentos que
          dão vontade de voltar.
        </p>
      </div>
    </section>
  )
}
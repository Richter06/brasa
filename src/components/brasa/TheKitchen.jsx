import { useEffect, useRef } from 'react'

import '../../styles/brasa/the-kitchen.css'

const words = [
  'FOGO.',
  'AMOR.',
  'TEMPERO',
  '& SABOR',
]

export default function TheKitchen() {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const wordRefs = useRef([])

  useEffect(() => {
    const section = sectionRef.current
    const stage = stageRef.current

    if (!section || !stage) return

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    )

    const setFinalState = () => {
      wordRefs.current.forEach((word) => {
        if (!word) return

        word.style.transform =
          'translate3d(0, 0, 0)'

        word.style.opacity = '1'
      })
    }

    if (reducedMotion.matches) {
      setFinalState()
      return
    }

    let animationFrame = null

    let targetProgress = 0
    let currentProgress = 0

    const updateProgress = () => {
      const rect = section.getBoundingClientRect()

      const scrollDistance =
        section.offsetHeight -
        window.innerHeight

      if (scrollDistance <= 0) {
        targetProgress = 1
        return
      }

      targetProgress = Math.min(
        1,
        Math.max(
          0,
          -rect.top / scrollDistance
        )
      )
    }

    const updateStage = () => {
      const rect = section.getBoundingClientRect()
      const sectionHeight = section.offsetHeight
      const viewportHeight = window.innerHeight

      /*
       * Antes da seção:
       * o palco permanece no fluxo normal.
       */
      if (rect.top > 0) {
        stage.classList.remove('is-fixed')
        stage.classList.remove('is-finished')

        stage.style.top = ''
        stage.style.left = ''
        stage.style.width = ''

        return
      }

      /*
       * Enquanto ainda estamos dentro da área
       * de animação, o palco fica preso na viewport.
       */
      if (
        rect.top <= 0 &&
        rect.bottom > viewportHeight
      ) {
        const stageRect =
          stage.getBoundingClientRect()

        stage.classList.remove('is-finished')
        stage.classList.add('is-fixed')

        stage.style.top = '0px'
        stage.style.left = `${stageRect.left}px`
        stage.style.width = `${section.clientWidth}px`

        return
      }

      /*
       * Quando chegamos ao final dos 300vh,
       * o palco deixa de ficar fixo e permanece
       * exatamente no final da seção.
       */
      if (rect.bottom <= viewportHeight) {
        stage.classList.remove('is-fixed')
        stage.classList.add('is-finished')

        stage.style.top = ''
        stage.style.left = ''
        stage.style.width = ''
      }
    }

    const animate = () => {
      currentProgress +=
        (targetProgress - currentProgress) * 0.1

      wordRefs.current.forEach(
        (word, index) => {
          if (!word) return

          /*
           * Cada palavra possui sua própria
           * faixa dentro da timeline.
           */
          const start = index * 0.18
          const end = start + 0.42

          const wordProgress = Math.min(
            1,
            Math.max(
              0,
              (currentProgress - start) /
                (end - start)
            )
          )

          /*
           * Ease-out para a palavra chegar
           * suavemente à posição final.
           */
          const eased =
            1 -
            Math.pow(
              1 - wordProgress,
              3
            )

          const distance =
            110 + index * 18

          const translateY =
            (1 - eased) * distance

          const opacity = Math.min(
            1,
            wordProgress * 1.8
          )

          word.style.transform =
            `translate3d(0, ${translateY}%, 0)`

          word.style.opacity = opacity
        }
      )

      animationFrame =
        requestAnimationFrame(animate)
    }

    const handleScroll = () => {
      updateProgress()
      updateStage()
    }

    const handleResize = () => {
      updateProgress()
      updateStage()
    }

    updateProgress()
    updateStage()

    window.addEventListener(
      'scroll',
      handleScroll,
      { passive: true }
    )

    window.addEventListener(
      'resize',
      handleResize
    )

    animationFrame =
      requestAnimationFrame(animate)

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll
      )

      window.removeEventListener(
        'resize',
        handleResize
      )

      if (animationFrame) {
        cancelAnimationFrame(
          animationFrame
        )
      }

      stage.classList.remove('is-fixed')
      stage.classList.remove('is-finished')

      stage.style.top = ''
      stage.style.left = ''
      stage.style.width = ''
    }
  }, [])

  return (
    <section
      className="brasa-kitchen"
      id="cozinha"
      ref={sectionRef}
    >
      <div
        className="brasa-kitchen__sticky"
        ref={stageRef}
      >
        <div className="brasa-kitchen__media">
          <video
            className="brasa-kitchen__video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          >
            <source
              src="/media/kitchenVideo.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        <div className="brasa-kitchen__veil" />

        <div className="brasa-kitchen__words">
          {words.map((word, index) => (
            <strong
              key={word}
              ref={(element) => {
                wordRefs.current[index] = element
              }}
              className={`brasa-kitchen__word brasa-kitchen__word--${
                index + 1
              }`}
            >
              {word}
            </strong>
          ))}
        </div>
      </div>
    </section>
  )
}
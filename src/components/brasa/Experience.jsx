import { useEffect, useRef } from 'react'

import '../../styles/brasa/experience.css'

const experiences = [
  {
    id: 'arrival',
    label: 'CHEGAR.',
    color: 'orange',
    video: '/media/chegarVideo.mp4',
  },
  {
    id: 'fire',
    label: 'SENTAR',
    color: 'cream',
    video: '/media/sentarVideo.mp4',
  },
  {
    id: 'table',
    label: 'AMAR',
    color: 'orange-dark',
    video: '/media/amarVideo.mp4',
  },
  {
    id: 'night',
    label: 'FICAR.',
    color: 'cream-dark',
    video: '/media/ficarVideo.mp4',
  },
]

export default function Experience() {
  const itemsRef = useRef([])

  useEffect(() => {
    const items = itemsRef.current

    if (!items.length) return

    let frame = null

    const clamp = (value, min, max) => {
      return Math.max(min, Math.min(max, value))
    }

    const ease = (value) => {
      return value * value * (3 - 2 * value)
    }

    const update = () => {
      items.forEach((item) => {
        if (!item) return

        const media = item.querySelector(
          '.brasa-experience__media'
        )

        const label = item.querySelector(
          '.brasa-experience__label'
        )

        if (!media || !label) return

        const rect = item.getBoundingClientRect()

        const progress = clamp(
          -rect.top / rect.height,
          0,
          1
        )

        /* ==================================================
           PALAVRA
           ================================================== */

        /*
          0.00 → 0.25
          Palavra permanece completamente visível.

          0.25 → 0.43
          Cortina cobre a palavra e ela desaparece.
        */

        const exitProgress = clamp(
          (progress - 0.25) / 0.18,
          0,
          1
        )

        const exitEase = ease(exitProgress)

        label.style.setProperty(
          '--curtain-progress',
          exitEase
        )

        const labelOpacity = clamp(
          1 -
            Math.max(
              0,
              (exitEase - 0.5) * 2
            ),
          0,
          1
        )

        label.style.opacity = labelOpacity

        label.style.transform = `
          translate3d(-50%, -50%, 0)
          scale(${1 - exitEase * 0.03})
        `

        /* ==================================================
           VÍDEO
           ================================================== */

        /*
          0.00 → 0.43
          Vídeo permanece grande.

          0.43 → 0.70
          Vídeo diminui.

          0.70 → 1.00
          Vídeo fica pequeno e congelado.
        */

        const shrinkStart = 0.43
        const shrinkEnd = 0.70

        const mediaProgress = clamp(
          (progress - shrinkStart) /
            (shrinkEnd - shrinkStart),
          0,
          1
        )

        const animationProgress =
          ease(mediaProgress)

        const initialScale = 1
        const finalScale = 0.28

        const scale =
          initialScale -
          animationProgress *
            (initialScale - finalScale)

        const direction =
          Number(item.dataset.index) % 2 === 0
            ? 1
            : -1

        const x =
          animationProgress *
          32 *
          direction

        const y =
          animationProgress *
          30

        const radius =
          animationProgress * 18

        media.style.transform = `
          translate3d(
            ${x}vw,
            ${y}vh,
            0
          )
          scale(${scale})
        `

        media.style.borderRadius =
          `${radius}px`
      })

      frame = requestAnimationFrame(update)
    }

    frame = requestAnimationFrame(update)

    window.addEventListener(
      'scroll',
      update,
      { passive: true }
    )

    window.addEventListener(
      'resize',
      update
    )

    return () => {
      window.removeEventListener(
        'scroll',
        update
      )

      window.removeEventListener(
        'resize',
        update
      )

      if (frame) {
        cancelAnimationFrame(frame)
      }
    }
  }, [])

  return (
    <section
      className="brasa-experience"
      id="experiencia"
    >
      <div className="brasa-experience__feed">
        {experiences.map((experience, index) => (
          <article
            className={`
              brasa-experience__item
              brasa-experience__item--${experience.color}
            `}
            data-index={index}
            key={experience.id}
            ref={(element) => {
              itemsRef.current[index] = element
            }}
          >
            <div className="brasa-experience__media">
              <video
                className="brasa-experience__video"
                src={experience.video}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-label={`Vídeo da experiência: ${experience.label}`}
              />

              <span className="brasa-experience__label">
                <span className="brasa-experience__label-text">
                  {experience.label}
                </span>
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
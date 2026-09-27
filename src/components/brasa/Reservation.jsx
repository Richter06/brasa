import { useEffect, useRef } from 'react'

import '../../styles/brasa/reservation.css'

export default function Reservation() {
  const sectionRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const button = buttonRef.current
    const area = button?.parentElement

    if (!section || !button || !area) return

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const hasHover = window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    ).matches

    if (reducedMotion) {
      section.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('is-visible')
          observer.disconnect()
        }
      },
      {
        threshold: 0.2,
      }
    )

    observer.observe(section)

    if (!hasHover) {
      return () => {
        observer.disconnect()
      }
    }

    const limite = 20

    const handleMouseMove = (event) => {
      const rect = button.getBoundingClientRect()

      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2

      const areaRect = area.getBoundingClientRect()

      const activationX = areaRect.width / 2
      const activationY = areaRect.height / 2

      const dx =
        (event.clientX - cx) /
        activationX

      const dy =
        (event.clientY - cy) /
        activationY

      const distance = Math.hypot(dx, dy)
      const factor = Math.min(1, distance)

      button.style.transform = `
        translate(
          ${dx * limite * factor}px,
          ${dy * limite * factor}px
        )
      `
    }

    const handleMouseLeave = () => {
      button.style.transform = ''
    }

    area.addEventListener(
      'mousemove',
      handleMouseMove
    )

    area.addEventListener(
      'mouseleave',
      handleMouseLeave
    )

    return () => {
      observer.disconnect()

      area.removeEventListener(
        'mousemove',
        handleMouseMove
      )

      area.removeEventListener(
        'mouseleave',
        handleMouseLeave
      )
    }
  }, [])

  return (
    <section
      className="brasa-reservation"
      id="reservas"
      ref={sectionRef}
    >
      <div
        className="brasa-media brasa-media--reservation"
        data-media-slot="reservation-photo"
        aria-hidden="true"
      />

      <div className="brasa-reservation__veil" />

      <div className="brasa-reservation__content">
        <div className="brasa-reservation__eyebrow">
          RESERVAS
        </div>

        <h2 className="brasa-reservation__title">
          <span className="brasa-reservation__word">
            Vem
          </span>

          <span className="brasa-reservation__word">
            para
          </span>

          <span className="brasa-reservation__word">
            a
          </span>

          <span className="brasa-reservation__word">
            mesa.
          </span>
        </h2>

        <p className="brasa-reservation__text">
          Uma boa noite começa antes do primeiro prato.
          Escolha seu lugar e deixe o resto com a gente.
        </p>

        <div className="brasa-reservation__button-area">
          <a
            ref={buttonRef}
            className="brasa-button brasa-reservation__button"
            href="#contato"
          >
            <span>RESERVAR UMA MESA</span>
          </a>
        </div>
      </div>

      <div
        className="brasa-reservation__edge"
        aria-hidden="true"
      >
        <span>COM AMOR</span>
        <span>BRASA</span>
      </div>
    </section>
  )
}
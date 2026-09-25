import { useEffect, useRef, useState } from 'react'

import '../../styles/brasa/intro.css'

export default function Intro() {
  const sectionRef = useRef(null)
  const mediaRef = useRef(null)
  const videoRef = useRef(null)

  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    const media = mediaRef.current
    const video = videoRef.current

    if (!section || !media || !video) return

    /*
     * Carrega o vídeo imediatamente e posiciona
     * no primeiro frame sem iniciar a reprodução.
     */
    video.load()

    const showFirstFrame = () => {
      video.currentTime = 0
    }

    if (video.readyState >= 2) {
      showFirstFrame()
    } else {
      video.addEventListener(
        'loadeddata',
        showFirstFrame,
        { once: true }
      )
    }

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    )

    if (reducedMotion.matches) return

    let animationFrame = null

    let targetRotateX = 0
    let targetRotateY = 0

    let currentRotateX = 0
    let currentRotateY = 0

    let targetScroll = 0
    let currentScroll = 0

    const hasHover = window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    ).matches

    const update = () => {
      currentRotateX +=
        (targetRotateX - currentRotateX) * 0.08

      currentRotateY +=
        (targetRotateY - currentRotateY) * 0.08

      currentScroll +=
        (targetScroll - currentScroll) * 0.08

      media.style.setProperty(
        '--intro-rotate-x',
        `${currentRotateX}deg`
      )

      media.style.setProperty(
        '--intro-rotate-y',
        `${currentRotateY}deg`
      )

      media.style.setProperty(
        '--intro-scroll-y',
        `${currentScroll}px`
      )

      animationFrame = requestAnimationFrame(update)
    }

    const handleMouseMove = (event) => {
      const rect = media.getBoundingClientRect()

      const x =
        (event.clientX - rect.left) / rect.width

      const y =
        (event.clientY - rect.top) / rect.height

      const normalizedX = x - 0.5
      const normalizedY = y - 0.5

      targetRotateY = normalizedX * 5
      targetRotateX = normalizedY * -5
    }

    const handleMouseLeave = () => {
      targetRotateX = 0
      targetRotateY = 0

      pauseVideo()
    }

    const updateScroll = () => {
      const rect = section.getBoundingClientRect()
      const viewportHeight = window.innerHeight

      const progress =
        (viewportHeight - rect.top) /
        (viewportHeight + rect.height)

      const clampedProgress = Math.max(
        0,
        Math.min(1, progress)
      )

      targetScroll =
        (clampedProgress - 0.5) * -32
    }

    const playVideo = () => {
      video.play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch(() => {
          setIsPlaying(false)
        })
    }

    const pauseVideo = () => {
      video.pause()
      setIsPlaying(false)
    }

    /*
     * Mouse/hover só é ativado em dispositivos
     * que realmente possuem mouse e hover.
     *
     * Isso impede que o primeiro toque no celular
     * seja interpretado como mouseenter + click.
     */
    if (hasHover) {
      media.addEventListener(
        'mousemove',
        handleMouseMove
      )

      media.addEventListener(
        'mouseenter',
        playVideo
      )

      media.addEventListener(
        'mouseleave',
        handleMouseLeave
      )
    }

    window.addEventListener(
      'scroll',
      updateScroll,
      { passive: true }
    )

    updateScroll()

    animationFrame = requestAnimationFrame(update)

    return () => {
      if (hasHover) {
        media.removeEventListener(
          'mousemove',
          handleMouseMove
        )

        media.removeEventListener(
          'mouseenter',
          playVideo
        )

        media.removeEventListener(
          'mouseleave',
          handleMouseLeave
        )
      }

      window.removeEventListener(
        'scroll',
        updateScroll
      )

      video.removeEventListener(
        'loadeddata',
        showFirstFrame
      )

      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [])

  const playVideo = () => {
    const video = videoRef.current

    if (!video) return

    video.play()
      .then(() => {
        setIsPlaying(true)
      })
      .catch(() => {
        setIsPlaying(false)
      })
  }

  const pauseVideo = () => {
    const video = videoRef.current

    if (!video) return

    video.pause()

    setIsPlaying(false)
  }

  const handleTouch = () => {
    const video = videoRef.current

    if (!video) return

    if (video.paused) {
      playVideo()
    } else {
      pauseVideo()
    }
  }

  const handleVideoEnded = () => {
    setIsPlaying(false)
  }

  return (
    <section
      className="brasa-section brasa-intro"
      id="intro"
      ref={sectionRef}
    >
      <div className="brasa-intro__copy">
        <h2>
          <span className="brasa-intro__headline">
            Brasil tem muito a dizer.
          </span>

          <span className="brasa-intro__headline">
            A gente prefere servir.
          </span>
        </h2>

        <p>
          Ingredientes brasileiros, fogo alto e respeito pelo
          tempo de cada coisa. Uma cozinha contemporânea sem
          perder o calor de uma boa mesa.
        </p>
      </div>

      <div
        className={`brasa-media brasa-media--wide brasa-intro__media ${
          isPlaying ? 'is-playing' : ''
        }`}
        ref={mediaRef}
        onClick={handleTouch}
      >
        <video
          ref={videoRef}
          className="brasa-intro__video"
          loop
          muted
          playsInline
          preload="auto"
          poster="/media/intro-poster.jpg"
          onEnded={handleVideoEnded}
          aria-label="Vídeo mostrando a cozinha da BRASA"
        >
          <source
            src="/media/introVideo.mp4"
            type="video/mp4"
          />
        </video>

        <div
          className="brasa-intro__video-hint"
          aria-hidden="true"
        >
          <span>
            {isPlaying ? 'PAUSAR' : 'VER EM MOVIMENTO'}
          </span>

          <span className="brasa-intro__video-arrow">
            {isPlaying ? 'Ⅱ' : '↗'}
          </span>
        </div>
      </div>
    </section>
  )
}
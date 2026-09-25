import { useEffect, useRef, useState } from 'react'

import { signatureDishes } from '../../data/brasa'

import '../../styles/brasa/signature-dishes.css'

function DishMedia({ dish }) {
  const mediaRef = useRef(null)
  const videoRef = useRef(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const media = mediaRef.current
    const video = videoRef.current

    if (!media || !video) return

    video.load()

    const showFirstFrame = () => {
      try {
        video.currentTime = 0
      } catch {
        // O navegador pode bloquear a alteração antes do vídeo estar pronto.
      }
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

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true)

      return () => {
        video.removeEventListener(
          'loadeddata',
          showFirstFrame
        )
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.05,
      }
    )

    observer.observe(media)

    return () => {
      observer.disconnect()

      video.removeEventListener(
        'loadeddata',
        showFirstFrame
      )
    }
  }, [])

  const playVideo = () => {
    const video = videoRef.current

    if (!video) return

    video
      .play()
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

  const handleMouseEnter = () => {
    const hasHover = window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    ).matches

    if (!hasHover) return

    playVideo()
  }

  const handleMouseLeave = () => {
    const hasHover = window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    ).matches

    if (!hasHover) return

    pauseVideo()
  }

  const handleVideoEnded = () => {
    setIsPlaying(false)
  }

  return (
    <div
      className={`brasa-dish__media ${
        isVisible ? 'is-visible' : ''
      } ${isPlaying ? 'is-playing' : ''}`}
      ref={mediaRef}
      onClick={handleTouch}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      aria-label={
        isPlaying
          ? `Pausar vídeo do prato ${dish.name}`
          : `Ver vídeo do prato ${dish.name}`
      }
      aria-pressed={isPlaying}
      onKeyDown={(event) => {
        if (
          event.key === 'Enter' ||
          event.key === ' '
        ) {
          event.preventDefault()
          handleTouch()
        }
      }}
    >
      <video
        ref={videoRef}
        className="brasa-dish__video"
        loop
        muted
        playsInline
        preload="auto"
        onEnded={handleVideoEnded}
      >
        <source
          src={dish.video}
          type="video/mp4"
        />
      </video>

      <div
        className="brasa-dish__video-hint"
        aria-hidden="true"
      >
        <span>
          {isPlaying ? 'PAUSAR' : 'VER EM MOVIMENTO'}
        </span>

        <span className="brasa-dish__video-arrow">
          {isPlaying ? 'Ⅱ' : '↗'}
        </span>
      </div>
    </div>
  )
}

export default function SignatureDishes() {
  return (
    <section
      className="brasa-section brasa-signature"
      id="pratos"
    >
      <div className="brasa-section__heading">
        <div className="brasa-section__eyebrow">
          DA CASA
        </div>

        <h2>
          Algumas coisas a gente faz questão de servir.
        </h2>
      </div>

      <div className="brasa-dishes">
        {signatureDishes.map((dish) => (
          <article
            className="brasa-dish"
            key={dish.name}
          >
            <div className="brasa-dish__meta">
              <span>{dish.price}</span>
            </div>

            <DishMedia dish={dish} />

            <div className="brasa-dish__copy">
              <h3>{dish.name}</h3>
              <p>{dish.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
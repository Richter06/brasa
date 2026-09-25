import { useEffect, useRef, useState } from 'react'

import { signatureDishes } from '../../data/brasa'

import '../../styles/brasa/signature-dishes.css'

function splitWords(text) {
  const words = text.split(' ')

  return words.map((word, index) => (
    <span key={`${word}-${index}`}>
      <span
        className="brasa-word"
        style={{
          '--word-index': index,
        }}
      >
        {word}
      </span>

      {index < words.length - 1 && ' '}
    </span>
  ))
}

function DishMedia({ dish, isVisible }) {
  const mediaRef = useRef(null)
  const videoRef = useRef(null)

  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const media = mediaRef.current

    if (!media) return

    if (!('IntersectionObserver' in window)) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
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
      .catch((error) => {
        console.error(
          `Não foi possível reproduzir o vídeo de ${dish.name}:`,
          error
        )

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
        onEnded={() => setIsPlaying(false)}
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

function Dish({ dish, index }) {
  const dishRef = useRef(null)

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = dishRef.current

    if (!element) return

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -8% 0px',
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <article
      className={`brasa-dish ${
        isVisible ? 'is-visible' : ''
      }`}
      ref={dishRef}
      style={{
        '--dish-index': index,
      }}
    >
      <div className="brasa-dish__meta">
        <span>{dish.price}</span>
      </div>

      <DishMedia
        dish={dish}
        isVisible={isVisible}
      />

      <div className="brasa-dish__copy">
        <h3 aria-label={dish.name}>
          {splitWords(dish.name)}
        </h3>

        <p>
          {splitWords(dish.description)}
        </p>
      </div>
    </article>
  )
}

export default function SignatureDishes() {
  const headingRef = useRef(null)

  const [headingVisible, setHeadingVisible] =
    useState(false)

  useEffect(() => {
    const heading = headingRef.current

    if (!heading) return

    if (!('IntersectionObserver' in window)) {
      setHeadingVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeadingVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.3,
      }
    )

    observer.observe(heading)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section
      className="brasa-section brasa-signature"
      id="pratos"
    >
      <div
        className={`brasa-section__heading ${
          headingVisible ? 'is-visible' : ''
        }`}
        ref={headingRef}
      >
        <div className="brasa-section__eyebrow">
          DA CASA
        </div>

        <h2>
          {splitWords(
            'Algumas coisas a gente faz questão de servir.'
          )}
        </h2>
      </div>

      <div className="brasa-dishes">
        {signatureDishes.map((dish, index) => (
          <Dish
            key={dish.name}
            dish={dish}
            index={index}
          />
        ))}
      </div>
    </section>
  )
}
import { useEffect, useRef, useState } from 'react'

import { menuGroups } from '../../data/brasa'

import '../../styles/brasa/menu.css'

export default function Menu() {
  const [openGroup, setOpenGroup] = useState(0)
  const [openItem, setOpenItem] = useState(null)

  const videoRef = useRef(null)
  const viewerRef = useRef(null)

  const handleOpenGroup = (index) => {
    setOpenGroup(index)
    setOpenItem(null)
  }

  const handleHoverGroup = (index) => {
    const hasHover = window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    ).matches

    if (!hasHover) return

    setOpenGroup(index)
    setOpenItem(null)
  }

  const handleOpenItem = (groupIndex, itemIndex) => {
    const itemKey = `${groupIndex}-${itemIndex}`

    setOpenItem((current) => {
      if (current === itemKey) {
        return null
      }

      return itemKey
    })
  }

  const selected = (() => {
    if (openItem === null) return null

    const [groupIndex, itemIndex] = openItem
      .split('-')
      .map(Number)

    const group = menuGroups[groupIndex]

    if (!group) return null

    const item = group.items[itemIndex]

    if (!item) return null

    const [name, description, price, video] = item

    return {
      key: openItem,
      name,
      description,
      price,
      video,
    }
  })()

  useEffect(() => {
    const video = videoRef.current

    if (!video || !selected) return

    video.currentTime = 0

    video
      .play()
      .catch(() => {})
  }, [selected?.key])

  useEffect(() => {
    if (!selected) return

    viewerRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    })
  }, [selected?.key])

  return (
    <section
      className="brasa-section brasa-menu"
      id="menu"
    >
      <div className="brasa-section__heading">
        <div className="brasa-section__eyebrow">
          CARDÁPIO
        </div>

        <h2>
          Mais que comida, um abraço quentinho.
        </h2>
      </div>

      <div className="brasa-menu__layout">
        <div className="brasa-menu__panels">
          {menuGroups.map((group, groupIndex) => {
            const isOpen = openGroup === groupIndex

            return (
              <article
                className={`brasa-menu-panel ${
                  isOpen ? 'is-open' : ''
                }`}
                key={group.title}
                onMouseEnter={() =>
                  handleHoverGroup(groupIndex)
                }
              >
                <button
                  type="button"
                  className="brasa-menu-panel__trigger"
                  onClick={() =>
                    handleOpenGroup(groupIndex)
                  }
                  aria-expanded={isOpen}
                >
                  <span className="brasa-menu-panel__title">
                    {group.title}
                  </span>
                </button>

                <div className="brasa-menu-panel__content">
                  <div className="brasa-menu-panel__items">
                    {group.items.map(
                      (
                        [name, , price],
                        itemIndex
                      ) => {
                        const itemKey = `${groupIndex}-${itemIndex}`

                        const isItemOpen =
                          openItem === itemKey

                        return (
                          <article
                            className={`brasa-menu-item ${
                              isItemOpen
                                ? 'is-open'
                                : ''
                            }`}
                            key={name}
                          >
                            <button
                              type="button"
                              className="brasa-menu-item__trigger"
                              onClick={() =>
                                handleOpenItem(
                                  groupIndex,
                                  itemIndex
                                )
                              }
                              aria-expanded={isItemOpen}
                            >
                              <span className="brasa-menu-item__name">
                                {name}
                              </span>

                              <span className="brasa-menu-item__price">
                                {price}
                              </span>
                            </button>
                          </article>
                        )
                      }
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <aside
          className={`brasa-menu__viewer ${
            selected ? 'is-active' : ''
          }`}
          ref={viewerRef}
        >
          {selected ? (
            <div className="brasa-menu__viewer-inner">
              <div className="brasa-menu__viewer-video-wrap">
                <video
                  key={selected.video}
                  ref={videoRef}
                  className="brasa-menu__viewer-video"
                  muted
                  loop
                  autoPlay
                  playsInline
                  preload="metadata"
                  aria-label={`Vídeo de ${selected.name}`}
                >
                  <source
                    src={selected.video}
                    type="video/mp4"
                  />
                </video>
              </div>

              <div className="brasa-menu__viewer-details">
                <span className="brasa-menu__viewer-label">
                  DA BRASA
                </span>

                <h5>{selected.name}</h5>

                <p className="brasa-menu__viewer-description">
                  {selected.description}
                </p>

                <span className="brasa-menu__viewer-price">
                  {selected.price}
                </span>
              </div>
            </div>
          ) : (
            <div className="brasa-menu__viewer-placeholder">
              <span className="brasa-menu__viewer-placeholder-eyebrow">
                DA BRASA
              </span>

              <p>
                Toque em um prato para ver o vídeo, a
                descrição e o preço.
              </p>
            </div>
          )}
        </aside>
      </div>
    </section>
  )
}
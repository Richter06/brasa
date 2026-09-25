import { menuGroups } from '../../data/brasa'

export default function Menu() {
  return (
    <section className="brasa-section" id="menu">
      <div className="brasa-section__heading"><div className="brasa-section__eyebrow">04 / CARDÁPIO</div><h2>Comida que não precisa de legenda.</h2></div>
      <div className="brasa-menu__layout">
        <div className="brasa-menu__image brasa-media" data-media-slot="menu-photo" />
        <div className="brasa-menu__groups">
          {menuGroups.map((group) => (
            <section className="brasa-menu__group" key={group.title}>
              <h3>{group.title}</h3>
              {group.items.map(([name, description, price]) => (
                <article className="brasa-menu-item" key={name}><div><h4>{name}</h4><p>{description}</p></div><span>{price}</span></article>
              ))}
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}

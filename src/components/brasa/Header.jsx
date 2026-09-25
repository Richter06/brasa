export default function Header() {
  return (
    <header className="brasa-header">
      <a className="brasa-logo" href="#top" aria-label="BRASA, início">BRASA</a>
      <nav className="brasa-nav" aria-label="Navegação principal">
        <a href="#menu">MENU</a><a href="#casa">A CASA</a><a href="#reservas">RESERVAS</a>
      </nav>
      <a className="brasa-header-cta" href="#reservas">RESERVAR</a>
    </header>
  )
}

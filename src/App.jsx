import Header from './components/brasa/Header'
import Hero from './components/brasa/Hero'
import Intro from './components/brasa/Intro'
import SignatureDishes from './components/brasa/SignatureDishes'
import TheKitchen from './components/brasa/TheKitchen'
import Menu from './components/brasa/Menu'
import Experience from './components/brasa/Experience'
import Restaurant from './components/brasa/Restaurant'
import Story from './components/brasa/Story'
import Reservation from './components/brasa/Reservation'
import Footer from './components/brasa/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <SignatureDishes />
        <TheKitchen />
        <Menu />
        <Experience />
        <Restaurant />
        <Story />
        <Reservation />
      </main>
      <Footer />
    </>
  )
}

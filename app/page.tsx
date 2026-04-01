import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Menu from './components/Menu'
import Services from './components/Services'
import Reviews from './components/Reviews'
import ReviewSystem from './components/ReviewSystem'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import ScrollToTop from './components/ScrollToTop'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Menu />
      <Services />
      <Reviews />
      <ReviewSystem />
      <Contact />
      <Footer />
      <ScrollToTop />
      <FloatingWhatsApp />
    </main>
  )
}
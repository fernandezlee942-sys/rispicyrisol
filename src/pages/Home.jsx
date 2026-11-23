import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import About from '../components/About'
import Menu from '../components/Menu'
import Steps from '../components/Steps'
import Testimonials from '../components/Testimonials'
import Faq from '../components/Faq'
import useReveal from '../components/useReveal'

export default function Home() {
    useReveal()

    return (
        <>
            <Hero />
            <Marquee />
            <About />
            <Menu />
            <Steps />
            <Testimonials />
            <Faq />
        </>
    )
}
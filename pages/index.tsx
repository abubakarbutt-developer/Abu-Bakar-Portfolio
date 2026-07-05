import React, { useState, useRef } from 'react';
import Head from 'next/head';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import Preloader from '../components/Preloader';
import { useSmoothScroll } from '../hooks/useSmoothScroll';
import portfolioData from '../api/portfolioData.json';

export default function Home() {
  const { personal, about, navLinks, skills, projects, accordions } = portfolioData;
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize smooth scroll
  useSmoothScroll();

  useGSAP(() => {
    gsap.from('.logo-char', {
      x: -40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.04,
      ease: 'power2.out',
      delay: 0.1
    });
  }, { scope: containerRef });

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
    // Refresh ScrollTrigger as layout might have changed or positions need recalculation
    setTimeout(() => {
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.refresh();
    }, 100);
  };

  return (
    <>
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}

      <div
        ref={containerRef}
        className="bg-background text-foreground min-h-screen transition-colors duration-300 overflow-x-hidden w-full max-w-full"
        style={{ opacity: showPreloader ? 0 : 1, transition: 'opacity 0.5s ease-in-out' }}
      >
        <Head>
          <title>{`${personal.name} | ${personal.role}`}</title>
          <meta name="description" content={personal.tagline} />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Navbar links={navLinks} isOpen={isNavOpen} setIsOpen={setIsNavOpen} />

        <main>
          <Hero
            name={personal.name}
            role={personal.role}
            tagline={personal.tagline}
            socials={personal.socials}
          />

          <About title={about.title} description={about.description} />

          <Skills skills={skills} />

          <Projects projects={projects} />

          <Contact email={personal.email} accordions={accordions} />
        </main>

        <Footer />
        <BackToTop />
      </div>
    </>
  );
}


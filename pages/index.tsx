import React, { useState, useRef } from 'react';
import Head from 'next/head';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import portfolioData from '../api/portfolioData.json';

export default function Home() {
  const { personal, about, navLinks, skills, projects, accordions } = portfolioData;
  const [isNavOpen, setIsNavOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen text-slate-900 dark:text-slate-100 selection:bg-blue-500/30 transition-colors duration-300">
      <Head>
        <title>{personal.name} | {personal.role}</title>
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
  );
}

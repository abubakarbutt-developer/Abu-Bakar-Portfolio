import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin, FaPaperPlane, FaQuestionCircle } from 'react-icons/fa';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import Button from './ui/Button';
import Accordion from './ui/Accordion';
import Badge from './ui/Badge';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface ContactProps {
    email: string;
    accordions: { title: string; content: string }[];
}

const Contact: React.FC<ContactProps> = ({ email, accordions }) => {
    const containerRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        const formDataObj = new FormData();
        formDataObj.append('name', formData.name);
        formDataObj.append('email', formData.email);
        formDataObj.append('subject', formData.subject);
        formDataObj.append('message', formData.message);
        formDataObj.append('_template', 'table');
        formDataObj.append('_captcha', 'false');

        try {
            const response = await fetch(`https://formsubmit.co/ajax/${email}`, {
                method: "POST",
                headers: {
                    "Accept": "application/json"
                },
                body: formDataObj
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error('Error sending email:', error);
            setStatus('error');
        }
    };

    useGSAP(() => {
        gsap.from('.contact-anim', {
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top bottom-=100',
            },
            y: 40,
            opacity: 0,
            stagger: 0.15,
            duration: 1,
            ease: 'power3.out',
        });

        // Corner blurs pulse
        gsap.to('.contact-blur', {
            scale: 1.2,
            opacity: 0.4,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            stagger: 2
        });
    }, { scope: containerRef });

    return (
        <section id="contact" ref={containerRef} className="py-32 bg-background relative overflow-hidden">
            {/* Professional Background Elements */}
            <div className="contact-blur absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="contact-blur absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-20 contact-anim">
                    <Badge variant="primary" className="mb-4">Get In Touch</Badge>
                    <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter text-white">
                        Let's build something <span className="animate-rgb-text">incredible</span>.
                    </h2>
                    <p className="text-secondary max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
                        I'm currently available for new opportunities and freelance projects.
                        Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Left Side: Contact Info & FAQ */}
                    <div className="lg:col-span-5 space-y-10 contact-anim">
                        {/* Status Card */}
                        <div className="glass-card p-8 rounded-3xl border border-white/5 relative group overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent opacity-50" />
                            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-white">
                                <span className="p-2 bg-primary/10 rounded-lg text-primary"><FaMapMarkerAlt size={20} /></span>
                                Availability
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 group/item">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary group-hover/item:bg-primary/20 transition-all">
                                        <FaEnvelope size={20} />
                                    </div>
                                    <div>
                                        <div className="text-xs uppercase tracking-widest text-secondary font-bold mb-1">Email Me</div>
                                        <div className="text-white font-medium select-all">{email}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 group/item">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-accent group-hover/item:bg-accent/20 transition-all">
                                        <FaMapMarkerAlt size={20} />
                                    </div>
                                    <div>
                                        <div className="text-xs uppercase tracking-widest text-secondary font-bold mb-1">Location</div>
                                        <div className="text-white font-medium">Remote / Worldwide</div>
                                    </div>
                                </div>
                            </div>

                            {/* Social Shortcuts */}
                            <div className="mt-12 pt-8 border-t border-white/5 flex gap-4">
                                <a href="https://github.com/abubakarbutt-developer" target="_blank" className="p-4 bg-white/5 rounded-2xl text-secondary hover:text-white hover:bg-white/10 transition-all duration-300">
                                    <FaGithub size={24} />
                                </a>
                                <a href="https://www.linkedin.com/in/abu-bakar-butt-68a95b318" target="_blank" className="p-4 bg-white/5 rounded-2xl text-secondary hover:text-white hover:bg-white/10 transition-all duration-300">
                                    <FaLinkedin size={24} />
                                </a>
                            </div>
                        </div>

                        {/* FAQ Sidebar */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold flex items-center gap-3 text-white px-2">
                                <span className="text-primary"><FaQuestionCircle size={24} /></span>
                                Common Questions
                            </h3>
                            <Accordion items={accordions} />
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="lg:col-span-7 contact-anim">
                        <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border border-white/5 bg-card-bg/40 backdrop-blur-3xl relative animate-rgb-border">
                            <h3 className="text-3xl font-bold mb-8 text-white flex items-center gap-4">
                                Send a Message
                                <span className="animate-float"><FaPaperPlane size={24} className="text-primary" /></span>
                            </h3>

                            {status === 'success' ? (
                                <div className="py-20 text-center animate-soft-bounce">
                                    <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center text-primary mx-auto mb-8 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                                        <FaPaperPlane size={40} />
                                    </div>
                                    <h4 className="text-3xl font-bold text-white mb-4">Transmission Successful!</h4>
                                    <p className="text-secondary text-lg mb-10 max-w-sm mx-auto">I've received your message and will get back to you shortly.</p>
                                    <Button
                                        variant="outline"
                                        onClick={() => setStatus('idle')}
                                        className="rounded-2xl px-10"
                                    >
                                        Send Another Signal
                                    </Button>
                                </div>
                            ) : (
                                <form className="space-y-8" onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <Input
                                                label="Full Name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Alex Doe"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Input
                                                label="Email Address"
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="alex@company.com"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Input
                                            label="Subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            placeholder="System Architecture Inquiry"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Textarea
                                            label="Your Message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Describe your vision or project requirements..."
                                            required
                                        />
                                    </div>

                                    {status === 'error' && (
                                        <p className="text-red-400 text-sm flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                            Transmission failed. Please check your network or try again.
                                        </p>
                                    )}

                                    <Button fullWidth size="lg" disabled={status === 'sending'} className="rounded-2xl h-16 text-lg group hover:scale-[1.02] transition-transform">
                                        {status === 'sending' ? (
                                            <span className="flex items-center gap-3">
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Sending...
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-3">
                                                Initiate Transmission
                                                <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform rotate-12" />
                                            </span>
                                        )}
                                    </Button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;

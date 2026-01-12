import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import Button from './ui/Button';
import Accordion from './ui/Accordion';

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
            const response = await fetch("https://formsubmit.co/ajax/iambakarbuttx8@gmail.com", {
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
                start: 'top bottom-=50',
            },
            y: 30,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8,
        });
    }, { scope: containerRef });

    return (
        <section id="contact" ref={containerRef} className="py-24 relative overflow-hidden">
            {/* Bg elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 contact-anim">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                        Have a project in mind or just want to chat? Feel free to reach out.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div className="contact-anim">
                        <div className="glass p-8 rounded-2xl relative bg-white/40 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800">
                            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>

                            {status === 'success' ? (
                                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 text-center text-green-500">
                                    <h4 className="text-xl font-semibold mb-2">Message Sent!</h4>
                                    <p>Thanks for reaching out. I'll get back to you shortly.</p>
                                    <button
                                        onClick={() => setStatus('idle')}
                                        className="mt-4 text-sm underline hover:text-green-400"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Input
                                            label="Name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Your Name"
                                            required
                                        />
                                        <Input
                                            label="Email"
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            required
                                        />
                                    </div>
                                    <Input
                                        label="Subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="Project Inquiry"
                                        required
                                    />
                                    <Textarea
                                        label="Message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell me about your project..."
                                        required
                                    />

                                    {status === 'error' && (
                                        <p className="text-red-500 text-sm">Something went wrong. Please try again or email me directly.</p>
                                    )}

                                    <Button fullWidth size="lg" disabled={status === 'sending'}>
                                        {status === 'sending' ? 'Sending...' : 'Send Message'}
                                    </Button>
                                </form>
                            )}
                        </div>
                    </div>

                    <div className="space-y-12 contact-anim">
                        <div>
                            <h3 className="text-2xl font-bold mb-6">Contact Info</h3>
                            <div className="space-y-4 text-slate-700 dark:text-slate-300">
                                <p className="flex items-center gap-3">
                                    <span className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-blue-500 dark:text-blue-400"><FaEnvelope /></span>
                                    {"iambakarbuttx8@gmail.com"}
                                </p>
                                <p className="flex items-center gap-3">
                                    <span className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-blue-500 dark:text-blue-400"><FaMapMarkerAlt /></span>
                                    Remote / Worldwide
                                </p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold mb-6">FAQ</h3>
                            <Accordion items={accordions} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;

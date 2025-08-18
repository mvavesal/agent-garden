"use client";
import { motion } from "motion/react";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import HorizontalAgentCards from "@/components/HorizontalAgentCards";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { MapPin, Lock, Search, Shield, Zap, Settings, Check } from "lucide-react";

export default function Home() {
    const [activeSection, setActiveSection] = useState('home');
    const [isAnnual, setIsAnnual] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'features', 'pricing'];
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="relative min-h-screen bg-black">
            {/* Animated gradient background */}
            <div className="fixed inset-0 bg-black">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/10 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent" />
            </div>

            {/* Animated grid pattern */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:80px_80px]" />

            {/* Floating particles effect */}
            {isMounted && (
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute h-1 w-1 bg-purple-500/30 rounded-full"
                            initial={{
                                x: Math.random() * window.innerWidth,
                                y: Math.random() * window.innerHeight
                            }}
                            animate={{
                                x: Math.random() * window.innerWidth,
                                y: Math.random() * window.innerHeight
                            }}
                            transition={{
                                duration: Math.random() * 20 + 10,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    ))}
                </div>
            )}

            <div className="relative z-10">
                <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />

                {/* Hero Section */}
                <section id="home" className="px-4 py-16 md:py-24">
                    {/* Glowing orb behind title */}
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-6"
                    >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-purple-300 border border-purple-500/30 rounded-full bg-purple-500/10 backdrop-blur-sm">
              ✨ Welcome to the Future of AI Assistance
            </span>
                    </motion.div>

                    <h1 className="relative z-10 mx-auto max-w-5xl text-center text-4xl font-bold md:text-6xl lg:text-8xl">
                        {["Agent", "Garden"].map((word, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.2,
                                    ease: "easeOut",
                                }}
                                className={`inline-block ${index === 0 ? 'mr-4' : ''}`}
                            >
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  {word}
                </span>
                            </motion.span>
                        ))}
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="relative z-10 mx-auto max-w-2xl mt-8 text-center text-xl font-light text-gray-300"
                    >
                        Cultivate powerful AI specialists tailored to your needs.
                        <span className="block mt-2 text-gray-400">
              From healthcare to productivity, our agents work 24/7 to transform how you work and live.
            </span>
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="relative z-10 mt-12 flex flex-wrap items-center justify-center gap-4"
                    >
                        <Link href="/dashboard">
                            <button className="group relative px-8 py-4 overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
                                <span className="relative z-10">Start Free</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </button>
                        </Link>

                        <button
                            onClick={() => scrollToSection('pricing')}
                            className="px-8 py-4 rounded-xl border border-gray-700 text-gray-300 font-semibold text-lg backdrop-blur-sm transition-all duration-300 hover:border-purple-500/50 hover:text-purple-300 hover:bg-purple-500/10"
                        >
                            View Pricing
                        </button>
                    </motion.div>

                    {/* Horizontal Scrolling Agent Cards */}
                    <HorizontalAgentCards />
                </section>

                {/* Features Section */}
                <section id="features" className="py-24 border-t border-gray-800">
                    <div className="max-w-7xl mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Enterprise-Grade Security
                </span>
                            </h2>
                            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                                Built on European infrastructure with privacy and compliance at its core
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: MapPin,
                                    title: "Europe-Based LLM",
                                    desc: "All data processing happens in secure European data centers, ensuring sovereignty and compliance",
                                    steps: [
                                        "Data stays within EU boundaries",
                                        "Full regulatory compliance",
                                        "Sovereign cloud infrastructure"
                                    ]
                                },
                                {
                                    icon: Lock,
                                    title: "GDPR Compliant",
                                    desc: "Full compliance with European data protection regulations, giving you complete control over your data",
                                    steps: [
                                        "Right to be forgotten",
                                        "Data portability guaranteed",
                                        "Consent management built-in"
                                    ]
                                },
                                {
                                    icon: Search,
                                    title: "Complete Transparency",
                                    desc: "Full audit logs and explainable AI decisions, know exactly how your agents process information",
                                    steps: [
                                        "Decision traceability",
                                        "Comprehensive audit trails",
                                        "Real-time monitoring"
                                    ]
                                },
                                {
                                    icon: Shield,
                                    title: "End-to-End Encryption",
                                    desc: "Military-grade encryption for all data in transit and at rest, keeping your information secure",
                                    steps: [
                                        "AES-256 encryption standard",
                                        "Zero-trust architecture",
                                        "Secure key management"
                                    ]
                                },
                                {
                                    icon: Zap,
                                    title: "99.9% Uptime",
                                    desc: "Enterprise SLA with guaranteed availability, ensuring your agents are always ready to work",
                                    steps: [
                                        "Global redundancy",
                                        "Auto-failover systems",
                                        "24/7 monitoring"
                                    ]
                                },
                                {
                                    icon: Settings,
                                    title: "Custom Deployment",
                                    desc: "On-premise or private cloud options available for maximum control and security",
                                    steps: [
                                        "On-premise installation",
                                        "Private cloud setup",
                                        "Hybrid deployment options"
                                    ]
                                }
                            ].map((feature, index) => {
                                const IconComponent = feature.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="h-full"
                                    >
                                        <CardSpotlight className="h-full border-gray-800 bg-gray-900/50 hover:border-purple-500/50">
                                            <div className="mb-4">
                                                <IconComponent className="h-8 w-8 text-purple-500" />
                                            </div>
                                            <p className="text-xl font-bold relative z-20 mt-2 text-white">
                                                {feature.title}
                                            </p>
                                            <div className="text-neutral-200 mt-4 relative z-20">
                                                {feature.desc}
                                                <ul className="list-none mt-4 space-y-2">
                                                    {feature.steps.map((step, stepIndex) => (
                                                        <Step key={stepIndex} title={step} />
                                                    ))}
                                                </ul>
                                            </div>
                                        </CardSpotlight>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section id="pricing" className="py-24 border-t border-gray-800">
                    <div className="max-w-7xl mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Simple, Transparent Pricing
                </span>
                            </h2>
                            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                                Start free and scale as you grow
                            </p>

                            {/* Billing Toggle */}
                            <div className="flex items-center justify-center mt-8">
                                <div className="flex items-center bg-gray-800/50 backdrop-blur-sm rounded-lg p-1 border border-gray-700">
                                    <button
                                        onClick={() => setIsAnnual(false)}
                                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                                            !isAnnual
                                                ? 'bg-purple-600 text-white shadow-lg'
                                                : 'text-gray-400 hover:text-white'
                                        }`}
                                    >
                                        Monthly
                                    </button>
                                    <button
                                        onClick={() => setIsAnnual(true)}
                                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                                            isAnnual
                                                ? 'bg-purple-600 text-white shadow-lg'
                                                : 'text-gray-400 hover:text-white'
                                        }`}
                                    >
                                        Annual
                                        <span className="ml-1 text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                                            Save 16%
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {/* Free Plan */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                                className="relative rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm p-8"
                            >
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
                                    <p className="text-gray-400">Perfect for getting started</p>
                                </div>
                                <div className="mb-8">
                                    <span className="text-5xl font-bold text-white">€0</span>
                                    <span className="text-gray-400">/month</span>
                                </div>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-center text-gray-300">
                                        <span className="text-green-500 mr-3">✓</span> 1 AI Agent
                                    </li>
                                    <li className="flex items-center text-gray-300">
                                        <span className="text-green-500 mr-3">✓</span> Basic Reports
                                    </li>
                                    <li className="flex items-center text-gray-300">
                                        <span className="text-green-500 mr-3">✓</span> Community Support
                                    </li>
                                    <li className="flex items-center text-gray-300">
                                        <span className="text-green-500 mr-3">✓</span> 1,000 interactions/month
                                    </li>
                                </ul>
                                <Link href="/dashboard">
                                    <button className="w-full py-3 rounded-lg border border-gray-700 text-white font-semibold hover:bg-gray-800 transition-all duration-300">
                                        Start Free
                                    </button>
                                </Link>
                            </motion.div>

                            {/* Pro Plan with Toggle */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                viewport={{ once: true }}
                                className="relative rounded-2xl border-2 border-purple-500 bg-gray-900/50 backdrop-blur-sm p-8"
                            >
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white text-sm font-semibold">
                                    POPULAR
                                </div>
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                                    <p className="text-gray-400">
                                        {isAnnual ? 'Best value for teams' : 'For growing teams'}
                                    </p>
                                </div>
                                <div className="mb-8">
                                    <span className="text-5xl font-bold text-white">
                                        {isAnnual ? '€7.55' : '€8.99'}
                                    </span>
                                    <span className="text-gray-400">/month</span>
                                    {isAnnual && (
                                        <span className="block text-sm text-gray-500 mt-2">
                                            Billed €90.60 annually
                                        </span>
                                    )}
                                </div>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-center text-gray-300">
                                        <span className="text-green-500 mr-3">✓</span> 10 AI Agents
                                    </li>
                                    <li className="flex items-center text-gray-300">
                                        <span className="text-green-500 mr-3">✓</span> Advanced Reports
                                    </li>
                                    <li className="flex items-center text-gray-300">
                                        <span className="text-green-500 mr-3">✓</span> Email Support
                                    </li>
                                    <li className="flex items-center text-gray-300">
                                        <span className="text-green-500 mr-3">✓</span> Priority Support
                                    </li>
                                    <li className="flex items-center text-gray-300">
                                        <span className="text-green-500 mr-3">✓</span> Unlimited interactions
                                    </li>
                                </ul>
                                <Link href="/dashboard">
                                    <button className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                                        {isAnnual ? 'Start Annual Plan' : 'Start Pro Trial'}
                                    </button>
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-gray-800 bg-black/50 backdrop-blur-xl">
                    <div className="max-w-7xl mx-auto px-4 py-12">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div className="col-span-1">
                                <div className="flex items-center gap-2 mb-4">
                                    <Image src={'/logo-white.png'} alt='logo' width={140} height={70} />
                                </div>
                                <p className="text-gray-400 text-sm">
                                    Cultivating AI specialists that transform how you work and live.
                                </p>
                                <div className="flex gap-4 mt-4">
                                    <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                        </svg>
                                    </a>
                                    <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                        </svg>
                                    </a>
                                    <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-white font-semibold mb-4">Product</h3>
                                <ul className="space-y-2">
                                    <li><a href="#features" className="text-gray-400 hover:text-purple-400 transition-colors">Features</a></li>
                                    <li><a href="#pricing" className="text-gray-400 hover:text-purple-400 transition-colors">Pricing</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">API Docs</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Integrations</a></li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-white font-semibold mb-4">Company</h3>
                                <ul className="space-y-2">
                                    <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">About</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Blog</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Careers</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Contact</a></li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-white font-semibold mb-4">Legal</h3>
                                <ul className="space-y-2">
                                    <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Privacy Policy</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Terms of Service</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">GDPR</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Cookie Policy</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
                            <p className="text-gray-400 text-sm">
                                © 2025 Agent Garden. All rights reserved.
                            </p>
                            <div className="flex items-center gap-2 mt-4 md:mt-0">
                                <span className="text-gray-400 text-sm">🇪🇺 Made with ❤️</span>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}

const Step = ({ title }: { title: string }) => {
    return (
        <li className="flex gap-2 items-start">
            <Check className="h-4 w-4 text-purple-500 mt-1 shrink-0" />
            <p className="text-white text-sm">{title}</p>
        </li>
    );
};

const Navbar = ({ activeSection, scrollToSection }: { activeSection: string; scrollToSection: (sectionId: string) => void }) => {
    const { user } = useUser();

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="sticky top-0 z-50 backdrop-blur-xl bg-black/50 border-b border-gray-800"
        >
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Image src={'/logo-white.png'} alt='logo' width={180} height={90} />
                </div>

                <div className="flex items-center gap-6">
                    <nav className="hidden md:flex items-center gap-6">
                        <button
                            onClick={() => scrollToSection('home')}
                            className={`transition-colors ${activeSection === 'home' ? 'text-purple-400' : 'text-gray-400 hover:text-white'}`}
                        >
                            Home
                        </button>
                        <button
                            onClick={() => scrollToSection('features')}
                            className={`transition-colors ${activeSection === 'features' ? 'text-purple-400' : 'text-gray-400 hover:text-white'}`}
                        >
                            Features
                        </button>
                        <button
                            onClick={() => scrollToSection('pricing')}
                            className={`transition-colors ${activeSection === 'pricing' ? 'text-purple-400' : 'text-gray-400 hover:text-white'}`}
                        >
                            Pricing
                        </button>
                    </nav>

                    {!user ? (
                        <Link href="/dashboard">
                            <button className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105">
                                Get Started
                            </button>
                        </Link>
                    ) : (
                        <div className="flex gap-4 items-center">
                            <Link href="/dashboard">
                                <Button className="bg-purple-600 hover:bg-purple-700 text-white border-2 border-purple-500 hover:border-purple-400">
                                    Dashboard
                                </Button>
                            </Link>
                            <UserButton />
                        </div>
                    )}
                </div>
            </div>
        </motion.nav>
);
};
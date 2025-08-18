"use client";
import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { AIDoctorAgents } from "@/shared/list";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HorizontalAgentCards() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoScrolling, setIsAutoScrolling] = useState(true);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Auto-scroll functionality
    useEffect(() => {
        if (!isAutoScrolling) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = prevIndex + 1;
                return nextIndex >= AIDoctorAgents.length ? 0 : nextIndex;
            });
        }, 3000); // Auto-scroll every 3 seconds

        return () => clearInterval(interval);
    }, [isAutoScrolling]);

    // Scroll to current index
    useEffect(() => {
        if (scrollContainerRef.current) {
            const cardWidth = 320; // Width of each card + gap
            const scrollPosition = currentIndex * cardWidth;
            scrollContainerRef.current.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }
    }, [currentIndex]);

    const handlePrevious = () => {
        setIsAutoScrolling(false);
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? AIDoctorAgents.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setIsAutoScrolling(false);
        setCurrentIndex((prevIndex) => 
            prevIndex === AIDoctorAgents.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handleMouseEnter = () => {
        setIsAutoScrolling(false);
    };

    const handleMouseLeave = () => {
        setIsAutoScrolling(true);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="relative mt-20 max-w-7xl mx-auto"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Section Header */}
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Meet Our AI Specialists
                    </span>
                </h2>
            </div>

            {/* Navigation Buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4 z-10">
                <button
                    onClick={handlePrevious}
                    className="w-10 h-10 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 text-white hover:bg-purple-600/80 transition-all duration-300 flex items-center justify-center"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-4 z-10">
                <button
                    onClick={handleNext}
                    className="w-10 h-10 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 text-white hover:bg-purple-600/80 transition-all duration-300 flex items-center justify-center"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Horizontal Scrolling Container */}
            <div
                ref={scrollContainerRef}
                className="overflow-x-auto scrollbar-hide pt-6"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                <div className="flex gap-6 px-4" style={{ width: `${AIDoctorAgents.length * 320}px` }}>
                    {AIDoctorAgents.map((agent, index) => (
                        <motion.div
                            key={agent.id}
                            whileHover={{ scale: 1.02, y: -5 }}
                            className="relative group flex-shrink-0 w-80"
                        >
                            {/* Glowing background effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            {/* Simple Card Content */}
                            <div className="relative h-[400px] p-0 rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 overflow-hidden">
                                {/* Agent Image */}
                                <div className="relative w-full h-72 overflow-hidden">
                                    <Image
                                        src={agent.image}
                                        alt={agent.specialist}
                                        fill
                                        className="object-cover object-top transition-transform duration-300 group-hover:scale-110"
                                    />
                                </div>

                                {/* Simple Info */}
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">
                                        {agent.specialist}
                                    </h3>
                                    
                                    {/* Review Stars */}
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, starIndex) => (
                                            <span key={starIndex} className="text-yellow-400 text-sm">
                                                ⭐
                                            </span>
                                        ))}
                                        <span className="text-gray-400 text-sm ml-2">5.0</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Scroll Indicators */}
            <div className="flex justify-center mt-8 gap-2">
                {Array.from({ length: Math.min(AIDoctorAgents.length, 10) }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setIsAutoScrolling(false);
                            setCurrentIndex(index);
                        }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentIndex % 10
                                ? 'bg-purple-500 w-6'
                                : 'bg-gray-600 hover:bg-gray-500'
                        }`}
                    />
                ))}
            </div>
        </motion.div>
    );
}
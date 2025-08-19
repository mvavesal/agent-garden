"use client"
import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAuth } from '@clerk/nextjs'
import { IconArrowRight, IconArrowLeft, IconStethoscope, IconCrown, IconStar, IconStarFilled, IconMessage } from '@tabler/icons-react'
import { Loader2Icon, Phone } from 'lucide-react'
import axios from 'axios'
import { AIDoctorAgents } from '@/shared/list'
import { Agent } from '../../_components/AgentCard'
import { sampleChats, sampleReviews } from '@/shared/sampleChats'

// Type definitions for chat and review objects
type ChatMessage = {
    sender: string;
    message: string;
}

type Review = {
    name: string;
    rating: number;
    comment: string;
    date: string;
}

type SampleChats = Record<number, ChatMessage[]>;
type SampleReviews = Record<number, Review[]>;

export default function AgentDetailsPage() {
    const params = useParams()
    const router = useRouter()
    const { has } = useAuth()
    const [loading, setLoading] = useState(false)

    // Get agent ID from URL params
    const agentId = parseInt(params.id as string)
    
    // Find the specific agent
    const agent = AIDoctorAgents.find((agent: Agent) => agent.id === agentId)

    // ✅ Check if the user has a 'pro' plan using Clerk's has() helper
    //@ts-ignore
    const paidUser = has && has({ plan: 'pro' })

    // If agent not found, show error
    if (!agent) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Agent Not Found</h1>
                    <p className="text-gray-600 mb-6">The requested agent could not be found.</p>
                    <Button onClick={() => router.push('/dashboard')} variant="outline">
                        <IconArrowLeft className="mr-2 h-4 w-4" />
                        Back to Dashboard
                    </Button>
                </div>
            </div>
        )
    }

    /**
     * 📞 Handle Start Consultation Button Click
     * Creates a new session with the selected doctor and redirects to the session page.
     */
    const onStartConsultation = async () => {
        setLoading(true)

        try {
            // Post the new session to backend API
            const result = await axios.post('/api/session-chat', {
                notes: 'New Query',
                selectedAgent: agent
            })

            if (result.data?.sessionId) {
                // Navigate to the new session page
                router.push('/dashboard/agents/' + result.data.sessionId)
            }
        } catch (error: any) {
            if (error.response?.status === 403) {
                console.error('Premium subscription required for this agent');
                // The button should already be disabled for non-pro users, but this adds extra protection
            } else {
                console.error('Failed to start consultation:', error);
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container mx-auto px-2 sm:px-4 py-8 max-w-7xl">
            {/* Back button */}
            <div className="mb-6">
                <Button
                    variant="ghost"
                    onClick={() => router.push('/dashboard')}
                    className="mb-4"
                >
                    <IconArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                </Button>
            </div>

            {/* Header Section */}
            <div className="mb-8">
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                    {/* Agent Image */}
                    <div className="relative flex-shrink-0">
                        {agent.subscriptionRequired && (
                            <Badge className="absolute top-4 right-4 z-10 bg-yellow-500 hover:bg-yellow-600">
                                <IconCrown className="mr-1 h-3 w-3" />
                                Premium
                            </Badge>
                        )}
                        <Image
                            src={agent.image}
                            alt={agent.specialist}
                            width={300}
                            height={300}
                            className="w-80 h-80 object-cover object-center rounded-lg"
                            style={{objectPosition: 'center top'}}
                        />
                    </div>

                    {/* Title and Basic Info */}
                    <div className="flex-1 space-y-4">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                {agent.specialist}
                            </h1>
                            <div className="flex items-center text-gray-600">
                                <span className="text-lg">{agent.category}</span>
                            </div>
                        </div>

                        {/* Tags */}
                        {agent.tags && agent.tags.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold mb-3">Specialties</h3>
                                <div className="flex flex-wrap gap-2">
                                    {agent.tags.map((tag, index) => (
                                        <Badge
                                            key={index}
                                            variant={tag === "Premium" ? "default" : "secondary"}
                                            className="px-3 py-1"
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Start Consultation Button */}
                        <div className="pt-4">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
                                <Button
                                    className="w-full sm:w-auto px-8 h-12 text-lg"
                                    onClick={onStartConsultation}
                                    disabled={(!paidUser && agent.subscriptionRequired) || loading}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2Icon className="mr-2 h-5 w-5 animate-spin" />
                                            Starting Consultation...
                                        </>
                                    ) : (
                                        <>
                                            Start Consultation
                                            <IconArrowRight className="ml-2 h-5 w-5" />
                                        </>
                                    )}
                                </Button>
                                
                                {/* Call Button */}
                                {agent.phoneNumber && agent.phoneNumber.trim() !== "" && (
                                    <Button
                                        variant="outline"
                                        className="w-full sm:w-auto px-8 h-12 text-lg mt-3 sm:mt-0"
                                        onClick={() => window.location.href = `tel:${agent.phoneNumber}`}
                                        aria-label={`Call ${agent.specialist} at ${agent.phoneNumber}`}
                                    >
                                        <Phone className="mr-2 h-5 w-5" />
                                        Call {agent.phoneNumber}
                                    </Button>
                                )}
                            </div>
                            
                            {!paidUser && agent.subscriptionRequired && (
                                <p className="text-sm text-gray-600 mt-2">
                                    Premium subscription required for this specialist
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Grid - Better Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Description */}
                    <div className="bg-white p-6 rounded-lg border">
                        <h3 className="text-xl font-semibold mb-4">About This Specialist</h3>
                        <p className="text-gray-700 leading-relaxed text-base">
                            {agent.description}
                        </p>
                    </div>

                    {/* Sample Chat Section */}
                    <div className="bg-white p-6 rounded-lg border">
                        <h3 className="text-xl font-semibold mb-4 flex items-center">
                            <IconMessage className="mr-2 h-5 w-5" />
                            Sample Conversation
                        </h3>
                        <div className="space-y-3 max-h-80 overflow-y-auto">
                            {(sampleChats as SampleChats)[agentId]?.map((chat: ChatMessage, index: number) => (
                                <div
                                    key={index}
                                    className={`flex ${
                                        chat.sender === 'agent' ? 'justify-start' : 'justify-end'
                                    }`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-xl ${
                                            chat.sender === 'agent'
                                                ? 'bg-blue-50 text-blue-900 border border-blue-200 rounded-tl-none'
                                                : 'bg-gray-50 text-gray-900 border border-gray-200 rounded-tr-none'
                                        }`}
                                    >
                                        <p className="text-sm leading-relaxed">{chat.message}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-3 italic">
                            This is a sample conversation to demonstrate the specialist's communication style.
                        </p>
                    </div>

                    {/* Reviews Section */}
                    <div className="bg-white p-6 rounded-lg border">
                        <h3 className="text-xl font-semibold mb-4 flex items-center justify-between">
                            <div className="flex items-center">
                                <IconStarFilled className="mr-2 h-5 w-5 text-yellow-500" />
                                User Reviews
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <IconStarFilled className="h-4 w-4 text-yellow-500" />
                                <span>
                                    Average: {' '}
                                    {(sampleReviews as SampleReviews)[agentId] ? (
                                        ((sampleReviews as SampleReviews)[agentId].reduce((acc: number, review: Review) => acc + review.rating, 0) / 
                                         (sampleReviews as SampleReviews)[agentId].length).toFixed(1)
                                    ) : 'N/A'} / 5.0
                                </span>
                            </div>
                        </h3>
                        <div className="space-y-4 mt-4 pt-4">
                            {(sampleReviews as SampleReviews)[agentId]?.map((review: Review, index: number) => (
                                <div key={index} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center space-x-2">
                                            <span className="font-medium text-gray-900">{review.name}</span>
                                            <div className="flex items-center">
                                                {[...Array(5)].map((_: undefined, i: number) => (
                                                    <IconStarFilled
                                                        key={i}
                                                        className={`h-4 w-4 ${
                                                            i < review.rating
                                                                ? 'text-yellow-500'
                                                                : 'text-gray-300'
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <span className="text-sm text-gray-500">{review.date}</span>
                                    </div>
                                    <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Agent Approach */}
                    <div className="bg-white p-6 rounded-lg border">
                        <h3 className="text-lg font-semibold mb-4">Consultation Approach</h3>
                        <p className="text-gray-700 leading-relaxed">
                            {agent.agentPrompt}
                        </p>
                    </div>

                    {/* Voice Information */}
                    {agent.voiceId && (
                        <div className="bg-white p-6 rounded-lg border">
                            <h3 className="text-lg font-semibold mb-4">Voice Profile</h3>
                            <p className="text-gray-700">
                                Voice ID: <span className="font-medium">{agent.voiceId}</span>
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                                This specialist uses a carefully selected voice for optimal communication.
                            </p>
                        </div>
                    )}

                    {/* Subscription Requirements */}
                    {agent.subscriptionRequired && (
                        <div className="border-yellow-200 bg-yellow-50 p-6 rounded-lg border">
                            <h3 className="text-lg font-semibold mb-4 text-yellow-800">
                                <IconCrown className="inline mr-2 h-5 w-5" />
                                Premium Specialist
                            </h3>
                            <p className="text-yellow-700">
                                This specialist requires a premium subscription to access. 
                                {!paidUser && " Please upgrade your plan to start a consultation."}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
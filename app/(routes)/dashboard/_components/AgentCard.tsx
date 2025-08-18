"use client"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAuth } from '@clerk/nextjs'
import { IconArrowRight } from '@tabler/icons-react'
import axios from 'axios'
import { Loader2Icon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

/**
 * Type definition for each doctor agent card
 */
export type doctorAgent = {
    id: number,
    specialist: string,
    category: string,
    description: string,
    image: string,
    agentPrompt: string,
    voiceId?: string,
    subscriptionRequired: boolean,
    tags?: string[]
}

type props = {
    doctorAgent: doctorAgent
}

/**
 * DoctorAgentCard Component
 * Renders a doctor card with image, name, description,
 * and a button to start a new consultation session.
 */
function AgentCard({ doctorAgent }: props) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { has } = useAuth();

    // ✅ Check if the user has a 'pro' plan using Clerk's has() helper
    //@ts-ignore
    const paidUser = has && has({ plan: 'pro' });

    /**
     * 📞 Handle Start Consultation Button Click
     * Creates a new session with the selected doctor and redirects to the session page.
     */
    const onStartConsultation = async () => {
        setLoading(true);

        // Post the new session to backend API
        const result = await axios.post('/api/session-chat', {
            notes: 'New Query',
            selectedDoctor: doctorAgent
        });

        if (result.data?.sessionId) {
            // Navigate to the new session page
            router.push('/dashboard/agents/' + result.data.sessionId);
        }

        setLoading(false);
    }

    return (
        <div className='relative h-[500px] min-h-[500px] max-h-[500px] flex flex-col border border-transparent'>
            {/* 🔒 Premium badge if doctor requires subscription */}
            {doctorAgent.subscriptionRequired && (
                <Badge className='absolute m-2 right-0 z-10'>Premium</Badge>
            )}

            {/* 👨‍⚕️ Doctor image */}
            <Image
                src={doctorAgent.image}
                alt={doctorAgent.specialist}
                width={200}
                height={300}
                className='w-full h-[230px] min-h-[230px] max-h-[230px] object-cover rounded-xl flex-shrink-0'
            />

            {/* Content area with exact height allocation */}
            <div className='h-[270px] min-h-[270px] max-h-[270px] flex flex-col overflow-hidden'>
                {/*x Upper content with strict height constraint */}
                <div className='h-[150px] min-h-[150px] max-h-[150px] flex flex-col overflow-hidden'>
                    {/* 🩺 Specialist title with fixed height */}
                    <div className='h-6 min-h-6 max-h-6 overflow-hidden mt-1'>
                        <h2 className='font-bold text-base leading-6 truncate'>{doctorAgent.specialist}</h2>
                    </div>

                    {/* 📋 Doctor description with fixed height */}
                    <div className='h-10 min-h-10 max-h-10 overflow-hidden mt-2'>
                        <p className='line-clamp-2 text-sm text-gray-500 leading-5'>
                            {doctorAgent.description}
                        </p>
                    </div>

                    {/* 🏷️ Tags with increased height container to prevent cutting */}
                    <div className='h-20 min-h-20 max-h-20 mt-3 overflow-hidden'>
                        {doctorAgent.tags && doctorAgent.tags.length > 0 && (
                            <div className='flex flex-wrap gap-1'>
                                {doctorAgent.tags.slice(0, 3).map((tag, index) => (
                                    <Badge key={index} variant="secondary" className='text-xs py-0 px-2 h-5 min-h-5 max-h-5'>
                                        {tag}
                                    </Badge>
                                ))}
                                {doctorAgent.tags.length > 3 && (
                                    <Badge variant="outline" className='text-xs py-0 px-2 h-5 min-h-5 max-h-5'>
                                        +{doctorAgent.tags.length - 3}
                                    </Badge>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Spacer to ensure gap between content and buttons */}
                <div className='h-[10px] min-h-[10px] max-h-[10px] flex-shrink-0'></div>

                {/* 🚀 Action buttons with exact spacing */}
                <div className='h-[86px] min-h-[86px] max-h-[86px] flex flex-col justify-end space-y-2 flex-shrink-0 bg-transparent py-0'>
                    <Button
                        variant="outline"
                        className='w-full h-9 min-h-9 max-h-9 flex-shrink-0'
                        onClick={() => router.push(`/dashboard/agent/${doctorAgent.id}`)}
                    >
                        View Details
                    </Button>
                    <Button
                        className='w-full h-9 min-h-9 max-h-9 flex-shrink-0'
                        onClick={onStartConsultation}
                        disabled={!paidUser && doctorAgent.subscriptionRequired} // disable if doctor is premium & user isn't
                    >
                        Start Consultation{' '}
                        {loading ? (
                            <Loader2Icon className='animate-spin' />
                        ) : (
                            <IconArrowRight />
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AgentCard

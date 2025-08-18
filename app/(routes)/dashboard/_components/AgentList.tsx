"use client"
import { AIDoctorAgents } from '@/shared/list'
import React, { useState, useCallback } from 'react'
import AgentCard, { Agent } from './AgentCard'
import AgentSearch from './AgentSearch'

/**
 * DoctorsAgentList Component
 * Displays a grid of AI-powered doctor agent cards using data from AIDoctorAgents.
 * Includes search and filtering functionality.
 */
function AgentList() {
    const [filteredAgents, setFilteredAgents] = useState<Agent[]>(AIDoctorAgents)

    const handleFilteredAgents = useCallback((agents: Agent[]) => {
        setFilteredAgents(agents)
    }, [])

    return (
        <div className='mt-6'>
            {/* 🧠 Section Title */}
            <h2 className='font-bold text-xl'>Specialist Agents</h2>

            {/* 🔍 Search and Filter Component */}
            <div className='mt-4'>
                <AgentSearch 
                    agents={AIDoctorAgents} 
                    onFilteredAgents={handleFilteredAgents}
                />
            </div>

            {/* 🩺 Responsive grid layout for doctor cards */}
            {filteredAgents.length > 0 ? (
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 mt-4'>
                    {filteredAgents.map((doctor, index) => (
                        <div key={doctor.id}>
                            {/* 🧑‍⚕️ Render each doctor agent card */}
                            <AgentCard agent={doctor} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className='text-center py-12'>
                    <div className='text-gray-500 text-lg mb-2'>No specialists found</div>
                    <div className='text-gray-400 text-sm'>Try adjusting your search or filters</div>
                </div>
            )}
        </div>
    )
}

export default AgentList

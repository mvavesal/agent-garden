import { UserProfile } from '@clerk/nextjs'
import React from 'react'

function Profile() {
    return (
        <div className='px-10 md:px-24 lg:px-48 '>
            <h2 className='font-bold text-3xl mb-10'>Your Profile</h2>
            <UserProfile />
        </div>
    )
}

export default Profile
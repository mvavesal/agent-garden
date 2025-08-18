import React from 'react'
import AppHeader from './_components/AppHeader';

function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <AppHeader />
            <div className='max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-6'>
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout
import React from 'react'

type Support = {
    icon: React.ReactNode;
    label: string;
    title: string;
}

const Support = ({ icon, label, title }: Support) => {
    return (
        <div className='flex justify-center items-center gap-5'>
            <span className='text-5xl text-[#0071DF]'>{icon}</span>
            <div className='flex flex-col'>
                <p className='text-lg font-medium'>{label}</p>
                <p className='text-sm text-[#666]'>{title}</p>
            </div>
        </div>
    )
}

export default Support
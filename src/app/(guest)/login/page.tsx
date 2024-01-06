import React from 'react'
import FormLogin from './_form';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation'
const page = async () => {
    const session = await getServerSession(authOptions);
    if (session?.user) redirect('/')
    return (
        <div className='w-full mx-auto md:w-3/6 lg:w-2/6 xs:mt-20 md:mt-16'><FormLogin /></div>
    )
}

export default page
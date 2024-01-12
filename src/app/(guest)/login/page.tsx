import React from 'react'
import FormLogin from './_form';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation'
const page = async () => {
    const session = await getServerSession(authOptions);

    return (
        <div className=' mx-auto xs:w-full md:w-5/6 lg:w-7/12 w-2/6 xs:mt-20 mt-16'><FormLogin /></div>
    )
}

export default page
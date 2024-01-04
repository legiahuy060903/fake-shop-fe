import React from 'react'
import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"
import Header from '@/components/header/user.header'

const Home = async () => {
    const session = await getServerSession(authOptions)
    return (
        <div className='w-full h-full'>
            <Header />
            {/* <div>{JSON.stringify(session)}</div> */}

        </div>

    )
}

export default Home
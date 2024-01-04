import React from 'react'
import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"
import Header from '@/components/header/user.header'

const Home = async () => {
    const session = await getServerSession(authOptions)
    return (
        <section>
            <Header />
            <div>{JSON.stringify(session)}</div>

        </section>

    )
}

export default Home
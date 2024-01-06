

import SessionWrapper from "@/lib/session.wrapper"
import { AntdRegistry } from "@ant-design/nextjs-registry"
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import "./globals.css";
export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" >
            <body className={inter.className} >
                <AntdRegistry>
                    <SessionWrapper>
                        {children}
                    </SessionWrapper>
                </AntdRegistry>
            </body>
        </html>
    )
}
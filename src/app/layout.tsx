

import SessionWrapper from "@/lib/session.wrapper"
import { AntdRegistry } from "@ant-design/nextjs-registry"
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import "./globals.css";
import { AppProvider } from "@/contexts/store";
export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" >
            <body className={inter.className} suppressHydrationWarning={true} >
                <AntdRegistry>
                    <SessionWrapper>
                        <AppProvider>
                            {children}
                        </AppProvider>
                    </SessionWrapper>
                </AntdRegistry>
            </body>
        </html>
    )
}
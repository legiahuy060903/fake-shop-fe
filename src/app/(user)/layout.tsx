import Header from "@/components/header/user.header"

const LayoutUser = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}

export default LayoutUser
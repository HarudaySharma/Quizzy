import { Outlet } from 'react-router-dom'
import Footer from '../Footer'
import Header from '../Header'

export const Layout = () => {
    return (
        <div
            id='layout'
            className='
                bg-layoutBg
                flex
                flex-col
                gap-4
                h-screen
                justify-between
            '
        >
            <Header />
            <Outlet />
            <Footer />
        </div>

    )
}


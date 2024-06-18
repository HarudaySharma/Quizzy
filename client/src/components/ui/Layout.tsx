import { Outlet } from 'react-router-dom'
import Footer from '../Footer'
import Header from '../Header'
import ToasterContext from '../../context/ToasterContext'

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
            <ToasterContext />
            <Header />
            <Outlet />
            <Footer />
        </div>

    )
}


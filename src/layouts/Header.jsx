import React from 'react'
import { Link } from 'react-router-dom'
import Nav from '../features/nav/Nav'
import BrandLogo from '../ui/BrandLogo'

const Header = () => {
  return (
    <header>
      <nav className="bg-white border border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 relative z-0">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <BrandLogo className="mr-3 h-16 lg:h-15 w-auto" width="212px" />           
          </Link>
          <Nav />
        </div>
      </nav>
    </header>
  )
}

export default Header

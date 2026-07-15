import React, { Suspense } from 'react'
import { Outlet } from "react-router-dom";
import Header from './Header'
import Footer from './Footer'
import Loader from '../ui/Loader'

const AppLayout = () => {
  return (
    <>
      <Header />
      <main className="px-4 lg:px-6 py-10">
        <section className="mx-auto max-w-screen-xl ">
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default AppLayout

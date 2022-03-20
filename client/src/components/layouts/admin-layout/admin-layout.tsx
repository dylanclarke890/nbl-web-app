import React from 'react';
// import Footer from '../../components/shared/footer/footer';
import Navbar from '../../shared/navbar/navbar';
import IAdminLayout from './IAdminLayout';


export default function AdminLayout({ children }: IAdminLayout): JSX.Element {
  return (
    <main>
      <section>
        <Navbar />
        <div className="main-content">
          {children}
        </div>
        {/* <Footer /> */}
      </section>
    </main>
  )
}
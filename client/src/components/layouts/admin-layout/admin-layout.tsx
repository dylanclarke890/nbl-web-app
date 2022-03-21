import React from 'react';

import IChildren from '../../../interfaces/IChildren';
import AdminNavbar from '../../shared/admin-navbar/admin-navbar';
import Footer from '../../shared/footer/footer';
import Navbar from '../../shared/navbar/navbar';


export default function AdminLayout({ children }: IChildren): JSX.Element {
  return (
    <main>
      <section>
        <Navbar />
        <AdminNavbar />
        <div className="main-content">
          {children}
        </div>
        <Footer />
      </section>
    </main>
  )
}
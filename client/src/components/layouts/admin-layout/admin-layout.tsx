import React from 'react';
import AdminNavbar from '../../shared/admin-navbar/admin-navbar';

import Footer from '../../shared/footer/footer';
import Navbar from '../../shared/navbar/navbar';
import ILayout from '../ILayout';


export default function AdminLayout({ children }: ILayout): JSX.Element {
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
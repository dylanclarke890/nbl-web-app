import React, { useEffect } from 'react';

import { getJWT } from '../../../helpers/jwt';

import IChildren from '../../../interfaces/IChildren';
import AdminNavbar from '../../shared/admin-navbar/admin-navbar';
import Footer from '../../shared/footer/footer';
import Navbar from '../../shared/navbar/navbar';

export default function AdminLayout({ children }: IChildren): JSX.Element {

  useEffect(() => {
    const jwt = getJWT();
    const redirect = "/admin/login";
    if (!jwt && !(window.location.href.includes(redirect))) window.location.href = redirect;
  }, [])

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
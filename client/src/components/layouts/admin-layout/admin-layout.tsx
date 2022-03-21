import React from 'react';
// import Footer from '../../components/shared/footer/footer';
import Navbar from '../../shared/navbar/navbar';
import ILayout from '../ILayout';


export default function AdminLayout({ children }: ILayout): JSX.Element {
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
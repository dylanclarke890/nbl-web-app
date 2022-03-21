import React from 'react';
import Footer from '../../shared/footer/footer';
import Navbar from '../../shared/navbar/navbar';
import ILayout from '../ILayout';


export default function MainLayout({ children }: ILayout): JSX.Element {
  return (
    <main>
      <section>
        <Navbar />
        <div className="main-content">
          {children}
        </div>
        <Footer />
      </section>
    </main>
  )
}
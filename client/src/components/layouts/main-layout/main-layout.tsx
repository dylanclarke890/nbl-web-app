import React from 'react';
import Footer from '../../shared/footer/footer';
import Navbar from '../../shared/navbar/navbar';
import IMainLayout from './IMainLayout';


export default function MainLayout({ children }: IMainLayout): JSX.Element {
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
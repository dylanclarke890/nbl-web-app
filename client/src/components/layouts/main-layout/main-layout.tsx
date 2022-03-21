import React from 'react';

import IChildren from '../../../interfaces/IChildren';
import Footer from '../../shared/footer/footer';
import Navbar from '../../shared/navbar/navbar';

export default function MainLayout({ children }: IChildren): JSX.Element {
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
import React from 'react';

import IChildren from '../../../interfaces/IChildren';
import Footer from '../../shared/footer/footer';
import Navbar from '../../shared/navbar/navbar';

export default function MainLayout({ children }: IChildren): JSX.Element {
  return (
    <section>
      <div>
        <Navbar />
        <main className="main-content">
          {children}
        </main>
        <Footer />
      </div>
    </section>
  )
}
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import BackToTop from '../ui/BackToTop.jsx';
import CustomCursor from '../ui/CustomCursor.jsx';
import ScrollToTop from '../ui/ScrollToTop.jsx';

export default function Layout() {
  return (
    <>
      <CustomCursor />
      <ScrollToTop />
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import SvgSprite from '../SvgSprite';

const Layout = () => {
  return (
    <>
      <SvgSprite />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout; 
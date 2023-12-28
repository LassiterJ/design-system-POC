import React from "react";
import { Header } from "../../concrete/header/Header";
import { Footer } from "../../concrete/footer/Footer";
export const MainLayout = ({ children }) => {
  return (
    <div>
      <Header />
       <main>{children}</main>
      <Footer />
    </div>)
}

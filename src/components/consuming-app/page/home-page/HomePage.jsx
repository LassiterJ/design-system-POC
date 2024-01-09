import React from 'react'
import { HomePageTemplateLayoutExample } from "../../template/home-page-template/HomePageTemplateLayoutExample";
import {MainLayout} from "../../template/main-layout/MainLayout";
import { HomePageTemplate } from '../../template/home-page-template/HomePageTemplate';
export const HomePage = () => {
  return(
     <MainLayout displayHeader={false}> {/*Not displaying header to make our own implementation with the Hero to dynamic size the hero image*/}
      <HomePageTemplateLayoutExample />
      {/*<HomePageTemplate />*/}
    </MainLayout>
  )
}

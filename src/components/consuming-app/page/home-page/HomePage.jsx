import React from 'react'
import { HomePageTemplateLayoutExample } from "../../template/home-page-template/HomePageTemplateLayoutExample";
import {MainLayout} from "../../template/main-layout/MainLayout";
import { HomePageTemplate } from '../../template/home-page-template/HomePageTemplate';
import { useAppData } from '../../smart/app-data/AppData';
export const HomePage = () => {
  const appData = useAppData();
  console.log("HomePage/appData: ",appData);
  return(
     <MainLayout>
      <HomePageTemplateLayoutExample />
      {/*<HomePageTemplate />*/}
    </MainLayout>
  )
}

import React from 'react';
import { HomePageTemplateLayoutExample } from '../../template/home-page-template/HomePageTemplateLayoutExample';
import { MainLayout } from '../../template/main-layout/MainLayout';
import { HomePageTemplate } from '../../template/home-page-template/HomePageTemplate';
import { useAppData } from '../../smart/app-state/AppStateProvider';
export const HomePage = () => {
  const appData = useAppData();
  return (
    <MainLayout>
      <HomePageTemplateLayoutExample />
      {/*<HomePageTemplate />*/}
    </MainLayout>
  );
};

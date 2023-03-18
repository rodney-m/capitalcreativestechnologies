import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './about-page/about-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { GetAQuoteComponent } from './get-a-quote/get-a-quote.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ServicesAlarmSystemsPageComponent } from './services/services-alarm-systems-page/services-alarm-systems-page.component';
import { ServicesCctvPageComponent } from './services/services-cctv-page/services-cctv-page.component';
import { ServicesElectricalHardwarePageComponent } from './services/services-electrical-hardware-page/services-electrical-hardware-page.component';
import { ServicesElectricalMaintenancePageComponent } from './services/services-electrical-maintenance-page/services-electrical-maintenance-page.component';
import { ServicesLightingSolutionsPageComponent } from './services/services-lighting-solutions-page/services-lighting-solutions-page.component';
import { ServicesSolarInstallationsPageComponent } from './services/services-solar-installations-page/services-solar-installations-page.component';

const routes : Routes = [
  {
    path: 'about',
    component: AboutPageComponent
  },
  {
    path: 'contact',
    component: ContactPageComponent
  },
  {
    path: 'get-a-quote',
    component: GetAQuoteComponent
  },
  {
    path: 'services',
    children: [
      {
        path : 'electrical-maintenance',
        component: ServicesElectricalMaintenancePageComponent
      },
      {
        path : 'cctv',
        component: ServicesCctvPageComponent
      },
      {
        path : 'alarm-systems',
        component: ServicesAlarmSystemsPageComponent
      },
      {
        path : 'solar-installations',
        component: ServicesSolarInstallationsPageComponent
      },
      {
        path : 'electrical-hardware',
        component: ServicesElectricalHardwarePageComponent
      },
      {
        path : 'lighting-solutions',
        component: ServicesLightingSolutionsPageComponent
      },
      { path : '' , redirectTo: 'electrical-maintenance', pathMatch: 'full'}
    ]
  },
  {
    path: '',
    component: HomePageComponent
  }
]

@NgModule({
  declarations: [
    ServicesElectricalMaintenancePageComponent,
    ServicesSolarInstallationsPageComponent,
    ServicesElectricalHardwarePageComponent,
    ServicesLightingSolutionsPageComponent,
    ServicesCctvPageComponent,
    ServicesAlarmSystemsPageComponent,
  ],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
